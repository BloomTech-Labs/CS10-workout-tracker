import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchRoutines, scheduleWorkout, fetchAllWorkouts } from "../actions";

BigCalendar.momentLocalizer(moment);

class CalendarPage extends Component {
  state = {
    modal: false,
    checkboxModal: false,
  };

  componentDidMount() {
    this.props.fetchRoutines();
    this.props.fetchAllWorkouts();
  }

  handleChange = e => {
    /* utilizing onChange inside <select> to grab Id of the routine being selected so it 
    can be sent as an argument to scheduleWorkout function */
    this.selectedValue = e.target.value;
    console.log(this.selectedValue)
    this.props.routines.map(routine => {
      if (this.selectedValue === routine.title) {
        return (this.selectedId = routine._id);
      }
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
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
    this.selectedDate = selected.start;
    console.log("SELECTED DATE: " + this.selectedDate);
    this.toggle();
  };

  onSelectEvent = selected => {
    this.selectedTitle = selected.title;
    this.checkboxModalToggle();
  };

  scheduleWorkout = () => {
    this.props.scheduleWorkout(this.selectedId, this.selectedDate);
    // this.selectedValue = "";
    this.selectedId = "";
    this.selectedDate = "";
    this.toggle();
    this.setState({});
  };

  events = [];
  selectedValue;
  selectedId;
  selectedDate;
  selectedTitle;
  selectedExercises;
  

  render() {

    console.log(this.props.workouts)

  {  this.events = this.props.workouts.map(workout => ({
      start: new Date(workout.date),
      end: new Date(workout.date),
      title: workout.routine.title || this.selectedValue,
      id: workout._id,
      exercises: workout.routine.exercises
    }))};
    

    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );

    console.log(this.events);
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
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Schedule a Workout!</ModalHeader>
          <ModalBody>
            {/* Drop down for selecting a routine */}
            <div>Select Workout</div>
            <select
              value={this.state.selectedValue}
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
            <Button color="secondary" onClick={this.toggle}>
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
            {this.selectedTitle}
          </ModalHeader>
          <ModalBody>
            <div>
              <input
                onChange={console.log("checked")}
                type="checkbox"
                name="vehicle1"
                value="Bike"
              />
              <br />
              hi
              <input
                onChange={console.log("checked")}
                type="checkbox"
                name="vehicle2"
                value="Car"
              />
              <br />
              hello
              <input
                onChange={console.log("checked")}
                type="checkbox"
                name="vehicle3"
                value="Boat"
              />
              <br />
              bye
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.checkboxModalToggle}>
              Cancel
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
    routines: state.RoutineManager.routines,
    workouts: state.RoutineManager.workouts
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoutines,
    scheduleWorkout,
    fetchAllWorkouts
  }
)(CalendarPage);
