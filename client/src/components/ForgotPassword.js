import React, { Component } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { forgotPassword } from "../actions";

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.forgotPassword({
        email: this.state.email
      });
    }
    this.setState({
      email: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form className="ForgotPasswordForm" onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
          <button className="Form__submit" type="submit">
            Request Recovery Link
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Forgot Password Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.user.message
  };
};

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);
