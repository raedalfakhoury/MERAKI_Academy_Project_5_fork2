import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "Messages",
  initialState: {
    Messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.Messages = action.payload;
    },
    addMessages: (state, action) => {
      state.Messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
