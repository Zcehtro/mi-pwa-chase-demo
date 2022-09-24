import { SignalCellular1BarSharp } from '@mui/icons-material';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../models';

export type UserEntry = {
  name: string;
  surname: string;
  email: string;
  password: string;
  devices: string[];
}

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
  //Signup
  const { name, surname, email, password } = req.body;

  try {
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    console.log(`[DEBUG] user in try/catch`); // ! Llegamos hasta acá
    //Handle if the user already exists
    const user = await User.findOne({ email });
    console.log(`[DEBUG] user`, user); // ! No llegamos aquí aún... base de datos está vacía... ?
    if (user) return res.json({ message: 'User already exists' });

    //Parse the password to prevent errors
    const parsedPassword = password.toString();

    //Create a new user
    const newUser = new User({ name, surname, email, password: parsedPassword });
    await newUser.save();

    //If the user is successfully created.
    return res.json({ message: 'User created', user: newUser });
  } catch (error: any) {
    //Catch return
    return res.status(500).json({ message: error.message });
  }
};
