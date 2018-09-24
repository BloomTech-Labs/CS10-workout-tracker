import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";
import userReducer from "./user";
import workoutReducer from "./workouts";
import routineManagerReducer from "./routineManager";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer,
  workouts: workoutReducer,
  user: userReducer,
  RoutineManager: routineManagerReducer,
});
