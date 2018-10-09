import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
        <div
          key={routine._id}
          className="routine"
          onClick={() => this.props.selectRoutine(routine._id)}
        >
          {routine.title}
        </div>
      );
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

RoutineList.propTypes = {
  currentRoutine: PropTypes.object,
  fetchRoutines: PropTypes.func,
  selectRoutine: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchRoutines, selectRoutine }
)(RoutineList);
