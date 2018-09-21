import React, { Component } from "react";
import MainLandingImg from "../img/main_landing.png";
import "../less/landing.css";
import { connect } from "react-redux";
import { register, login, forgotPassword } from "../actions";
import ScrollAnimation from "react-animate-on-scroll";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup
} from "reactstrap";
import "animate.css/animate.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faCreditCard,
  faDumbbell
} from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarAlt, faCreditCard, faDumbbell);

class LandingPage extends Component {
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
      <div className="main__landing__page">
        <nav className="landing__nav">
          <div className="left__nav">LOGO</div>
          <div className="right__nav">
            <div>
              <span
                className="first__nav__span"
                onClick={this.toggleSignUpModal}
              >
                Signup
              </span>
            </div>
            <span onClick={this.toggleSignInModal}>Login</span>
          </div>
        </nav>

        <section className="main__landing__background">
          <div className="container">
            <div className="col__2">
              <div className="main__content__text">
                <ScrollAnimation animateIn="fadeInUp">
                  <h1>
                    <span className="primary__color__font">WELCOME TO </span>
                    WORKOUT TRACKER
                  </h1>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy. Lorem
                    Ipsum has been the industry's.
                  </p>
                </ScrollAnimation>
              </div>
              <img
                className="main__landing__image"
                src={MainLandingImg}
                alt="Main Workout"
              />
            </div>
          </div>
        </section>

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

        <section className="about__app__landing">
          <div className="container">
            <ScrollAnimation animateIn="fadeInUp">
              <div className="display__more">
                <div className="container">
                  <img src={MainLandingImg} alt="Read more" />
                  <p>
                    Lorem Ipsum has been the industry's standard dummy. this is
                    a test to test. Lorem Ipsum has been the industry's standard
                    dummy. this is a test to test. Lorem Ipsum has been the
                    industry's.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="fadeInUp">
            <h2>About the app</h2>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
            <div className="landing__icons">
              <div className="container">
                <FontAwesomeIcon icon="calendar-alt" />
                <FontAwesomeIcon icon="credit-card" />
                <FontAwesomeIcon icon="dumbbell" />
              </div>
            </div>
          </ScrollAnimation>
        </section>

        <section>
          <div className="landing__quote">
            <h2>
              <strong>
                <ScrollAnimation animateIn="fadeInUp">
                  "PAIN IS WEAKNESS LEAVING THE BODY"
                </ScrollAnimation>
              </strong>
            </h2>
          </div>
        </section>

        <section className="landing__start">
          <div className="landing__start__content">
            <ScrollAnimation animateIn="fadeInUp">
              <h2>How To Start</h2>
            </ScrollAnimation>
            <div>
              <ScrollAnimation animateIn="fadeInUp">
                <p>
                  <span>1</span> Signup
                </p>
                <p>
                  <span>2</span> Add data
                </p>
                <p>
                  <span>3</span> Workout
                </p>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        <footer>
          <p>&copy; Workout Tracker 2018</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Landing Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { register, login, forgotPassword }
)(LandingPage);
