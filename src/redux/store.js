import siteReducer from "./reducer/site";
import authReducer from "./reducer/auth";
import userReducer from "./reducer//user";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({
  site: siteReducer,
  auth: authReducer,
  user: userReducer,
});
export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaulMiddleware) => getDefaulMiddleware(),
});
