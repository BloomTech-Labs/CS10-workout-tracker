import React from "react";
import { connect } from "react-redux";
import { postNewRoutine } from "../../actions";

class WorkoutForm extends React.Component {

  constructor() {
    super();
    this.state = {
      routineName: "",
      isRoutineForm: true,
      exerciseName: "",
      weight: "",
      sets: "",
      reps: ""
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRoutineSubmit = e => {
    e.preventDefault();
    // call the routine add action here
    // let title = {title: this.state.routineName}
    this.props.postNewRoutine(this.state.routineName);

    this.setState({
      routineName: "",
      isRoutineForm: false
    });
  }

  handleExerciseSubmit = e => {
    e.preventDefault();

    // fire actions to add exercise

    this.setState({
      exerciseName: "",
      weight: "",
      sets: "",
      reps: ""
    });
  }

  render() {
    let routineForm = (
      <div className="routine__input__form">
        <h2>Please add a routine name</h2>
        <form onSubmit={this.handleRoutineSubmit}>
          <input
          value={this.state.routineName}
          name="routineName"
          placeholder="Routine Name"
          onChange={this.handleChange}
          />
          <button>Add Routine</button>
        </form>
      </div>
    )

    let exerciseForm = (
      <div className="routine__input__form">
        <h2>Please add your exercise</h2>
        <form onSubmit={this.handleExerciseSubmit}>
          <input
          value={this.state.exerciseName}
          name="exerciseName"
          placeholder="Exercise Name"
          onChange={this.handleChange}
          />
          <input
          value={this.state.weight}
          name="weight"
          placeholder="Weight"
          onChange={this.handleChange}
          />
          <input
          value={this.state.sets}
          name="sets"
          placeholder="Sets"
          onChange={this.handleChange}
          />
          <input
          value={this.state.reps}
          name="reps"
          placeholder="Reps"
          onChange={this.handleChange}
          />
          <button>Add Exercise</button>
        </form>
      </div>
    )

    return (
      <div className="workout__form">
        {this.state.isRoutineForm ? (routineForm): (exerciseForm)}
      </div>
    )
  }
}

export default connect(null, {postNewRoutine})(WorkoutForm);