import { createContext } from "react";

interface ContextProps {
  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
  publicKey: string | null;
  isLoggedIn: boolean;
  webAuthnEnabled: boolean;

  // Methods
  loginUser: (
    id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    publicKey: string,
    isLoggedIn: boolean,
    webAuthnEnabled: boolean,
  ) => void;
  logoutUser: () => void;
  registerWebauthn: () => void;
}

export const USERContext = createContext({} as ContextProps);
