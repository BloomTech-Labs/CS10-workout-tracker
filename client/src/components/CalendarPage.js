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
  fetchAllPerformanceDocs,
  copyWorkouts
} from "../actions";
import "../less/calendarPage.css";

BigCalendar.momentLocalizer(moment);

class CalendarPage extends Component {
  state = {
    schedulingModal: false,
    checkboxModal: false,
    weight: "",
    sets: "",
    reps: "",
    usageMode: "NEW_WORKOUT", // or COPY_WORKOUTS
    copyFromStartDate: "",
    copyFromEndDate: "",
    copyToStartDate: "",
    focusedPerformances: []
  };

  componentDidMount() {
    this.props.fetchRoutines();
    this.props.fetchAllWorkouts();
  }

  handlePerformanceChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    if (this.state.usageMode === "NEW_WORKOUT") {
      this.selectedSlotDate = selected.start;
      this.schedulingModalToggle();
    } else {
    }
  };

  onSelectEvent = selected => {
    this.selectedEventTitle = selected.title;
    this.selectedEventId = selected.id;
    let focusedWorkout = this.props.workouts.filter(workout => workout._id === selected.id)[0]
    this.setState({focusedPerformances: focusedWorkout.performances}, this.checkboxModalToggle())
    console.log(selected)
  };

  handleDateChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
  };

  handleSubmitCopyWorkouts = () => {
    const { copyFromStartDate, copyFromEndDate, copyToStartDate } = this.state;
    this.props.copyWorkouts(
      copyFromStartDate,
      copyFromEndDate,
      copyToStartDate
    );
    this.setState({
      copyFromStartDate: "",
      copyFromEndDate: "",
      copyToStartDate: ""
    });
  };

  deleteWorkout = () => {
    this.props.deleteWorkout(this.selectedEventId);
    this.checkboxModalToggle();
  };

  // this updates the toggled boolean of the specified performance doc in the DB
  handlePerformanceCheckOff = performanceId => {
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

      let performances = this.state.focusedPerformances;
    performances.forEach(performance => {
      if (performance._id === performanceId) {
        performance.completed = !performance.completed;
      }
    });
    this.setState({ focusedPerformances: performances });
  };


  events = [];
  selectedRoutineValue;
  selectedRoutineId;
  selectedSlotDate;
  selectedEventTitle;
  // selectedExercises;
  // selectedEventId;
  

  render() {
    console.log(this.props.workouts);

    // the events array is required by react-big-calendar
    this.events = this.props.workouts.map(workout => ({
      start: new Date(workout.date),
      end: new Date(workout.date),

      /* if the user tries to copy a workout which contains a deleted routine, 
      then "deleted routine" will be displayed as the event title */
      title: workout.routineName ? (
        workout.routineName
      ) : (
        <i class="fas fa-minus-circle" />
      ),
      id: workout._id
    }));

    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );

    return (
      <div className="calendarAndForm-container">
        <div className="calendar-container">
          <BigCalendar
            popup
            events={this.events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            defaultView="month"
            selectable={true}
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
          />
        </div>
        <div className="formAndButton-container">
          <div className="button-container">
            <Button
              className="newWorkout-btn"
              style={{
                backgroundImage:
                  this.state.usageMode === "NEW_WORKOUT"
                    ? "radial-gradient(#cc0000, black)"
                    : "radial-gradient(#666666, black)"
              }}
              onClick={() => {
                this.setState({ usageMode: "NEW_WORKOUT" });
              }}
            >
              New Workout
            </Button>
            <Button
              className="copyWorkouts-btn"
              style={{
                backgroundImage:
                  this.state.usageMode === "COPY_WORKOUTS"
                    ? "radial-gradient(#cc0000, black)"
                    : "radial-gradient(#666666, black)"
              }}
              onClick={() => {
                this.setState({ usageMode: "COPY_WORKOUTS" });
              }}
            >
              Copy Workouts
            </Button>
          </div>
          {this.state.usageMode === "COPY_WORKOUTS" && (
            <form className="form-container">
              <div>
                <label>Copy from start date</label>
                <input
                  type="date"
                  name="copyFromStartDate"
                  value={this.state.copyFromStartDate}
                  onChange={this.handleDateChange}
                />
              </div>
              <div>
                <label>Copy from end date</label>
                <input
                  type="date"
                  name="copyFromEndDate"
                  value={this.state.copyFromEndDate}
                  onChange={this.handleDateChange}
                />
              </div>
              <div>
                <label>Copy to date</label>
                <input
                  type="date"
                  name="copyToStartDate"
                  value={this.state.copyToStartDate}
                  onChange={this.handleDateChange}
                />
              </div>
              <Button
                className="submit-btn"
                onClick={this.handleSubmitCopyWorkouts}
              >
                Submit
              </Button>
              <div className="icon-explanation">
                * <i class="fas fa-minus-circle" /> on the calendar denotes
                workouts that contain deleted routines and hence can not be
                copied.
              </div>
            </form>
          )}
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
          <ModalBody className="scheduling-modal-body">
            {/* Drop down for selecting a routine */}
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
            <Button className="schedule-btn" onClick={this.scheduleWorkout}>
              Schedule!
            </Button>{" "}
            <Button className="cancel-btn" onClick={this.schedulingModalToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Checkoff Performance Modal */}

        <Modal
          isOpen={this.state.checkboxModal}
          toggle={this.checkboxModalToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.checkboxModalToggle}>
            {this.selectedEventTitle}
          </ModalHeader>
          <ModalBody className="checkoff-modal-body">
            {this.props.workouts.map(
              workout =>
                workout._id === this.selectedEventId ? (
                  <div key={workout._id}>
                    {workout.performances.map(performance => (
                      <div key={performance._id} className="performance-block">
                      <div>
                      
                        <input
                          className="checkoff-input"
                          type="checkbox"
                          key={performance._id}
                          onChange={() => {
                            this.handlePerformanceCheckOff(performance._id);
                          }}
                          checked={
                            this.state.focusedPerformances.filter(focusedPerformance => focusedPerformance._id === performance._id)[0].completed
                          }
                        />
                        
                        <div className="checkoff-exercise">{performance.exerciseName}</div>
                      </div>
                      <div className="checkoff-performance">
                       <span>weight :<input onChange={this.handlePerformanceChange} type="number" name="weight" value={this.state.weight} placeholder={performance.weight}></input></span>
                       <span>sets :<input onChange={this.handlePerformanceChange} type="number" name="sets" value={this.state.sets} placeholder={performance.sets}></input></span>
                       <span>reps :<input onChange={this.handlePerformanceChange} type="number" name="reps" value={this.state.reps} placeholder={performance.reps}></input></span>
                     </div>
                      </div>
                    ))}
                  </div>
                ) : null
            )}
          </ModalBody>

          <ModalFooter>
            <Button className="delete-workout-btn" onClick={this.deleteWorkout}>
              Delete Workout
            </Button>
            <Button className="cancel-btn" onClick={this.checkboxModalToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
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
    workouts: state.calendar.workouts,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoutines,
    scheduleWorkout,
    fetchAllWorkouts,
    deleteWorkout,
    copyWorkouts
  }
)(CalendarPage);

// <ModalBody className="checkoff-modal-body">
//             {checkoff.map(
//               checkoffObj =>
//                 checkoffObj.workoutId === this.selectedEventId ? (
//                   <div key={checkoffObj.performanceId}>
//                     <div>
//                       <div>
//                         <input
//                           className="checkoff-input"
//                           type="checkbox"
//                           key={checkoffObj.performanceId}
//                           value={checkoffObj.performanceId}
//                           onClick={this.handleIndividualCheckbox}
//                           onChange={() => {
//                             this.handleCheckOffInDB(checkoffObj.performanceId);
//                           }}
//                           checked={
//                             this.state.performances.filter(
//                               performance =>
//                                 performance._id === checkoffObj.performanceId
//                             )[0].completed
//                           }
//                         />
//                       </div>
//                       <div className="checkoff-exercise">
//                         {checkoffObj.exerciseName}
//                       </div>
//                     </div>
//                     <div className="checkoff-performance">
//                       <span>weight :<input onChange={this.handlePerformanceChange} type="number" name="weight" value={this.state.weight} placeholder={checkoffObj.weight}></input></span>
//                       <span>sets :<input onChange={this.handlePerformanceChange} type="number" name="sets" value={this.state.sets} placeholder={checkoffObj.sets}></input></span>
//                       <span>reps :<input onChange={this.handlePerformanceChange} type="number" name="reps" value={this.state.reps} placeholder={checkoffObj.reps}></input></span>
//                     </div>
//                   </div>
//                 ) : null
//             )}
//           </ModalBody>
