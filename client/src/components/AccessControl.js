import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default ComposedComponent => {
  class RequireAuthentication extends Component {

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
              <Link to="/login">Log In</Link> or <Link to="/register">Register</Link> to get STRONGR.
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
  return connect(mapStateToProps)(RequireAuthentication);
};
