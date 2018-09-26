import React, { Component } from "react";
import { connect } from "react-redux";
import { changeEmail, changePassword } from "../actions";

class Settings extends Component {
  state = {
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEmailSubmit = event => {
    event.preventDefault();
    this.props.changeEmail({
      username: this.props.userInfo.user.username,
      newEmail: this.state.email
    });
    this.setState({
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  handlePasswordSubmit = event => {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.changePassword({
        username: this.props.userInfo.user.username,
        password: this.state.password,
        newPassword: this.state.newPassword,
        confirmNewPassword: this.state.confirmNewPassword
      });
    }
    this.setState({
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  render() {
    return (
      <div>
        <form className="EmailForm" onSubmit={this.handleEmailSubmit}>
          <input
            type="text"
            name="email"
            placeholder={this.props.userInfo.user.email}
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
          <button className="Form__submit" type="submit">
            Change Email
          </button>
        </form>
        <form className="PasswordForm" onSubmit={this.handlePasswordSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={this.state.newPassword}
            onChange={this.handleFieldChange}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={this.state.confirmNewPassword}
            onChange={this.handleFieldChange}
          />
          <button className="Form__submit" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Settings Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.user.message
  };
};

export default connect(
  mapStateToProps,
  { changeEmail, changePassword }
)(Settings);
