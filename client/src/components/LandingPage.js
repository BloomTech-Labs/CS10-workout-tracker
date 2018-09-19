import React, { Component } from "react";
import MainLandingImg from "../img/main_landing.png";
import "../less/landing.css";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faCreditCard, faDumbbell} from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarAlt, faCreditCard, faDumbbell);
// library.add(FontAwesomeIcon);


class LandingPage extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="main__landing__page">
        <nav className="landing__nav">
          <div className="left__nav">LOGO</div>
          <div className="right__nav">
            <span className="first__nav__span">Signup</span>
            <span>Login</span>
          </div>
        </nav>

        <section className="main__landing__background">
          <div className="container">
            <div className="col-2">
                <div className="main__content__text">
                <ScrollAnimation animateIn="fadeInUp" >
                  <h1><span className="primary__color__font">WELCOME TO </span>WORKOUT TRACKER</h1>
                  <p>Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum has been the industry's.</p>
                  </ScrollAnimation>
                </div>
              <img className="main__landing__image" src={MainLandingImg} alt="Main Workout"/>
            </div>
          </div>
        </section>

        <section className="about__app__landing">
          <div className="container">
          <ScrollAnimation animateIn="fadeInUp" >
            <div className="display__more">
              <div className="container">
                <img src={MainLandingImg} alt="Read more"/>
                <p>Lorem Ipsum has been the industry's standard dummy. this is a test to test.  Lorem Ipsum has been the industry's standard dummy. this is a test to test.  Lorem Ipsum has been the industry's.</p>
              </div>
            </div>
          </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="fadeInUp" >
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
          <div 
            className="landing__quote" >
              <h2>
                <strong><ScrollAnimation animateIn="fadeInUp">"PAIN IS WEAKNESS LEAVING THE BODY"</ScrollAnimation></strong>
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
              <p><span>1</span> Signup</p>
              <p><span>2</span> Add data</p>
              <p><span>3</span> Workout</p>
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

export default LandingPage;
