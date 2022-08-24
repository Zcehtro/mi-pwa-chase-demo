import { createContext } from "react";

interface ContextProps {
  id: string | null;
  email: string | null;
  password: string | null;
  isLoggedIn: boolean;

  // Methods
  loginUser: (id: string, email: string, password: string) => void;
  logoutUser: () => void;
}

export const USERContext = createContext({} as ContextProps);
