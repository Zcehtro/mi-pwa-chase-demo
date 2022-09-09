import { FC, PropsWithChildren, useReducer } from "react";
import { USERContext, userReducer } from ".";

export interface USERState {
  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
  publicKey: string | null;
  webAuthnEnabled: boolean;
  isLoggedIn: boolean;
}

const USER_INITIAL_STATE: USERState = {
  id: null,
  name: null,
  surname: null,
  email: null,
  password: null,
  publicKey: null,
  webAuthnEnabled: false,
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
    webAuthnEnabled: boolean,
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
        webAuthnEnabled,
      },
    });
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  const registerWebauthn = () => {
    dispatch({ type: "REGISTER_WEBAUTHN" });
  };

  return (
    <USERContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
        registerWebauthn,
      }}
    >
      {children}
    </USERContext.Provider>
  );
};
