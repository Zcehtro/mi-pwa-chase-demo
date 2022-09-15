import { UserModel, USER_INITIAL_STATE } from './';

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
        ...USER_INITIAL_STATE,
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
