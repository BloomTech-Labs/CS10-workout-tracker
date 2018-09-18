import * as Actions from "../actions/actionDefinitions";

const initialState = {
  msg: "Started up.",
  routines: [],
  selectedRoutine: null
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
    case Actions.SELECT_ROUTINE:
      return {
        ...state,
        selectedRoutine: state.routines[action.payload]
      }
    default:
      return state;
  }
};
