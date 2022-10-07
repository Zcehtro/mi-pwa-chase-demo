/* Types */
import type { NextApiRequest, NextApiResponse } from 'next';
/* Dependencies */
import { User } from '../../models';
import { connect, disconnect } from '../../database/db';

//* Expected Input
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
      return Signup(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const Signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, surname, email, password } = req.body;

  try {
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    await connect();

    const dbuser = await User.findOne({ email });
    if (dbuser) return res.json({ message: 'User already exists' });

    const parsedPassword = password.toString();

    const newUser = new User({ name, surname, email, password: parsedPassword });
    await newUser.save();

    await disconnect();

    return res.json({ message: 'User created', user: newUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
