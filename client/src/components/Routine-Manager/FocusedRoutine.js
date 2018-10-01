import React, { Component } from "react";
import { connect } from "react-redux";
import {
  postNewExerciseInRoutine,
  updateExercise,
  updateRoutine,
  scheduleWorkout
} from "../../actions";

import "../../css/main.css";

class FocusedRoutine extends Component {
  render() {
    return (
      <div className="RoutineBuilder">
        <div className="RoutineBuilder__Title">
          {this.props.selectedRoutine ? (
            <input
              name="RoutineName"
              placeholder={this.props.selectedRoutine.title}
            />
          ) : (
            <div>Loading Content...</div>
          )}
        </div>
        <div className="RoutineBuilder__Tags" />
        <button
          className="RoutineBuilder__AddExercise"
          onClick={() =>
            this.props.postNewExerciseInRoutine(this.props.selectedRoutine._id)
          }
        >
          Add an exercise
        </button>
        {this.props.selectedRoutine ? (
          this.props.selectedRoutine.exercises.map(
            (exerciseInRoutine, index) => {
              let {
                name,
                currentReps,
                currentSets,
                currentWeight
              } = exerciseInRoutine;
              return (
                <form key={index} className="RoutineBuilder__ExerciseCard">
                  <input
                    name="ExerciseName"
                    onChange={event => (name = event.target.value)}
                    placeholder={exerciseInRoutine.name}
                    className="RoutineBuilder__ExerciseCardField--name"
                  />
                  <input
                    name="ExerciseWeight"
                    onChange={event => (currentWeight = event.target.value)}
                    placeholder={exerciseInRoutine.currentWeight}
                    className="RoutineBuilder__ExerciseCardField--weight"
                  />
                  <input
                    name="ExerciseReps"
                    onChange={event => (currentReps = event.target.value)}
                    placeholder={exerciseInRoutine.currentReps}
                    className="RoutineBuilder__ExerciseCardField--reps"
                  />
                  <input
                    name="ExerciseSets"
                    onChange={event => (currentSets = event.target.value)}
                    placeholder={exerciseInRoutine.currentSets}
                    className="RoutineBuilder__ExerciseCardField--sets"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      this.props.updateExercise(
                        exerciseInRoutine._id,
                        name,
                        currentWeight,
                        currentReps,
                        currentSets
                      );
                    }}
                  >
                    Update Exercise
                  </button>
                </form>
              );
            }
          )
        ) : (
          <div>Loading content...</div>
        )}
        <button
          className="SaveChanges"
          onClick={() =>
            this.props.updateRoutine(
              this.props.selectedRoutine._id,
              document.getElementsByName("RoutineName")[0].value
            )
          }
        >
          Save Routine
        </button>
        <button
          className="PerformRoutine"
          onClick={() =>
            this.props.scheduleWorkout(this.props.selectedRoutine._id)
          }
        >
          Perform this routine!
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRoutine: state.RoutineManager.focusedRoutine
  };
};

export default connect(
  mapStateToProps,
  { postNewExerciseInRoutine, updateExercise, updateRoutine, scheduleWorkout }
)(FocusedRoutine);
