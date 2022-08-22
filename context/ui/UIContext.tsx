import { createContext } from "react";

interface ContextProps {
  drawerOpen: boolean;

  // Methods
  toggleDrawer: (status: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
