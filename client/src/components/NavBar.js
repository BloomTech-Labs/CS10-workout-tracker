import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout } from "../actions";

import "../css/main.css";

class NavBar extends Component {
  handleLogout = event => {
    this.props.logout();
    // this.props.history.push("/");
  };
  render() {
    return (
      <div className="NavBar">
        <div className="NavBar__Links">
          {this.props.authenticated ? null : (
            <div>
              <NavLink className="NavBar__Link" to="/login">
                Login
              </NavLink>
              <NavLink className="NavBar__Link" to="/register">
                Register
              </NavLink>
            </div>
          )}
          <NavLink className="NavBar__Link" to="/schedule">
            Calendar
          </NavLink>
          <NavLink className="NavBar__Link" to="/workouts">
            Workouts
          </NavLink>
          <NavLink className="NavBar__Link" to="/progress">
            Progress
          </NavLink>
          <NavLink className="NavBar__Link" to="/settings">
            Settings
          </NavLink>
          <NavLink className="NavBar__Link" to="/billing">
            Billing
          </NavLink>
          {this.props.authenticated ? (
            <NavLink className="NavBar__Link" to="/">
              <button className="LogoutButton" onClick={this.handleLogout}>
                Log Out
              </button>
            </NavLink>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authed
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
