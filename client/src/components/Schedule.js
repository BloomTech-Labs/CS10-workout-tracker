import React, { Component } from "react";
import NavBar from "./NavBar";
import Calendar from "./Calendar";

class Schedule extends Component {
  render() {
    return (
      <div>
        <NavBar />
        this is the schedule component
        <Calendar />
      </div>
    );
  }
}

export default Schedule;
