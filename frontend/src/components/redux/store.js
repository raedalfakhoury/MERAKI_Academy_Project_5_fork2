import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";
import PostsReducer from "./reducers/Posts/index"
export default configureStore({
  reducer: {
    forecast: forecastReducer,
    posts:PostsReducer,
  },
});
