import type { NextApiRequest, NextApiResponse } from 'next';
import base64url from 'base64url';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { GenerateAuthenticationOptionsOpts } from '@simplewebauthn/server';

import { loggedInUserId, rpID } from '../../constants/webAuthn';

import { connect, disconnect } from '../../database/db';
import { User } from '../../models';

import { dbUsers } from '../../database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return getUser(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const userFromDB = await dbUsers.getUserByEmail(email);

  if (!userFromDB) {
    return res.status(400).json({ message: `User not register webauthn` });
  }

  return res.status(200).json(userFromDB);
};
