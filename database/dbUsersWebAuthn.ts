import { db } from './';
import { UserWebAuthn } from '../models';

export const getUserById = async (id: string): Promise<any> => {
  await db.connect();

  const user = await UserWebAuthn.findOne({ id }).lean();
  await db.disconnect();

  if (!user) {
    return null;
  }

  return JSON.parse(JSON.stringify(user));
};

export const addUser = async (user: any): Promise<any> => {
  await db.connect();
  const userRes = await UserWebAuthn.create(user);
  await db.disconnect();

  if (!userRes) {
    return null;
  }

  return JSON.parse(JSON.stringify(userRes));
};

export const updateUserDevices = async (user: any): Promise<any> => {
  try {
    await db.connect();

    const userToUpdate = await UserWebAuthn.findOneAndUpdate(
      { id: user.id },
      { devices: [...user.devices] },
    );

    await db.disconnect();
    return JSON.parse(JSON.stringify(userToUpdate));
  } catch (error: any) {
    await db.disconnect();

    return { message: error };
  }
};

export const updateUserChallenge = async (user: any, currentChallenge: String): Promise<any> => {
  try {
    await db.connect();

    const userToUpdate = await UserWebAuthn.findOneAndUpdate({ id: user.id }, { currentChallenge });

    await db.disconnect();
    return JSON.parse(JSON.stringify(userToUpdate));
  } catch (error: any) {
    await db.disconnect();

    return { message: error };
  }
};
