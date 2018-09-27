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
    completed: false,
    workouts: [],
    performances: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.performances !== state.performances) {
      return {
        performances: props.performances,
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

  handleChange = e => {
    /* utilizing onChange inside <select> to grab Id of the routine being selected so it 
    can be sent as an argument to scheduleWorkout function */
    this.selectedRoutineValue = e.target.value;
    console.log(this.selectedRoutineValue);
    this.props.routines.map(routine => {
      if (this.selectedRoutineValue === routine.title) {
        return (this.selectedRoutineId = routine._id);
      }
    });
  };

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
    console.log(selected);
    this.selectedEventTitle = selected.title;
    this.selectedEventId = selected.id;
    this.selectedEventDate = selected.date;
    this.checkboxModalToggle();
  };

  scheduleWorkout = (e) => {
    this.props.scheduleWorkout(this.selectedRoutineId, this.selectedSlotDate);
    // this.selectedRoutineValue = "";
    this.selectedRoutineId = "";
    this.selectedSlotDate = "";
    this.schedulingModalToggle();
  };

  deleteWorkout = () => {
    this.props.deleteWorkout(this.selectedEventId);
    this.checkboxModalToggle();
  };


  handleCheckOffInDB = performanceId => {

    console.log(performanceId);
    
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
    // this.setState({ completed: !this.state.completed });
   
    
  };

  handleIndividualCheckbox = (event) => {
    // console.log(event.target.value)
    let performances = this.state.performances
    performances.forEach(performance => {
      // console.log(performance._id)
      if (performances._id === event.target.value)
        performance.completed =  event.target.checked
      })
      console.log(event.target.checked)
    this.setState({performances: performances}, console.log(this.state.performances))
 }

  events = [];
  routine;
  exercise;

  selectedRoutineValue;
  selectedRoutineId;
  selectedSlotDate;

  selectedExercises;
  selectedEventId;
  selectedEventDate;
  selectedEventTitle;

  render() {

    console.log(this.state.performances)
    console.log(this.props.performances)

      this.events = this.props.workouts.map(workout => ({
        start: new Date(workout.date),
        end: new Date(workout.date),
        title: workout.routine.title || this.selectedRoutineValue, /* TODO: this is buggy. It changes the name 
        of the previously scheduled routine to the name of the most recently scheduled routine as well. */
        id: workout._id,
        exercises: workout.routine.exercises,
        performances: workout.performances
      }));
    

    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );

    let checkoff = [];
    let checkoffObj = {};

    let workoutId;

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
            {console.log(this.props.routines)}

            {checkoff.map(
              checkoffObj =>
                checkoffObj.workoutId === this.selectedEventId ? (
                  <div key={checkoffObj.performanceId}>
                    <div
                      style={{ display: "flex" }}
                    >
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
                          checked={this.state.performances.filter(performance => performance._id === checkoffObj.performanceId)[0].completed}
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
