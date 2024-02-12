import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";

export default configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});
