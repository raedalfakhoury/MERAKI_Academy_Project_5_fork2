import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "adminUsers",
  initialState: { adminUsers: [] },
  reducers: {
    setadminUsers: (state, action) => {
      state.adminUsers = action.payload;
    },
    
  },
});
export const {setadminUsers} = adminSlice.actions;
export default adminSlice.reducer;