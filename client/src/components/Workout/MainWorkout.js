import React from "react";
import RoutineList from "./RoutineList";
import WorkoutForm from "./WorkoutForm";
import CurrentRoutine from "./CurrentRoutine";
import "../../less/workout.css";

class MainWorkout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="main__workout">
        <RoutineList />
        <WorkoutForm />
        <CurrentRoutine />
      </div>
    );
  }
}

export default MainWorkout;