import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";
import userReducer from "./user";
import workoutReducer from "./workouts";
import performanceReducer from "./performance";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer,
  workouts: workoutReducer,
  user: userReducer,
  performance: performanceReducer
});
