import * as Actions from "../actions/actionDefinitions";

const initialState = {
  msg: "Started up.",
  routines: [],
  focusedRoutine: null,
  workouts: []
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
        focusedRoutine: state.routines[action.payload]
      };
    case Actions.FETCHING_ROUTINE_HISTORY:
      return {
        ...state,
        msg: "Fetching history for focused routine..."
      };
    case Actions.FETCH_ROUTINE_HISTORY_FAILURE:
      return {
        ...state,
        msg: "Failed to fetch history for focused routine."
      };
    case Actions.FETCH_ROUTINE_HISTORY_SUCCESS:
      return {
        ...state,
        focusedRoutine: action.payload,
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
      const updatedRoutineList = state.routines.slice(0);
      updatedRoutineList.push(action.payload);
      return {
        ...state,
        msg: "Posting a new workout routine...",
        focusedRoutine: action.payload,
        routines: updatedRoutineList
      };
    case Actions.POSTING_NEW_EXERCISE_IN_ROUTINE:
      return {
        ...state,
        msg: "About to post a new exercise as part of a routine."
      };
    case Actions.POST_NEW_EXERCISE_IN_ROUTINE_FAILURE:
      return {
        ...state,
        msg: "Failed to post a new exercise as part of a routine."
      };
    case Actions.POST_NEW_EXERCISE_IN_ROUTINE_SUCCESS:
      const memoOfFocusedRoutine = Object.assign(state.focusedRoutine);
      const memoOfLoadedExercises = memoOfFocusedRoutine.exercises.slice(0);
      memoOfLoadedExercises.push(action.payload.exercise);
      memoOfFocusedRoutine.exercises = memoOfLoadedExercises;
      return {
        ...state,
        msg: "Posted a new exercise a part of a routine.",
        focusedRoutine: {
          ...memoOfFocusedRoutine,
          exercises: memoOfLoadedExercises
        }
      };
    case Actions.UPDATING_EXERCISE:
      return {
        ...state,
        msg: "Updating an exercise"
      };
    case Actions.UPDATE_EXERCISE_FAILURE:
      return {
        ...state,
        msg: "Failed to update an exercise",
        err: action.payload
      };
    case Actions.UPDATE_EXERCISE_SUCCESS:
      return {
        ...state,
        focusedRoutine: Object.assign({}, state.focusedRoutine, {
          exercises: state.focusedRoutine.exercises.map(exercise => {
            if (action.payload.data._id === exercise._id)
              return action.payload.data;
            return exercise;
          })
        })
        // msg: "Updated an exercise"
      };
    case Actions.UPDATING_ROUTINE:
      return {
        ...state,
        msg: "Updating routine metadata"
      };
    case Actions.UPDATE_ROUTINE_FAILURE:
      return {
        ...state,
        msg: "Failed to updated routine metadata"
      };
    case Actions.UPDATE_ROUTINE_SUCCESS:
      console.log(
        "Got an action for routine metadata update success:",
        action.payload.data.title
      );
      // Copy the "routines" array, find the routine with the matching Id to the old focused routine, replace
      // the title, and replace "routines" with the updated copy.
      const memoOfSelectedRoutineWithTitle = Object.assign(
        state.focusedRoutine
      );
      return {
        ...state,
        msg: "Updated routine metadata.",
        selectedRoutine: {
          ...memoOfSelectedRoutineWithTitle,
          title: action.payload.data.title
        },
        routines: state.routines.map(routine => {
          if (routine._id === action.payload.data._id)
            return action.payload.data;
          return routine;
        })
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
        msg: "Couldn't fetch the user's scheduled workouts",
      }
    case Actions.SCHEDULING_WORKOUT:
      return {
        ...state,
        msg: action.payload
      }
    case Actions.SCHEDULE_WORKOUT_SUCCESS:
      return {
        ...state,
        msg: "Scheduled user's workout",
        workouts: state.workouts.concat(action.payload)
      }
    case Actions.SCHEDULE_WORKOUT_FAILURE:
      return {
        ...state,
        msg: "Couldn't schedule the user's workout"
      }
    default:
      return state;
  }
};
