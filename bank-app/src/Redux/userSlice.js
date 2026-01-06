import { createSlice } from "@reduxjs/toolkit";

const tokenInLocalStorage = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    userDetails: tokenInLocalStorage ? { token: tokenInLocalStorage } : null, // assign token if exists
    recentTransactions: []
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
    setRecentTransactions(state, action) {
      state.recentTransactions = action.payload.slice(0, 5);
    },
    addTransaction(state, action) {
      state.recentTransactions = [action.payload, ...state.recentTransactions].slice(0, 5);
    }
  },
});

export const { login, logout, setUser, updateUserDetails, setRecentTransactions, addTransaction } = userSlice.actions;
export default userSlice.reducer;
