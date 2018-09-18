import React, { Component } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { fetchRoutines, selectRoutine } from "../actions";

import "../less/workouts.css";

class Workouts extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  addExerciseToRoutine() {
    console.log("Stub for adding an exercise to a routine.");
  }

  selectRoutine(targetIndex) {
    this.props.selectRoutine(targetIndex);
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="WorkoutPlanner">
          <div className="RoutineBuilder">
            <div className="RoutineBuilder__Title">
              {this.props.selectedRoutine ? (
                this.props.selectedRoutine.title
              ) : (
                <div>Loading Content...</div>
              )}
            </div>
            <div className="RoutineBuilder__Tags" />
            <button
              className="RoutineBuilder__AddExercise"
              onClick={this.addExerciseToRoutine}
            />
            {this.props.selectedRoutine ? (
              this.props.selectedRoutine.exercises.map(exerciseInRoutine => (
                <form className="RoutineBuilder__ExerciseCard">
                  <div className="RoutineBuilder__ExerciseCardField--name">
                    {exerciseInRoutine.name}
                  </div>
                  <input className="RoutineBuilder__ExerciseCardField--weight" />
                  <input className="RoutineBuilder__ExerciseCardField--reps" />
                  <input className="RoutineBuilder__ExerciseCardField--sets" />
                </form>
              ))
            ) : (
              <div>Loading content...</div>
            )}
            <button className="SaveChanges" />
          </div>
          <div className="RoutinePicker">
            {this.props.routines ? (
              this.props.routines.map((routine, index) => (
                <div key={index} className="RoutinePicker__Card">
                  <div className="RoutinePicker__CardTitle"
                  onClick={() => this.selectRoutine(index)}>
                    {routine.title}
                  </div>
                  {routine.exercises.map((exercise, i) => {
                    return (
                      <div key={i} className="RoutinePicker__ExerciseListing">
                        {exercise.name}
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div>Loading content...</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('State at the time of render for "Workouts" view:', state);
  return {
    routines: state.workouts.routines,
    selectedRoutine: state.workouts.selectedRoutine
  };
};

export default connect(
  mapStateToProps,
  { fetchRoutines,
    selectRoutine
  }
)(Workouts);
