import React, { Component } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { resetPassword } from "../actions";
import "../less/passwordReset.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

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
      <div className="password-reset-outer">
        <div className="password-reset-container">
          <NavBar />
          <div className="forms-container">
            <div className="single-form-container">
              <Form
                className="password-reset-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Input
                    className="pw-reset-input"
                    type="password"
                    name="newPassword"
                    placeholder="Password"
                    value={this.state.newPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Input
                    className="pw-reset-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <Button className="submit-btn" size="sm" type="submit">
                  Set New Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
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
