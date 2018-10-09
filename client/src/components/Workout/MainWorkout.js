import React from "react";
import RoutineList from "./RoutineList";
import WorkoutForm from "./WorkoutForm";
import CurrentRoutine from "./CurrentRoutine";

class MainWorkout extends React.Component {
  render() {
    return (
      <div className="main__workout">
        <RoutineList />
        <WorkoutForm />
        <CurrentRoutine />
      </div>
    );
  }
}

export default MainWorkout;
