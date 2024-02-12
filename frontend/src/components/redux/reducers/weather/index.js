import { createSlice } from "@reduxjs/toolkit";

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    forecast: {},
  },
  reducers: {
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export const { setForecast } = forecastSlice.actions;

export default forecastSlice.reducer;
