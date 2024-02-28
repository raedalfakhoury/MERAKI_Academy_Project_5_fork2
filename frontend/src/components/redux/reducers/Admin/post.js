/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";

export const adminPostsSlice = createSlice({
  name: "adminPosts",
  initialState: { adminPosts: [] },
  reducers: {
    setadminPosts: (state, action) => {
      state.adminPosts = action.payload;
    },
    updateadminPosts: (state, action) => {
      state.adminPosts = state.adminPosts.filter((ele) => {
        return ele.id !== action.payload;
      });
    },
  },
});
export const { setadminPosts, updateadminPosts } = adminPostsSlice.actions;
export default adminPostsSlice.reducer;
