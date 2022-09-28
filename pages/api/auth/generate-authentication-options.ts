import type { NextApiRequest, NextApiResponse } from 'next';
import base64url from 'base64url';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { GenerateAuthenticationOptionsOpts } from '@simplewebauthn/server';

import { loggedInUserId, rpID } from '../../../constants/webAuthn';

import { connect, disconnect } from '../../../database/db';
import { User } from '../../../models';

import { dbUsers } from '../../../database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return postGenerateAuthenticationOptions(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

/**
 * Login (a.k.a. "Authentication")
 */
const postGenerateAuthenticationOptions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const userFromDB = await dbUsers.getUserById(id);

  if (!userFromDB) {
    return res.status(400).json({ message: `User not register webauthn` });
  }

  // if (!userFromDB) {
  //   return res.status(400).json({
  //     errorType: 'USERNAME_NOT_REGISTERED',
  //     message: `User with the username "${loggedInUserId}" not register webauthn`
  //   });
  // }

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: userFromDB.devices.map((dev: any) => ({
      id: JSON.parse(JSON.stringify(base64url.toBuffer(dev.credentialID))),
      type: 'public-key',
      transports: dev.transports,
    })),
    userVerification: 'required',
    rpID,
  };

  const options = generateAuthenticationOptions(opts);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */

  await dbUsers.updateUserChallenge(userFromDB, options.challenge);

  return res.status(200).json(options);
};
