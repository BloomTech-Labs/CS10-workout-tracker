import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRoutine, postNewRoutine } from "../../actions";

class RoutineList extends Component {
  render() {
    return (
      <div className="RoutineList">
        {this.props.routines.map((routine, index) => 
          <div key={routine._id} className="RoutinePicker__Card">
            <div
              className="RoutinePicker__CardTitle"
              onClick={() => this.props.selectRoutine(index)}
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
