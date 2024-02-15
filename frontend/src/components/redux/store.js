import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";
 
import authReducer from "./reducers/auth/index";
import usersReducer from "../redux/reducers/users/users";

import PostsReducer from "./reducers/Posts/index"
export default configureStore({
  reducer: {
    forecast: forecastReducer,
    posts:PostsReducer,

    users: usersReducer,
    auth : authReducer

 
 
  },
});
