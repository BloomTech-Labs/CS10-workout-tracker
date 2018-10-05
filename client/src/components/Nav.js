import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup
} from "reactstrap";
import { connect } from "react-redux";
import { register, login, logout, forgotPassword } from "../actions";

import barbell_logo from "./Landing/img/dumbbell-svgrepo-com.svg";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      signInName: "",
      signInPass: "",
      confirmPassword: "",
      email: "",
      signUpModal: false,
      signInModal: false,
      forgotModal: false
    };
  }

  handleLogout = event => {
    this.props.logout();
    this.props.history.push("/");
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleSignInModal = () => {
    this.setState({
      signInModal: !this.state.signInModal
    });
  };

  toggleSignUpModal = () => {
    this.setState({
      signUpModal: !this.state.signUpModal
    });
  };

  toggleForgotModal = () => {
    this.setState({
      forgotModal: !this.state.forgotModal
    });
  };

  handleSignup = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.register(
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        },
        this.props.history
      );
    }
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
    });
    console.log("submitted");
    this.toggleSignUpModal();
  };

  handleSignin = event => {
    event.preventDefault();
    this.props.login(
      {
        username: this.state.signInName,
        password: this.state.signInPass
      },
      this.props.history
    );

    this.setState({
      signInName: "",
      signInPass: ""
    });
    this.toggleSignInModal();
  };

  handleForgotPassword = event => {
    event.preventDefault();

    this.props.forgotPassword({
      email: this.state.email
    });

    this.setState({
      email: ""
    });
  };

  render() {
    console.log("This is the Current user ", this.props.userInfo);
    const { authed } = this.props.userInfo;
    const isNotAuth = (
      <div className="right__nav">
        <div>
          <span className="first__nav__span" onClick={this.toggleSignUpModal}>
            Signup
          </span>
        </div>
        <span onClick={this.toggleSignInModal}>Login</span>
      </div>
    );

    const isAuth = (
      <div className="right__nav">
        <span onClick={this.handleLogout}>Logout</span>
      </div>
    );

    return (
      <header>
        <nav className="landing__nav">
          <Link to="/schedule" className="left__nav">
          <object
            type="image/svg+xml"
            data={barbell_logo}
            className="Logo"
          >
            BRAWNDO!
          </object>
          </Link>
          {authed ? isAuth : isNotAuth}
        </nav>

        {/* Signup Modal */}

        <Modal
          isOpen={this.state.signUpModal}
          toggle={this.toggleSignUpModal}
          className="sign__in"
        >
          <ModalHeader toggle={this.toggleSignUpModal}>SignUp</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
                name="username"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
                name="password"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="confirm password"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleFieldChange}
                name="confirmPassword"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleFieldChange}
                name="email"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSignup}>
              Signup
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleSignUpModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Signin Modal */}

        <Modal
          isOpen={this.state.signInModal}
          toggle={this.toggleSignInModal}
          className="sign__up"
        >
          <ModalHeader toggle={this.toggleSignInModal}>SignIn</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="username"
                value={this.state.signInName}
                onChange={this.handleFieldChange}
                name="signInName"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.signInPass}
                onChange={this.handleFieldChange}
                name="signInPass"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSignin}>
              Signin
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleSignInModal}>
              Cancel
            </Button>
            <Button color="danger" onClick={this.toggleForgotModal}>
              Forgot Password?
            </Button>
          </ModalFooter>
        </Modal>

        {/* end signin modal */}

        {/*forgot PW modal */}

        <Modal
          isOpen={this.state.forgotModal}
          toggle={this.toggleForgotModal}
          className="sign__up"
        >
          <ModalHeader toggle={this.toggleForgotModal}>
            Forgot Password?
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="Email"
                type="text"
                value={this.state.email}
                onChange={this.handleFieldChange}
                name="email"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleForgotPassword}>
              Request Recovery Link
            </Button>
            <Button color="secondary" onClick={this.toggleForgotModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Landing Page received this app state:",
    state
  );
  return {
    userInfo: state.auth,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { register, login, logout, forgotPassword }
)(withRouter(Nav));
