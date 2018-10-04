import React from "react";
import { withRouter } from "react-router-dom";
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
import { register, login, logout, clearErrors, forgotPassword, clearCurrentRoutine } from "../actions";
import validator from "validator";

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
      forgotModal: false,
      errors: {}
    };
  }

  handleLogout = event => {
    this.props.logout();
    this.props.clearCurrentRoutine();
    this.props.history.push("/");
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleSignInModal = () => {
    this.props.clearErrors();
    this.setState({
      signInModal: !this.state.signInModal,
      errors: {}
    });
  };

  toggleSignUpModal = () => {
    this.props.clearErrors();
    this.setState({
      signUpModal: !this.state.signUpModal,
      errors: {}
    });
  };

  toggleForgotModal = () => {
    this.setState({
      forgotModal: !this.state.forgotModal
    });
  };

  handleSignup = event => {
    event.preventDefault();
    const { username, password, confirmPassword, email } = this.state;
    const newErrors = {};

    if(username.trim() === "") {
      newErrors.username = "Username is Required";
    }

    if(password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if(password.trim() === "") {
      newErrors.password = "Password is Required";
    }

    if(confirmPassword.trim().length < 6) {
      newErrors.confirmPassword = "Confirm Password must be at least 6 characters";
    }

    if(confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is Required";
    }

    if(password.trim() !== confirmPassword.trim()) {
      newErrors.password = "Must match Confirm Password";
      newErrors.confirmPassword = "Must match Password";
    }

    if(!validator.isEmail(email.trim())) {
      newErrors.email = "Must be valid email";
    }

    if(email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if(Object.keys(newErrors).length > 0) {
      return this.setState({errors: newErrors});
    }

    if (this.state.password === this.state.confirmPassword) {
      this.props.register(
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        },
        this.props.history,
        this.toggleSignUpModal
      );
    }
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      errors: {}
    });
  };

  handleSignin = event => {
    event.preventDefault();
    this.props.login(
      {
        username: this.state.signInName,
        password: this.state.signInPass
      },
      this.props.history,
      this.toggleSignInModal
    );

    this.setState({
      signInName: "",
      signInPass: ""
    });
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
    const { error } = this.props.valError;
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

    const emailErrors = (
      this.state.errors.email ? <span className="form__validation">{this.state.errors.email}</span>: null
    )

    const usernameErrors = (
      this.state.errors.username ? <span className="form__validation">{this.state.errors.username}</span>: null
    )

    const passwordErrors = (
      this.state.errors.password ? <span className="form__validation">{this.state.errors.password}</span>: null
    )

    const confirmPasswordErrors = (
      this.state.errors.confirmPassword ? <span className="form__validation">{this.state.errors.confirmPassword}</span>: null
    )

    return (
      <header>
        <nav className="landing__nav">
          <div className="left__nav">LOGO</div>
          {authed ? isAuth : isNotAuth}
        </nav>

        {/* Signup Modal */}

        <Modal
          isOpen={this.state.signUpModal}
          toggle={this.toggleSignUpModal}
          className="sign__up"
        >
          <ModalHeader toggle={this.toggleSignUpModal}>SignUp</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
                name="username"
                autocomplete="off"
              />
            </InputGroup>
            {usernameErrors ? usernameErrors : (this.props.valError.message ? <span className="form__validation">{this.props.valError.message}</span>: null)}
            {/* {usernameErrors}
            {this.props.valError.message ? <span>{this.props.valError.message}</span>: null} */}
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
                name="password"
                autocomplete="off"
              />
            </InputGroup>
            {passwordErrors}
            <InputGroup>
              <Input
                placeholder="confirm password"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleFieldChange}
                name="confirmPassword"
                autocomplete="off"
              />
            </InputGroup>
            {confirmPasswordErrors}
            <InputGroup>
              <Input
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleFieldChange}
                name="email"
                autocomplete="off"
              />   
            </InputGroup>
            {emailErrors ? emailErrors : (this.props.valError.message ? <span className="form__validation">{this.props.valError.message}</span>: null)}
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
          className="sign__in"
        >
          <ModalHeader toggle={this.toggleSignInModal}>SignIn</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="username"
                value={this.state.signInName}
                onChange={this.handleFieldChange}
                name="signInName"
                autocomplete="off"
              />
            </InputGroup>
            {this.props.valError.error ?<span className="form__validation">{this.props.valError.error}</span> : null}
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.signInPass}
                onChange={this.handleFieldChange}
                name="signInPass"
                autocomplete="off"
              />
            </InputGroup>
            {this.props.valError.error ? <span className="form__validation">{this.props.valError.error}</span> : null}
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
                autocomplete="off"
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
    msg: state.auth.message,
    valError: state.valError
  };
};

export default connect(
  mapStateToProps,
  { register, login, logout, clearErrors, forgotPassword, clearCurrentRoutine }
)(withRouter(Nav));
