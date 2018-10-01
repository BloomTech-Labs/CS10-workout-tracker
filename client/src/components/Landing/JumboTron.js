import React from "react";
import MainLandingImg from "./img/main_landing.png";
import ScrollAnimation from 'react-animate-on-scroll';

class JumboTron extends React.Component {

  render() {

    return (
      <section className="main__landing__background">
        <div className="container">
          <div className="col__2">
              <div className="main__content__text">
              <ScrollAnimation animateIn="fadeInUp" 
              animatePreScroll={false}>
                <h1><span className="primary__color__font">WELCOME TO </span>WORKOUT TRACKER</h1>
                <p>Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum has been the industry's.</p>
                </ScrollAnimation>
              </div>
            <img className="main__landing__image" src={MainLandingImg} alt="Main Workout"/>
          </div>
        </div>
      </section>
    );
  }
}

export default JumboTron;