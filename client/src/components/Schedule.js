import React, { Component } from "react";
import NavBar from "./NavBar";
import Calender from "./Calender";

class Schedule extends Component {
  render() {
    return (
      <div>
        <NavBar />
        this is the schedule component
        <Calender />
      </div>
    );
  }
}

export default Schedule;
