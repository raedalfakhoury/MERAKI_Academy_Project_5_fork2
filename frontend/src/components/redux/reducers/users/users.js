/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const suggestedFreindsSlice = createSlice({
  name: "suggestedFreinds",
  initialState: {
    suggestedFreinds: [],
  },
  reducers: {
    setSuggestedFreinds: (state, action) => {
      state.suggestedFreinds = action.payload;
    },
  },
});

export const { setSuggestedFreinds } = suggestedFreindsSlice.actions;
export default suggestedFreindsSlice.reducer;
