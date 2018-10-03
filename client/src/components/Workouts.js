import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchRoutines,
  selectRoutine,
  postNewRoutine,
  updateRoutine,
  postNewExerciseInRoutine,
  updateExercise,
  scheduleWorkout
} from "../actions";

class Workouts extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  postNewRoutine() {
    this.props.postNewRoutine();
  }

  addExerciseToRoutine() {
    this.props.postNewExerciseInRoutine(this.props.selectedRoutine._id);
  }

  selectRoutine(targetIndex) {
    this.props.selectRoutine(targetIndex);
  }

  updateExercise(exerciseId, name, weight, reps, sets) {
    // console.log("About to post this update data: ", name, weight, reps, sets);
    this.props.updateExercise(exerciseId, name, weight, reps, sets);
  }

  updateRoutine(routineId, title) {
    this.props.updateRoutine(routineId, title);
  }

  scheduleWorkout(routineId) {
    this.props.scheduleWorkout(routineId);
  }

  render() {
    return (
      <div className="container">
        <div className="WorkoutPlanner">
          <div className="RoutinePicker">
            {this.props.routines ? (
              this.props.routines.map((routine, index) => (
                <div key={index} className="RoutinePicker__Card">
                  <div
                    className="RoutinePicker__CardTitle"
                    onClick={() => this.selectRoutine(index)}
                  >
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
            <button
              className="RoutinePicker__NewRoutineBtn"
              onClick={() => this.postNewRoutine()}
            >
              Build a new routine
            </button>
          </div>
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
              onClick={() => this.addExerciseToRoutine()}
            >
              Add an exercise
            </button>
            {this.props.selectedRoutine ? (
              this.props.selectedRoutine.exercises.map(
                (exerciseInRoutine, iKey) => {
                  let {
                    name,
                    currentReps,
                    currentSets,
                    currentWeight
                  } = exerciseInRoutine;
                  console.log(
                    "Captured these variables for the exercise card: ",
                    exerciseInRoutine,
                    name,
                    currentReps,
                    currentSets,
                    currentWeight
                  );
                  return (
                    <form key={iKey} className="RoutineBuilder__ExerciseCard">
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
                        onClick={() =>
                          this.updateExercise(
                            exerciseInRoutine._id,
                            name,
                            currentWeight,
                            currentReps,
                            currentSets
                          )
                        }
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
                this.updateRoutine(
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
                this.scheduleWorkout(this.props.selectedRoutine._id)
              }
            >
              Perform this routine!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('State at the time of render for "Workouts" view:', state);
  return {
    routines: state.workouts.routines,
    selectedRoutine: state.workouts.selectedRoutine
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoutines,
    selectRoutine,
    postNewRoutine,
    postNewExerciseInRoutine,
    updateExercise,
    updateRoutine,
    scheduleWorkout
  }
)(Workouts);
