import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "adminUsers",
  initialState: { adminUsers: [] },
  reducers: {
    setadminUsers: (state, action) => {
      state.adminUsers = action.payload;
    },
    updateadminUsers: (state, action) => {
      state.adminUsers = state.adminUsers.map((ele, i) => {
        if (ele.id === action.payload) {
          if (ele.is_deleted === 1) {
            ele.is_deleted = 0;
          } else {
            ele.is_deleted = 1;
          }
        }
        return ele;
      });
    },
  },
});
export const { setadminUsers, updateadminUsers } = adminSlice.actions;
export default adminSlice.reducer;
