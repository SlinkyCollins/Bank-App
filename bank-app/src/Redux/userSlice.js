import { createSlice } from "@reduxjs/toolkit";

const tokenInLocalStorage = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
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
    updateUserDetails(state, action) {
      if (state.userDetails) {
        state.userDetails = { ...state.userDetails, ...action.payload };
      }
    },
  },
});

export const { login, logout, setUser, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
