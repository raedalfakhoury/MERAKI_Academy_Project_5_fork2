import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";

import usersReducer from "../redux/reducers/users/users";

export default configureStore({
  reducer: {
    forecast: forecastReducer,
    users: usersReducer,
  },
});
