import { SignalCellular1BarSharp } from '@mui/icons-material';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../models';
import { connect, disconnect } from '../../database/db';

export type UserEntry = {
  name: string;
  surname: string;
  email: string;
  password: string;
  devices: string[];
};

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
  //Signup
  const { email, password } = req.body;

  try {
    //Connect to database
    connect();
    //Handle if the user already exists
    const dbuser = await User.findOne({ email });
    if (!dbuser) return res.json({ message: 'User does not exist' });

    //Parse the password to prevent errors
    const parsedPassword = password.toString();

    //Check if the password is correct
    if (dbuser.password !== parsedPassword) return res.json({ message: 'Wrong password' });

    //Disconnect from database
    disconnect();

    //If the user is successfully logged in.
    return res.json({ message: 'User logged in', user: dbuser });
  } catch (error: any) {
    //Catch return
    return res.status(500).json({ message: error.message });
  }
};
