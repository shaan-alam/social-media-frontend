import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import error from "./error";

const rootReducer = combineReducers({
  posts,
  auth,
  error,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
