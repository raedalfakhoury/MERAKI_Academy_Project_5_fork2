import { createSlice } from "@reduxjs/toolkit";

export const adminCommentSlice = createSlice({
  name: "adminComments",
  initialState: { adminComments: [] },
  reducers: {
    setadminComments: (state, action) => {
      state.adminComments = action.payload;
    },
    
  },
});
export const {setadminComments} = adminCommentSlice.actions;
export default adminCommentSlice.reducer;