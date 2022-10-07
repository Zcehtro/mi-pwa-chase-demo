/* Types */
import type { NextApiRequest, NextApiResponse } from 'next';
/* Dependencies */
import { User } from '../../models';
import { connect, disconnect } from '../../database/db';

export type UserEntry = {
  name: string;
  surname: string;
  email: string;
  password: string;
  devices: string[];
};

//* Next Route Handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return Signin(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const Signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    await connect();
    const dbuser = await User.findOne({ email });
    if (!dbuser) return res.json({ message: 'User does not exist' });

    const parsedPassword = password.toString();

    if (dbuser.password !== parsedPassword) return res.json({ message: 'Wrong password' });

    await disconnect();

    return res.json({ message: 'User logged in', user: dbuser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
