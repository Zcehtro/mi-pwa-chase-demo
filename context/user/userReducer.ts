import { USERState } from './';

type USERActionType =
  | { type: 'LOGIN_USER'; payload: USERState }
  | { type: 'LOGOUT_USER' }
  | { type: 'REGISTER_WEBAUTHN' };

export const userReducer = (state: USERState, action: USERActionType): USERState => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.payload,
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
