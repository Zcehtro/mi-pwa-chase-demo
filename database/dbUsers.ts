import { db } from './';
import { User } from '../models';

export const updateUserWebauthnEnable = async (user: any): Promise<any> => {
  try {
    await db.connect();

    const userToUpdate = await User.findOneAndUpdate({ email: user.id }, { webAuthnEnabled: true });

    await db.disconnect();
    return JSON.parse(JSON.stringify(userToUpdate));
  } catch (error: any) {
    await db.disconnect();

    return { message: error };
  }
};

export const getUserByEmail = async (email: string): Promise<any> => {
  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) {
    return null;
  }

  return JSON.parse(JSON.stringify(user));
};
