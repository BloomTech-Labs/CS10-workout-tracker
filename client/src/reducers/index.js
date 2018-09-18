import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";
import workoutReducer from "./workouts";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer,
  workouts: workoutReducer
});
