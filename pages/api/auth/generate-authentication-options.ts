/* Types */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { GenerateAuthenticationOptionsOpts } from '@simplewebauthn/server';
/* Dependencies */
import base64url from 'base64url';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { rpID } from '../../../constants/webAuthn';
import { dbUsersWebAuthn } from '../../../database';

//* Next Route Handler
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

  const userWebAuthnFromDB = await dbUsersWebAuthn.getUserById(id);

  if (!userWebAuthnFromDB) {
    return res.status(400).json({ message: `ERROR: User has no registered WebAuthn data in the database.` });
  }

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
