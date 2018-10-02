import React from "react";
import { connect } from "react-redux";
import { postNewRoutine, clearCurrentRoutine, postNewExerciseInRoutine } from "../../actions";

class WorkoutForm extends React.Component {

  constructor() {
    super();
    this.state = {
      routineName: "",
      exerciseName: "",
      weight: "",
      sets: "",
      reps: "",
      errors: {}
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRoutineSubmit = e => {
    e.preventDefault();
    const newErrors = {}
    // call the routine add action here
    if(this.state.routineName.trim() === "") {
      newErrors.routineName = "Required Routine Name"
    }

    if(Object.keys(newErrors).length > 0) {
      return this.setState({errors: newErrors});
    }

    this.props.postNewRoutine(this.state.routineName);

    this.setState({
      routineName: "",
      errors: {}
    });
  }

  handleExerciseSubmit = (e, rountineId) => {
    e.preventDefault();
    const { exerciseName, weight, sets, reps } = this.state;
    const newError = {}
    if(exerciseName.trim() === "") {
      newError.exerciseName = "Required Exercise Name"
    }

    if(weight <= 0 || weight > 1000) {
      newError.weight = "Weight should be between 1 and 1000"
    }

    if(weight == "") {
      newError.weight = "Required Weight";
    }

    if(sets <= 0 || weight > 1000) {
      newError.sets = "Sets mush be between 1 and 1000"
    }

    if(sets == "") {
      newError.sets = "Required Sets";
    }

    if(reps <= 0 || weight > 1000) {
      newError.reps = "Reps mush be between 1 and 1000"
    }

    if(reps == "") {
      newError.reps = "Required Reps";
    }

    if(Object.keys(newError).length > 0) {
      return this.setState({errors: newError});
    }

    const exerciseData = {
      name: exerciseName,
      currentWeight: weight,
      currentSets: sets,
      currentReps: reps
    }
  

    if(this.props.focusRoutine) {
      this.props.postNewExerciseInRoutine(this.props.focusRoutine._id, exerciseData);
    }

    this.setState({
      exerciseName: "",
      weight: "",
      sets: "",
      reps: "",
      errors: {}
    });
  }

  showRoutineForm = () => {
    return (
        <div className="routine__input__form">
          <h2>Please add a routine name</h2>
          <form onSubmit={this.handleRoutineSubmit}>
            <input
            value={this.state.routineName}
            name="routineName"
            placeholder="Routine Name"
            onChange={this.handleChange}
            />
            {this.state.errors.routineName ? <span>{this.state.errors.routineName} </span>: null}
            <button>Add Routine</button>
          </form>
        </div>
      )

  }

  showExerciseForm = () => {
    return (
      <div className="routine__input__form">
        <button onClick={() => this.props.clearCurrentRoutine()}>Create a new routine</button>
        <h2>Please add your exercise</h2>
        <form onSubmit={this.handleExerciseSubmit}>
          <input
          value={this.state.exerciseName}
          name="exerciseName"
          placeholder="Exercise Name"
          onChange={this.handleChange}
          />
          {this.state.errors.exerciseName ? <span>{this.state.errors.exerciseName}</span>: null}
          <input
          value={this.state.weight}
          name="weight"
          type="number"
          placeholder="Weight"
          onChange={this.handleChange}
          />
          {this.state.errors.weight ? <span>{this.state.errors.weight}</span>: null}
          <input
          value={this.state.sets}
          name="sets"
          type="number"
          placeholder="Sets"
          onChange={this.handleChange}
          />
          {this.state.errors.sets ? <span>{this.state.errors.sets}</span>: null}
          <input
          value={this.state.reps}
          name="reps"
          type="number"
          placeholder="Reps"
          onChange={this.handleChange}
          />
          {this.state.errors.reps ? <span>{this.state.errors.reps}</span>: null}
          <button>Add Exercise</button>
        </form>
      </div>
    )
  }
  
  render() {

    return (
      <div className="workout__form">
        {this.props.focusRoutine ? (this.showExerciseForm()): (this.showRoutineForm())}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    focusRoutine: state.RoutineManager.focusedRoutine
  };
};

export default connect(mapStateToProps, {postNewRoutine, clearCurrentRoutine, postNewExerciseInRoutine})(WorkoutForm);