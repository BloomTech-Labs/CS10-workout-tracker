import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions";
import NavBar from "./NavBar";

class RegistrationPage extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    recoveryQuestion: "",
    recoveryAnswer: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.register({
        username: this.state.username,
        password: this.state.password,
        recoveryQuestion: this.state.recoveryQuestion,
        recoveryAnswer: this.state.recoveryAnswer
      });
    }
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      recoveryQuestion: "",
      recoveryAnswer: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form className="RegistrationForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleFieldChange}
          />
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
          <input
            type="text"
            name="recoveryQuestion"
            placeholder="Insert Recovery Question"
            value={this.state.recoveryQuestion}
            onChange={this.handleFieldChange}
          />
          <input
            type="text"
            name="recoveryAnswer"
            placeholder="Insert Recovery Answer"
            value={this.state.recoveryAnswer}
            onChange={this.handleFieldChange}
          />
          <button className="Form__submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Registration Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { register }
)(RegistrationPage);
