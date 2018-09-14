import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions";

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        const username = localStorage.getItem("strongr_username");
        const password = localStorage.getItem("strongr_password");
        console.log("Got cached username and password to log back in: ", username, password)
        if (username && password)
          this.props.login({
            username,
            password
          });
      }
    }

    render() {
      console.log("Access control is happening");
      return (
        <div>
          {this.props.authenticated ? (
            <ComposedComponent />
          ) : (
            <div>
              Not authorized!
              {"\n"}
              <Link to="/login">Log In</Link> or{" "}
              <Link to="/register">Register</Link> to get STRONGR.
            </div>
          )}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authed
    };
  };
  return connect(
    mapStateToProps,
    { login }
  )(RequireAuthentication);
};
