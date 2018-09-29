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
      reps: ""
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRoutineSubmit = e => {
    e.preventDefault();
    // call the routine add action here
    this.props.postNewRoutine(this.state.routineName);

    this.setState({
      routineName: ""
    });
  }

  handleExerciseSubmit = (e, rountineId) => {
    e.preventDefault();

    const exerciseData = {
      name: this.state.exerciseName,
      weight: this.state.weight,
      sets: this.state.sets,
      reps: this.state.reps
    }
    if(this.props.focusRoutine) {
      this.props.postNewExerciseInRoutine(this.props.focusRoutine._id, exerciseData);
    }

    this.setState({
      exerciseName: "",
      weight: "",
      sets: "",
      reps: ""
    });
  }

  render() {
    console.log("WHAT IS FOCUSEDROUTE ",this.props.focusRoutine);
    let routineForm = (
      <div className="routine__input__form">
        <h2>Please add a routine name</h2>
    {this.props.focusRoutine && (<p>this is a test: {this.props.focusRoutine.title}</p>) }
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
        <button onClick={() => this.props.clearCurrentRoutine()}>Create a new routine</button>
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
        {this.props.focusRoutine ? (exerciseForm): (routineForm)}
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