import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: null,
    email: null,
    isLoggedIn: false,
    webAuthnEnabled: false,
    devices: [],
  },
};

const userSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.user = action.payload;
      state.user.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    enableWebAuthn: (state) => {
      state.user.webAuthnEnabled = true;
    },
  },
});

export const { authenticate, logout, enableWebAuthn } = userSlice.actions;

export default userSlice.reducer;
