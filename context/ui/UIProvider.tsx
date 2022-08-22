import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  drawerOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  drawerOpen: false,
};

interface Props {
  children: React.ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleDrawer = (status: boolean) => {
    dispatch({ type: "UI - Toggle Drawer", payload: status });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleDrawer,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
