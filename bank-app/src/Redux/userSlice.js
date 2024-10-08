import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userDetails: null,
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.userDetails = null;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userDetails = null;
    },
  },
});

export const { login, logout, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
