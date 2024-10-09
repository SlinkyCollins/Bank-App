import { createSlice } from '@reduxjs/toolkit';

const tokenInLocalStorage = localStorage.getItem('token');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    userDetails: tokenInLocalStorage ? { token: tokenInLocalStorage } : null, // assign token if exists
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
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

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
