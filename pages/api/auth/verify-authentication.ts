/* Types */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { VerifyAuthenticationResponseOpts, VerifiedAuthenticationResponse } from '@simplewebauthn/server';
import type { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types';
/* Dependencies */
import base64url from 'base64url';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { expectedOrigin, rpID } from '../../../constants/webAuthn';
import { dbUsersWebAuthn } from '../../../database';

//* Next Route Handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return postVerifyAuthentication(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

/**@simplewebauthn/typescript-types
 * Login (a.k.a. "Authentication")
 */
const postVerifyAuthentication = async (req: NextApiRequest, res: NextApiResponse) => {
  const { attestation, id } = req.body;
  const body = attestation as AuthenticationCredentialJSON;

  const userFromDB = await dbUsersWebAuthn.getUserById(id);

  if (!userFromDB) {
    return res.status(400).send({ error: 'User not found' });
  }

  const expectedChallenge = userFromDB.currentChallenge;

  let dbAuthenticator;
  const bodyCredIDBuffer = base64url.toBuffer(body.rawId);

  for (const device of userFromDB.devices) {
    const buffer = Buffer.from(JSON.parse(JSON.stringify(base64url.toBuffer(device.credentialID))).data);
    if (buffer.equals(bodyCredIDBuffer)) {
      dbAuthenticator = {
        credentialPublicKey: base64url.toBuffer(device.credentialPublicKey),
        credentialID: base64url.toBuffer(device.credentialID),
        counter: device.counter,
        transports: device.transports,
      };
      break;
    }
  }

  if (!dbAuthenticator) {
    return res.status(400).send({ error: 'Authenticator is not registered with this site' });
  }

  let verification: VerifiedAuthenticationResponse;
  try {
    const opts: VerifyAuthenticationResponseOpts = {
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: dbAuthenticator,
      requireUserVerification: true,
    };
    verification = await verifyAuthenticationResponse(opts);
  } catch (error) {
    const _error = error as Error;
    return res.status(400).send({ error: _error.message });
  }

  const { verified, authenticationInfo } = verification;

  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter;
  }

  return res.status(200).json({ verified });
};
