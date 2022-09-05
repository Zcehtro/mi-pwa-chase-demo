import { FC, PropsWithChildren, useReducer } from "react";
import { USERContext, userReducer } from ".";

export interface USERState {
  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
  publicKey: string | null;
  isLoggedIn: boolean;
}

const USER_INITIAL_STATE: USERState = {
  id: null,
  name: null,
  surname: null,
  email: null,
  password: null,
  publicKey: null,
  isLoggedIn: false,
};

interface Props {
  children: React.ReactNode;
}

export const USERProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  const loginUser = (
    id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    publicKey: string,
    isLoggedIn: boolean,
  ) => {
    dispatch({
      type: "LOGIN_USER",
      payload: {
        id,
        name,
        surname,
        email,
        password,
        publicKey,
        isLoggedIn,
      },
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
