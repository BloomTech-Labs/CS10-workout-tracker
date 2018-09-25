import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from "../actions";

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
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          )}
          <NavLink to="/schedule">Calendar</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <NavLink to="/billing">Billing</NavLink>
        </div>
        {this.props.authenticated ? (
          <NavLink to="/">
            <button className="LogoutButton" onClick={this.handleLogout}>
              Log Out
            </button>
          </NavLink>
        ) : null}
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
