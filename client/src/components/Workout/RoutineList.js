import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchRoutines, selectRoutine } from "../../actions";
import { TimelineLite } from "gsap";
import $ from "jquery";

class RoutineList extends React.Component {
  constructor(props) {
    super(props);
    this.myTween = new TimelineLite();
    this.myElements = [];
  }

  componentDidMount() {
    this.props.fetchRoutines();
    this.myTween.staggerFrom($(".routine"), 0.5, { opacity: 0, y: 50}, 0.1).delay(1);
  }

  render() {
    const { currentRoutines } = this.props;
    console.log(currentRoutines);
    let routines = currentRoutines.map((routine, index) => {
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
