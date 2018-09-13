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
