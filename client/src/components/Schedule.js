import React, { Component } from "react";
import NavBar from "./NavBar";
import Calender from "./Calender";

class Schedule extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Calender />
      </div>
    );
  }
}

export default Schedule;
