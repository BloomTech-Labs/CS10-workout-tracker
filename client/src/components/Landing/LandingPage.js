import React, { Component } from "react";
import "../../less/landing.css";
import Nav from "../Nav";
import JumboTron from "./JumboTron";
import AboutApp from "./AboutApp";
import Quote from "./Quote";
import HowToStart from "./HowToStart";
import Footer from "../Footer";
import "animate.css/animate.min.css";

class LandingPage extends Component {

  render() {
    return (
      <div className="main__landing__page">
        {/* <Nav /> */}
        <JumboTron />
        <AboutApp />
        <Quote />
        <HowToStart />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default LandingPage;
