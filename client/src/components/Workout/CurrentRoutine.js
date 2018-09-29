import React from "react";
import { connect } from "react-redux";

class CurrentRoutine extends React.Component {

  render() {
    const { currentRoutine } = this.props;
    console.log("What is current ", currentRoutine)
    {currentRoutine && console.log(currentRoutine.title)}

    return (
      <div className="current__routine">
        <div className="current__routine__container">
        <h2 style={{background: "white", color: "black"}}>{currentRoutine && currentRoutine.title}</h2>
        
        {currentRoutine && currentRoutine.exercises.map(exercise => {
          return(
            <div key={exercise._id}>
              <hr/>
              <h3 style={{color: "red"}}>{exercise.name}</h3>
              <hr/>
              <div>Weight: {exercise.currentWeight}</div>
              <div>Reps: {exercise.currentReps}</div>
              <div>Sets: {exercise.currentSets}</div>
            </div>
          )
        })}
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

export default connect(mapStateToProps)(CurrentRoutine);