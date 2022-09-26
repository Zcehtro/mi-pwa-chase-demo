import type { NextApiRequest, NextApiResponse } from 'next';

import { generateRegistrationOptions } from '@simplewebauthn/server';
import type { GenerateRegistrationOptionsOpts } from '@simplewebauthn/server';

import { UserInterface, rpID } from '../../../constants/webAuthn';

import { connect, disconnect } from '../../../database/db';
import { User } from '../../../models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return getGenerateRegistrationOptions(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

/**
 * Registration (a.k.a. "Registration")
 */
const getGenerateRegistrationOptions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  //get the user

  connect();

  const dbuser = await User.findOne({ email });

  if (!dbuser) return res.json({ message: 'User does not exist' });

  const opts: GenerateRegistrationOptionsOpts = {
    rpName: 'SimpleWebAuthn Example',
    rpID,
    userID: dbuser.email,
    userName: `${dbuser.name} ${dbuser.surname}`,
    timeout: 60000,
    attestationType: 'none',
    /**
     * Passing in a user's list of already-registered authenticator IDs here prevents users from
     * registering the same device multiple times. The authenticator will simply throw an error in
     * the browser if it's asked to perform registration when one of these ID's already resides
     * on it.
     */
    excludeCredentials: dbuser.devices.map((dev: any) => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports,
    })),
    /**
     * The optional authenticatorSelection property allows for specifying more constraints around
     * the types of authenticators that users to can use for registration
     */
    authenticatorSelection: {
      userVerification: 'required',
      residentKey: 'required',
    },
    /**
     * Support the two most common algorithms: ES256, and RS256
     */
    supportedAlgorithmIDs: [-7, -257],
  };

  const options = generateRegistrationOptions(opts);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */

  dbuser.currentChallenge = options.challenge;
  await dbuser.save();

  return res.status(200).json(options);
};
