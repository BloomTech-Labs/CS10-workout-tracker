import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer
})
