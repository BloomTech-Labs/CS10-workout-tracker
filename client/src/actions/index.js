import * as Actions from "./actionDefinitions";
const axios = require("axios");

const ROOT_URL = "http://localhost:8080";

export const register = data => {
  return dispatch => {
    dispatch({
      type: Actions.REGISTERING,
      payload: "Registering..."
    });
    axios
      .post(`${ROOT_URL}/register`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("strongr_username", data.username);
        localStorage.setItem("strongr_password", data.password);
        dispatch({
          type: Actions.REGISTER_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.REGISTER_FAILURE,
          payload: err
        });
      });
  };
};

export const login = data => {
  return dispatch => {
    dispatch({
      type: Actions.LOGGING_IN,
      payload: "Logging in..."
    });
    axios
      .post(`${ROOT_URL}/login`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("strongr_username", data.username);
        localStorage.setItem("strongr_password", data.password);
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.LOGIN_FAILURE,
          payload: err
        });
      });
  };
};

export const logout = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("strongr_username", "");
  localStorage.setItem("strongr_password", "");
  return {
    type: Actions.LOGOUT
  };
};

export const forgotPassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.SENDING_RECOVERY_EMAIL,
      payload: "Sending recovery email..."
    });
    axios
      .post(`${ROOT_URL}/forgot_password`, data)
      .then(res => {
        dispatch({
          type: Actions.SEND_EMAIL_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.SEND_EMAIL_FAILURE,
          payload: err
        });
      });
  };
};

export const resetPassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.CHANGING_PASSWORD,
      payload: "Changing password..."
    });
    axios
      .post(`${ROOT_URL}/reset_password`, data)
      .then(res => {
        dispatch({
          type: Actions.CHANGE_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.CHANGE_FAILURE,
          payload: err
        });
      });
  };
};

export const addProgress = data => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.ADDING_PROGRESS,
      payload: "Adding progress record..."
    });
    axios
      .post(`${ROOT_URL}/progress`, data, { headers: {"x-access-token": token} })
      .then(res => {
        dispatch({
          type: Actions.ADD_PROGRESS_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.ADD_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};

export const fetchProgress = () => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_PROGRESS,
      payload: "Fetching progress..."
    });
    axios
      .get(`${ROOT_URL}/progress`, { headers: {"x-access-token": token} } ) 
      .then(res => {
        dispatch({
          type: Actions.FETCH_PROGRESS_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.ADD_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};
