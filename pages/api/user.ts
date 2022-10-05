import type { NextApiRequest, NextApiResponse } from 'next';
import { dbUsers } from '../../database';

//* Next Route Handler
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
