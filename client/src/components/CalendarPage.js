import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  fetchRoutines,
  scheduleWorkout,
  fetchAllWorkouts,
  deleteWorkout,
  fetchAllPerformanceDocs
} from "../actions";
import "../less/calendarPage.css";

BigCalendar.momentLocalizer(moment);

class CalendarPage extends Component {
  state = {
    schedulingModal: false,
    checkboxModal: false,
    performances: [],
  };

  /* This is for putting the performances array from the calendar reducer onto local state.
  this.state.performances is being used to toggle completed field of each Performance Doc*/
  static getDerivedStateFromProps(props, state) {
    if (props.performances !== state.performances) {
      return {
        performances: props.performances
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount() {
    this.props.fetchRoutines();
    this.props.fetchAllWorkouts();
    this.props.fetchAllPerformanceDocs();
  }

  schedulingModalToggle = () => {
    this.setState({
      schedulingModal: !this.state.schedulingModal
    });
  };

  checkboxModalToggle = () => {
    this.setState({
      checkboxModal: !this.state.checkboxModal
    });
  };

  /* the selected in the parameter is an object leveraged by big-react-calendar. 
  It represents the date box which you click on on the calendar. */
  onSelectSlot = selected => {
    this.selectedSlotDate = selected.start;
    this.schedulingModalToggle();
  };

  onSelectEvent = selected => {
    this.selectedEventTitle = selected.title;
    this.selectedEventId = selected.id;
    this.checkboxModalToggle();
  };

  handleChange = e => {
    /* this is utilizing the onChange inside <select> of the scheduling modal to grab 
    the Id of the selected routine so it can be sent as an argument to this.props.scheduleWorkout */
    this.selectedRoutineValue = e.target.value;
    this.props.routines.map(routine => {
      if (this.selectedRoutineValue === routine.title) {
        return (this.selectedRoutineId = routine._id);
      }
    });
  };

  scheduleWorkout = () => {
    this.props.scheduleWorkout(this.selectedRoutineId, this.selectedSlotDate);
    this.selectedRoutineId = "";
    this.selectedSlotDate = "";
    this.schedulingModalToggle();
    window.location.reload() /* TODO: this is  a temp fix for performance(s) being absent in workout 
    doc upon scheduling. Hypothesis: they are absent because findByIdAndUpdate is not returning
    the updated workout doc. Tried {new: true} but to no avail */
  };

  deleteWorkout = () => {
    this.props.deleteWorkout(this.selectedEventId);
    this.checkboxModalToggle();
  };

  // this updates the toggled boolean of the specified performance doc in the DB
  handleCheckOffInDB = performanceId => {
    let token = localStorage.getItem("token");
    let requestOptions = { headers: { "x-access-token": token } };
    axios
      .put(
        `http://localhost:8080/performance/${performanceId}`,
        {},
        requestOptions
      )
      .then(updatedPerformance => {
        console.log("successfully updated performance");
      })
      .catch(err => {
        console.log("error updating performance");
      });
  };

  /* this uses the performances array in the local component state
    to keep track of which checkbox(es) have been marked and which remain unmarked */
  handleIndividualCheckbox = event => {
    let performances = this.state.performances;
    performances.forEach(performance => {
      if (performance._id === event.target.value) {
        performance.completed = !performance.completed;
      }
    });
    this.setState({ performances });
  };

  events = [];

  selectedRoutineValue;
  selectedRoutineId;
  selectedSlotDate;

  selectedExercises;
  selectedEventId;
  selectedEventTitle;

  render() {
    
    // the events array is required by react-big-calendar
    this.events = this.props.workouts.map(workout => ({
      start: new Date(workout.date),
      end: new Date(workout.date),
      title: workout.routine.title,
      id: workout._id,
    }));

    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );

    let checkoff = [];
    let checkoffObj = {};

    let workoutId;

    /* the checkoffObj contains the info that gets populated on the modal 
    that allows the user to checkoff completed exercise(s)/performance(s) */
    this.props.workouts.map(workout => {
      workoutId = workout._id;
      workout.performances.map(performance => {
        checkoffObj.workoutId = workoutId;
        checkoffObj.performanceId = performance._id;
        checkoffObj.completed = performance.completed;
        checkoffObj.exerciseName = performance.exercise.name;
        checkoffObj.weight = performance.weight;
        checkoffObj.reps = performance.reps;
        checkoffObj.sets = performance.sets;

        checkoff.push(checkoffObj);

        checkoffObj = {};
      });
    });

    return (
      <React.Fragment>
        <div style={{ height: "500px", width: "90%" }}>
          <BigCalendar
            popup
            events={this.events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "100vh" }}
            selectable={true}
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
          />
        </div>

        {/* Scheduling Modal */}

        <Modal
          isOpen={this.state.schedulingModal}
          toggle={this.schedulingModalToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.schedulingModalToggle}>
            Schedule a Workout!
          </ModalHeader>
          <ModalBody>
            {/* Drop down for selecting a routine */}
            <div>Select Workout</div>
            <select
              value={this.state.selectedRoutineValue}
              onChange={this.handleChange}
            >
              <option value="select a routine">select a routine</option>
              {this.props.routines.map(routine => (
                <option key={routine._id} value={routine.title}>
                  {routine.title}
                </option>
              ))}
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.scheduleWorkout}>
              Schedule!
            </Button>{" "}
            <Button color="secondary" onClick={this.schedulingModalToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Checkbox Modal */}

        <Modal
          isOpen={this.state.checkboxModal}
          toggle={this.checkboxModalToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.checkboxModalToggle}>
            {this.selectedEventTitle}
          </ModalHeader>
          <ModalBody>
            {checkoff.map(
              checkoffObj =>
                checkoffObj.workoutId === this.selectedEventId ? (
                  <div key={checkoffObj.performanceId}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <input
                          type="checkbox"
                          key={checkoffObj.performanceId}
                          value={checkoffObj.performanceId}
                          onClick={this.handleIndividualCheckbox}
                          onChange={() => {
                            this.handleCheckOffInDB(checkoffObj.performanceId);
                          }}
                          style={{ marginLeft: "15px", marginTop: "5px" }}
                          checked={
                            this.state.performances.filter(
                              performance =>
                                performance._id === checkoffObj.performanceId
                            )[0].completed
                          }
                        />
                      </div>
                      <div style={{ color: "white" }}>
                        {checkoffObj.exerciseName}
                      </div>
                    </div>
                    <div>
                      {`weight : ${checkoffObj.weight}`}
                      {`sets : ${checkoffObj.sets}`}
                      {`reps : ${checkoffObj.reps}`}
                    </div>
                  </div>
                ) : null
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.checkboxModalToggle}>
              Cancel
            </Button>
            <Button color="danger" onClick={this.deleteWorkout}>
              Delete Workout
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Calendar Page received this app state:",
    state
  );
  return {
    routines: state.calendar.routines,
    workouts: state.calendar.workouts,
    performances: state.calendar.performances
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoutines,
    scheduleWorkout,
    fetchAllWorkouts,
    deleteWorkout,
    fetchAllPerformanceDocs
  }
)(CalendarPage);
