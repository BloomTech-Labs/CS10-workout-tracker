import React, { Component } from "react";
import NavBar from "./NavBar";
import Calendar1 from "./Calendar1";

class Schedule extends Component {
  render() {
    return (
      <div>
        <NavBar />
        this is the schedule component
        <Calendar1 />
      </div>
    );
  }
}

export default Schedule;
