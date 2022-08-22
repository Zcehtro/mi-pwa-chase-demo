import { UIState } from "./";

type UIActionType = { type: "UI - Toggle Drawer"; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Toggle Drawer":
      return {
        ...state,
        drawerOpen: action.payload,
      };
    default:
      return state;
  }
};
