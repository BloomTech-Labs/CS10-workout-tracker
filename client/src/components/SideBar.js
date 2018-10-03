import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions";

class SideBar extends Component {
  handleLogout = event => {
    this.props.logout();
  };
  render() {
    const { authenticated } = this.props;
    return (
      <div className="sideBar">
        <div className="sideBar__Links" id="test">
          {authenticated && (
            <div>
              <div className="side__box">
                <NavLink to="/schedule">Calendar</NavLink>
              </div>
              <div className="side__box">
                <NavLink to="/workouts">Workouts</NavLink>
              </div>
              <div className="side__box">
                <NavLink to="/progress">Progress</NavLink>
              </div>
              <div className="side__box">
                <NavLink to="/settings">Settings</NavLink>
              </div>
              <div className="side__box">
                <NavLink to="/billing">Billing</NavLink>
              </div>
            </div>
          )}
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
)(SideBar);
