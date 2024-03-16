import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/Auth/index";

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
