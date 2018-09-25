import React, { Component } from "react";
import { connect } from "react-redux";
import { login, loginWithToken } from "../actions";
import LandingPage from "./Landing/LandingPage";

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        const token = localStorage.getItem("token");
        if (token) this.props.loginWithToken(token);
      }
    }

    render() {
      console.log("Access control is happening");
      return (
        <div>
          {this.props.authenticated ? (
            <ComposedComponent />
          ) : (
            <LandingPage />
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
    { login, loginWithToken }
  )(RequireAuthentication);
};
