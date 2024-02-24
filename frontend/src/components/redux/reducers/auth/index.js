/* eslint-disable no-dupe-keys */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  token: null || localStorage.getItem("token"),
  userId: null || localStorage.getItem("userId"),
  image: null || localStorage.getItem("image"),
  name: null || localStorage.getItem("name"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState ,
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
    setImageAndName : (state ,action)=>{
      state.name = action.payload.name;
      state.image = action.payload.image;
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("image", action.payload.image);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("image");
      // localStorage.clear()
    },

  },
});

export const { setLogin, setUserId, setLogout,setImageAndName } = authSlice.actions;
export default authSlice.reducer;