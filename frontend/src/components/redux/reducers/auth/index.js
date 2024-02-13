import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  token: null || localStorage.getItem("token"),
  userId: null || localStorage.getItem("userId"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.clear()
    },
  },
});

export const { setLogin, setUserId, setLogout } = authSlice.actions;
export default authSlice.reducer;