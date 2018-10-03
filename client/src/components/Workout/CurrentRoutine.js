import React from "react";
import { connect } from "react-redux";
import { deleteExercise, deleteRoutine } from "../../actions";

class CurrentRoutine extends React.Component {

  handleDelete = (exerciseId) => {
    this.props.deleteExercise(exerciseId);
  }

  handleDeleteRoutine = (routineId) => {
    this.props.deleteRoutine(routineId);
    console.log("hitting this")
  }

  render() {
    const { currentRoutine } = this.props;
    console.log("What is current ", currentRoutine)
    {currentRoutine && console.log(currentRoutine.title)}

    return (
      <div className="current__routine">
        <div className="current__routine__container">
        <h2>CURRENT ROUTINE</h2>
        <h3>{currentRoutine && currentRoutine.title}</h3>
        {currentRoutine ? (
          <button onClick={() => this.handleDeleteRoutine(currentRoutine._id)}>Delete Routine</button >
        ): null} 
        <div className="exercise__list">
          {currentRoutine && currentRoutine.exercises.map(exercise => {
            return(
              <div key={exercise._id}>
                <hr/>
                <h3>{exercise.name}</h3>
                <button onClick={() => this.handleDelete(exercise._id)}>Delete</button>
                <hr/>
                <div>Weight: {exercise.currentWeight}</div>
                <div>Reps: {exercise.currentReps}</div>
                <div>Sets: {exercise.currentSets}</div>
              </div>
            )
          })}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoutine: state.RoutineManager.focusedRoutine
  };
};

export default connect(mapStateToProps, { deleteExercise, deleteRoutine })(CurrentRoutine);