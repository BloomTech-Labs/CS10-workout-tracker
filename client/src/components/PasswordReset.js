import React, { Component } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { resetPassword } from "../actions";

class PasswordReset extends Component {
  state = {
    password: "",
    confirmPassword: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    if (this.state.password === this.state.confirmPassword) {
      this.props.resetPassword({
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        token: token
      });
    }
    console.log(token);
    this.setState({
      password: "",
      confirmPassword: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form className="RegistrationForm" onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
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
