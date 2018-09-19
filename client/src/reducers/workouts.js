import * as Actions from "../actions/actionDefinitions";

const initialState = {
  msg: "Started up.",
  routines: [],
  selectedRoutine: null
};

export default (state = initialState, action) => {
  console.log("Previous state: ", state);
  console.log("Incoming action", action);
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
    case Actions.SELECT_ROUTINE:
      return {
        ...state,
        selectedRoutine: state.routines[action.payload]
      };
    case Actions.FETCHING_ROUTINE_HISTORY:
      return {
        ...state,
        msg: "Fetching history for selected routine..."
      };
    case Actions.FETCH_ROUTINE_HISTORY_FAILURE:
      return {
        ...state,
        msg: "Failed to fetch history for selected routine."
      };
    case Actions.FETCH_ROUTINE_HISTORY_SUCCESS:
      return {
        ...state
      };
    case Actions.POSTING_NEW_ROUTINE:
      return {
        ...state,
        msg: "Posting a new workout routine..."
      };
    case Actions.POST_NEW_ROUTINE_FAILURE:
      return {
        ...state,
        msg: "Failed to post a new workout routine."
      };
    case Actions.POST_NEW_ROUTINE_SUCCESS:
      state.routines.push(action.payload)
      return {
        ...state,
        msg: "Posting a new workout routine...",
        selectedRoutine: action.payload
      };
    case Actions.POSTING_NEW_EXERCISE_IN_ROUTINE:
      return {
        ...state,
        msg: "About to post a new exercise as part of a routine."
      }
    case Actions.POST_NEW_EXERCISE_IN_ROUTINE_FAILURE:
      return {
        ...state,
        msg: "Failed to post a new exercise as part of a routine."
      }
    case Actions.POST_NEW_EXERCISE_IN_ROUTINE_SUCCESS:
      state.selectedRoutine.exercises.push(action.payload.exercise)
      return {
        ...state,
        msg: "Posted a new exercise a part of a routine."
      }
    case Actions.UPDATING_EXERCISE:
      return {
        ...state,
        msg: "Updating an exercise"
      }
    case Actions.UPDATE_EXERCISE_FAILURE:
      return {
        ...state,
        msg: "Failed to update an exercise",
        err: action.payload
      }
    case Actions.UPDATE_EXERCISE_SUCCESS:
      console.log("Got this action to update the Redux store: ", action.payload);
      return {
        ...state,
        msg: "Updated an exercise"
      }
    default:
      return state;
  }
};
