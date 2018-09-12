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
  return {
    type: Actions.LOGOUT
  };
};

export const changePassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.CHANGING_PASSWORD,
      payload: "Changing password..."
    });
    axios
      .post(`${ROOT_URL}/changepw`, data)
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
