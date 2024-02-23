/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const savePostSlice = createSlice({
  name: "savePost",
  initialState: {
    savePost: [],
  },
  reducers: {
    setsavePost: (state, action) => {
      state.posts = action.payload;
    },
    addsavePost: (state, action) => {
      state.savePost.push(action.payload);
    },
  },
});

export const { setsavePost, addsavePost } = savePostSlice.actions;
export default savePostSlice.reducer;
