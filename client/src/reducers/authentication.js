import * as Actions from "../actions/actionDefinitions";

const initialState = {
  authed: false,
  message: "Welcome to the app!",
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTERING:
      return {
        ...state,
        message: action.payload
      };
    case Actions.REGISTER_SUCCESS:
      // localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        authed: true,
        message: "Registered successfully!",
        currentUser: action.payload.data
      };
    case Actions.REGISTER_FAILURE:
      return {
        ...state,
        message: "Registration failed..."
      };
    case Actions.LOGGING_IN:
      return {
        ...state,
        message: action.payload
      };
    case Actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        authed: true,
        message: "Logged in successfully!",
        currentUser: action.payload.data
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        message: "Log-in failed..."
      };
    // case Actions.SENDING_RECOVERY_EMAIL:
    //   return {
    //     ...state,
    //     message: action.payload
    //   };
    // case Actions.SEND_EMAIL_SUCCESS:
    //   return {
    //     ...state,
    //     message: "Email sent successfully"
    //   };
    // case Actions.SEND_EMAIL_FAILURE:
    //   return {
    //     ...state,
    //     message: "Email failed to send"
    //   };
    // case Actions.RESETTING_PASSWORD:
    //   return {
    //     ...state,
    //     message: action.payload
    //   };
    // case Actions.RESET_SUCCESS:
    //   return {
    //     ...state,
    //     message: "Password changed successfully"
    //   };
    // case Actions.RESET_FAILURE:
    //   return {
    //     ...state,
    //     message: "Failed to change password"
    //   };
    case Actions.LOGOUT:
      return {
        ...state,
        authed: false,
        message: "Logged out successfully!",
        currentUser: null
      };
    default:
      return state;
  }
};
