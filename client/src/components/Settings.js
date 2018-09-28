import React, { Component } from "react";
import { connect } from "react-redux";
import { changeEmail, changePassword } from "../actions";
import "../less/settings.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

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
      <div className="settings-outer">
        <div className="settings-container">
          <div className="forms-container">
            <div className="single-form-container">
              <Form className="emailForm" onSubmit={this.handleEmailSubmit}>
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="email"
                    name="email"
                    placeholder={this.props.userInfo.user.email}
                    value={this.state.email}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <Button className="submit-btn" size="sm" type="submit">
                  Change Email
                </Button>
              </Form>
            </div>
            <div className="single-form-container">
              <Form
                className="passwordForm"
                onSubmit={this.handlePasswordSubmit}
              >
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={this.state.newPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Input
                    className="settings-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
                <Button className="submit-btn" size="sm" type="submit">
                  Save Password
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
