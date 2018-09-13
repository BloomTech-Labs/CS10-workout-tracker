import * as Actions from "../actions/actionDefinitions";

const initialState = {
    progressRecords: [],
    message: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.ADDING_PROGRESS:
            return {
                ...state,
                message: action.payload
            };
        case Actions.ADD_PROGRESS_SUCCESS:
            return {
                ...state,
                message: "Progress submitted successfully!"
            }
        case Actions.ADD_PROGRESS_FAILURE:
            return {
                ...state,
                message: "Progress submission failed..."
            }
        default: 
            return state;
    }
}