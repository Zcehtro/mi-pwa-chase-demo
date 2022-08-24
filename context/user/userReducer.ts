import { USERState } from "./";

type USERActionType =
  | { type: "LOGIN_USER"; payload: USERState }
  | { type: "LOGOUT_USER" };

export const userReducer = (
  state: USERState,
  action: USERActionType
): USERState => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        id: null,
        email: null,
        password: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
