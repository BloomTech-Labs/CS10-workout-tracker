import * as Actions from "../actions/actionDefinitions";

const initialState = {
 performances: [],
 msg: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
      case Actions.FETCHING_PERFORMANCES:
        return {
          ...state,
          msg: action.payload
        }
      case Actions.FETCH_PERFORMANCES_SUCCESS:
        return {
            ...state,
            performances: [...state.performances, action.payload],
            msg: "Fetched performances for all exercises in specified routine"
        }
      case Actions.FETCH_PERFORMANCES_FAILURE:
        return {
            ...state,
            msg: "Failed to fetch performances for all exercises in specified routine"
        }
     default: 
        return state;
    }
}
