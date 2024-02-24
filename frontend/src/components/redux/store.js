import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";

import authReducer from "./reducers/auth/index";
import suggestedFreindsSlice from "../redux/reducers/users/users";
import savePostReducer from "./reducers/savePost/index";
import PostsReducer from "./reducers/Posts/index";
export default configureStore({
  reducer: {
    forecast: forecastReducer,
    posts: PostsReducer,
    savePost: savePostReducer,
    suggestedFreinds: suggestedFreindsSlice,
    auth: authReducer,
  },
});
