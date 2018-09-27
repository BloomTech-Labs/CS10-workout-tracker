import * as Actions from "../actions/actionDefinitions";

const initialState = {
  routines: [],
  workouts: [],
  performances: [],
  msg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCHING_ROUTINES:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.FETCH_ROUTINES_SUCCESS:
      return {
        ...state,
        msg: "Fetched the user's workout routines.",
        routines: action.payload.data.routines
      };
    case Actions.FETCH_ROUTINES_FAILURE:
      return {
        ...state,
        msg: "Couldn't fetch the user's workout routines."
      };
    case Actions.FETCHING_WORKOUTS:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        msg: "Fetched the user's scheduled workouts",
        workouts: action.payload
      };
    case Actions.FETCH_WORKOUTS_FAILURE:
      return {
        ...state,
        msg: "Couldn't fetch the user's scheduled workouts"
      };
    case Actions.SCHEDULING_WORKOUT:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.SCHEDULE_WORKOUT_SUCCESS:
      return {
        ...state,
        msg: "Scheduled user's workout",
        workouts: state.workouts.concat(action.payload.savedWorkout),
        performances: state.performances.concat(action.payload.savedWorkout)
      };
    case Actions.SCHEDULE_WORKOUT_FAILURE:
      return {
        ...state,
        msg: "Couldn't schedule the user's workout"
      };
    case Actions.DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(workout => {
          return workout._id !== action.payload;
        })
      };
    case Actions.FETCHING_PERFORMANCES:
      return {
        ...state,
        msg: action.payload
      }
    case Actions.FETCH_PERFORMANCES_SUCCESS:
      return {
        ...state,
        msg: "Fetched the user's performances",
        performances: action.payload
      }
    case Actions.FETCH_PERFORMANCES_FAILURE:
      return {
        ...state,
        msg: "Couldn't fetch the user's performances"
      }
    default:
      return state;
  }
};
