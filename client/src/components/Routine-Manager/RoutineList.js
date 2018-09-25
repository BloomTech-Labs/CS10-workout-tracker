import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRoutine, postNewRoutine } from "../../actions";

import "../../less/workouts.css";

class RoutineList extends Component {
  render() {
    return (
      <div className="RoutineList">
        {this.props.routines.map((routine, index) => 
          <div key={routine._id} className="RoutinePicker__Card">
            <div
              className="RoutinePicker__CardTitle"
              onClick={() => this.props.selectRoutine(index, routine._id)}
            >
              {routine.title}
            </div>
          </div>
        )}
        <button
          className="RoutinePicker__NewRoutineBtn"
          onClick={() => this.props.postNewRoutine()}
        >
          Build a new routine
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    routines: state.RoutineManager.routines
  };
};

export default connect(
  mapStateToProps,
  { selectRoutine, postNewRoutine }
)(RoutineList);
