import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: null,
    surname: null,
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
      const { name, surname, email, webAuthnEnabled, devices } = action.payload;
      state.user.name = name;
      state.user.surname = surname;
      state.user.email = email;
      state.user.isLoggedIn = true;
      state.user.webAuthnEnabled = webAuthnEnabled;
      state.user.devices = devices;
    },
    logout: (state) => {
      state.user.isLoggedIn = false;
      state.user.name = null;
      state.user.surname = null;
      state.user.devices = [];
    },
    enableWebAuthn: (state) => {
      state.user.webAuthnEnabled = true;
    },
  },
});

export const { authenticate, logout, enableWebAuthn } = userSlice.actions;

export default userSlice.reducer;
