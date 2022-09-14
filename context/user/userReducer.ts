import { UserModel } from './';

type USERActionType =
  | {
      type: 'LOGIN_USER';
      payload: {
        user: UserModel;
      };
    }
  | { type: 'LOGOUT_USER' }
  | { type: 'REGISTER_WEBAUTHN' };

export const userReducer = (state: UserModel, action: USERActionType): UserModel => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.user.id,
        name: action.payload.user.name,
        surname: action.payload.user.surname,
        email: action.payload.user.email,
        password: action.payload.user.password,
        publicKey: action.payload.user.publicKey,
        webAuthnEnabled: action.payload.user.webAuthnEnabled,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        id: null,
        name: null,
        surname: null,
        email: null,
        password: null,
        isLoggedIn: false,
        publicKey: null,
        webAuthnEnabled: false,
      };
    case 'REGISTER_WEBAUTHN':
      return {
        ...state,
        webAuthnEnabled: true,
      };
    default:
      return state;
  }
};
