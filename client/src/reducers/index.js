import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";
import userReducer from "./user";
import routineManagerReducer from "./routineManager";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer,
  user: userReducer,
  RoutineManager: routineManagerReducer,
});
