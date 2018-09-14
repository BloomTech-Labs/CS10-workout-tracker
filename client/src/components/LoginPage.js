import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });

    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form className="LoginForm" onSubmit={this.handleSubmit}>
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
          <button className="Form__submit" type="submit">
            Sign In
          </button>
        </form>
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
