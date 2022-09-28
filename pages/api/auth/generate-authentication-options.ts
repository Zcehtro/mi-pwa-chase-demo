import type { NextApiRequest, NextApiResponse } from 'next';
import base64url from 'base64url';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { GenerateAuthenticationOptionsOpts } from '@simplewebauthn/server';

import { rpID } from '../../../constants/webAuthn';

import { dbUsersWebAuthn } from '../../../database';

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
  console.log(`[DEBUG] postGenerateAuthenticationOptions, id: ${id}`);

  const userWebAuthnFromDB = await dbUsersWebAuthn.getUserById(id);
  console.log(`[DEBUG] postGenerateAuthenticationOptions, userWebAuthnFromDB: ${JSON.stringify(userWebAuthnFromDB)}`);
  
  if (!userWebAuthnFromDB) {
    return res
      .status(400)
      .json({ message: `ERROR: User has no registered WebAuthn data in the database.` });
  }

  // if (!userFromDB) {
  //   return res.status(400).json({
  //     errorType: 'USERNAME_NOT_REGISTERED',
  //     message: `User with the username "${loggedInUserId}" not register webauthn`
  //   });
  // }

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: userWebAuthnFromDB.devices.map((dev: any) => ({
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

  await dbUsersWebAuthn.updateUserChallenge(userWebAuthnFromDB, options.challenge);

  return res.status(200).json(options);
};
