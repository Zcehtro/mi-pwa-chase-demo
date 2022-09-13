import { FC, PropsWithChildren, useReducer } from 'react';
import { USERContext, userReducer, ContextProps } from '.';

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

  const loginUser = (user: ContextProps) => {
    dispatch({
      type: 'LOGIN_USER',
      payload: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        publicKey: user.publicKey,
        isLoggedIn: true,
        webAuthnEnabled: user.webAuthnEnabled,
      },
    });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  const registerWebauthn = () => {
    dispatch({ type: 'REGISTER_WEBAUTHN' });
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
