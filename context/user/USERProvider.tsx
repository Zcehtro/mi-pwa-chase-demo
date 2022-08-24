import { FC, useReducer } from "react";
import { USERContext, userReducer } from ".";

export interface USERState {
  id: string | null;
  email: string | null;
  password: string | null;
  isLoggedIn: boolean;
}

const USER_INITIAL_STATE: USERState = {
  id: null,
  email: null,
  password: null,
  isLoggedIn: false,
};

interface Props {
  children: React.ReactNode;
}

export const USERProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  const loginUser = (id: string, email: string, password: string) => {
    dispatch({
      type: "LOGIN_USER",
      payload: { id, email, password, isLoggedIn: true },
    });
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <USERContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </USERContext.Provider>
  );
};
