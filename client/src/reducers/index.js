import { combineReducers } from "redux";
import authReducer from "./authentication";
import progressReducer from "./progress";
import userReducer from "./user";
import routineManagerReducer from "./routineManager";
import valErrorReducer from "./valErrors";

export default combineReducers({
  auth: authReducer,
  progress: progressReducer,
  user: userReducer,
  RoutineManager: routineManagerReducer,
  valError: valErrorReducer
});
