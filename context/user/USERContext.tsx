import { createContext } from 'react';

export interface ContextProps {
  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
  publicKey: string | null;
  isLoggedIn: boolean;
  webAuthnEnabled: boolean;

  // Methods
  loginUser: (user: ContextProps) => void;
  logoutUser: () => void;
  registerWebauthn: () => void;
}

export const USERContext = createContext({} as ContextProps);
