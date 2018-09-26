import React, { Component } from "react";
import NavBar from "./SideBar";
import { connect } from "react-redux";
import { resetPassword } from "../actions";

class PasswordReset extends Component {
  state = {
    newPassword: "",
    confirmNewPassword: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.resetPassword(
        {
          newPassword: this.state.newPassword,
          confirmNewPassword: this.state.confirmNewPassword,
          token: token
        },
        this.props.history
      );
    }
    console.log(token);
    this.setState({
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form className="PasswordResetForm" onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="newPassword"
            placeholder="Password"
            value={this.state.newPassword}
            onChange={this.handleFieldChange}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm Password"
            value={this.state.confirmNewPassword}
            onChange={this.handleFieldChange}
          />
          <button className="Form__submit" type="submit">
            Set New Password
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Password Reset Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { resetPassword }
)(PasswordReset);
