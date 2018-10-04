import React from "react";
import { connect } from "react-redux";
import { fetchRoutines, selectRoutine } from "../../actions";

class RoutineList extends React.Component {

  componentDidMount() {
    this.props.fetchRoutines();
  }

  render() {
    const { currentRoutines } = this.props;
    console.log(currentRoutines);
    let routines = currentRoutines.map(routine => {
      return (
      <div key={routine._id} className="routine" onClick={() => this.props.selectRoutine(routine._id)}>{routine.title}</div>
      )
    });

    return (
      <div className="routine__list">
        <div className="routine__list__container">
          <h2>YOUR ROUTINES</h2>
          {routines}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoutines: state.RoutineManager.routines
  };
};

export default connect(mapStateToProps ,{ fetchRoutines, selectRoutine })(RoutineList);