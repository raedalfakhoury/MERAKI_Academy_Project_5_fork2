import { createSlice } from "@reduxjs/toolkit";

export const adminPostsSlice = createSlice({
  name: "adminPosts",
  initialState: { adminPosts: [] },
  reducers: {
    setadminPosts: (state, action) => {
      state.adminPosts = action.payload;
    },
    
  },
});
export const {setadminPosts} = adminPostsSlice.actions;
export default adminPostsSlice.reducer;