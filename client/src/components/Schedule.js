import React, { Component } from "react";
import NavBar from "./NavBar";
import CalendarPage from "./CalendarPage";

class Schedule extends Component {
  render() {
    return (
      <div>
        <NavBar />
        this is the schedule component
        <CalendarPage />
      </div>
    );
  }
}

export default Schedule;
