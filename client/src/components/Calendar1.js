import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
// import events from '../events'
// import dates from '../../src/utils/dates'
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";

import { fetchRoutines, scheduleWorkout, fetchAllWorkouts, fetchPerformancesForAllExercisesInARoutine } from "../actions";
import { EventEmitter } from 'events';
import axios from 'axios';

BigCalendar.momentLocalizer(moment);

class Calendar1 extends Component {

    state = {
        modal: false,
        checkboxModal: false, 
        // events: [],
        // selectedValue: "",
        // selectedId: "",
        // selectedDate: ""
    }

    componentDidMount() {
        this.props.fetchRoutines()
        this.props.fetchAllWorkouts()
    }

     handleChange = (e) => {

        this.selectedValue = e.target.value;
        this.props.routines.map((routine, index) => {
            if (routine.title === this.selectedValue) {
            return this.selectedId = routine._id;
            }
        })

           // this.setState({selectedValue: e.target.value}, () => {
        //      this.props.routines.map((routine, index) => {
        //         if (routine.title === this.state.selectedValue) {
        //             return this.setState({ selectedId: routine._id}, () => {console.log(this.state.selectedId)})
                    
        //         }
        //     })
        // })
        
      }


    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    checkboxModalToggle = () => {
    this.setState({
        checkboxModal: !this.state.checkboxModal
    });
    }

    // the selected in the parameter is an object leveraged by big-react-calendar. It represents the date box which you click on on the calendar.
    onSelectSlot = (selected) => {
        
        // this.setState({ selectedDate: selected.start })
        this.selectedDate = selected.start;
        console.log("SELECTED DATE: " + this.selectedDate)
        this.toggle()
    }

    onSelectEvent = (selected) => {
        this.selectedTitle = selected.title;
        this.props.fetchPerformancesForAllExercisesInARoutine([...selected.exercises])
        console.log("SELECTED EXERCISES: " + selected.exercises)
        this.checkboxModalToggle()

    }

    scheduleWorkout = () => {
        this.props.scheduleWorkout(this.selectedId, this.selectedDate)
        // this.setState({ selectedValue: "", selectedId: "", selectedDate: ""})
        this.selectedValue = "";
        this.selectedId = "";
        this.selectedDate = ""
        this.toggle();
        this.setState({})
    }

    events =  [];

    selectedValue;
    selectedId;
    selectedDate;
    selectedTitle;

    selectedExercises;

    
   
    render() {
        console.log("PERFORMANCES " + this.props.performances)

        {this.events = this.props.workouts.map(workout => ({'start': workout.date, 'end': workout.date, title: workout.routine.title, id: workout._id, exercises: workout.routine.exercises}))}        // {this.props.workouts.map(workout => this.events.push({allDay: false, 'start': workout.date, 'end': workout.date, title: workout.routine.title, id: workout._id}))}
        
        // {this.props.workouts.map(workout => this.events.push({allDay: false, 'start': workout.date, 'end': workout.date, title: workout.routine.title, id: workout._id}))}       
        // console.log((this.props.events));
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        
        console.log(this.events)
        return (
            
            <React.Fragment>
                
            <div style={{height: "500px", width: "90%"}}>
            <BigCalendar
                popup
                events={this.events}
                views={allViews}
                step={60}
                showMultiDayTimes
                // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
                onSelectEvent={this.onSelectEvent}
            />
            </div>

            {/* Scheduling Modal */}

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Schedule a Workout!</ModalHeader>
                <ModalBody>
                    {/* Drop down for selecting a routine */}
                    <div>Select Workout</div>
                    <select value={this.state.selectedValue} onChange={this.handleChange} >
                        <option value="select a routine">select a routine</option>
                        {/* {this.props.routines.map(routine =>  <option key={routine._id} value={{title: routine.title, id: routine._id}}>{routine.title}</option>)} */}
                        {this.props.routines.map(routine =>  <option key={routine._id} value={routine.title}>{routine.title}</option>)}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.scheduleWorkout}>Schedule!</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
            {/* Checkbox Modal */}

            <Modal isOpen={this.state.checkboxModal} toggle={this.checkboxModalToggle} className={this.props.className}>
                <ModalHeader toggle={this.checkboxModalToggle}>{this.selectedTitle}</ModalHeader>
                <ModalBody>
                    <div>

                    <input onChange={console.log("checked")} type="checkbox" name="vehicle1" value="Bike"></input><br/>
                    hi
                    <input onChange={console.log("checked")} type="checkbox" name="vehicle2" value="Car"></input><br/>
                    hello
                    <input onChange={console.log("checked")} type="checkbox" name="vehicle3" value="Boat"></input><br/>
                    bye
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.checkboxModalToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    
    console.log(
        "At time of render, Calendar Page received this app state:",
        state
      );
    return {
      routines: state.workouts.routines,
      workouts: state.workouts.workouts,
      performances: state.performance.performances
    //   events: state.workouts.events
    };
  };


  export default connect(
    mapStateToProps,
    {
      fetchRoutines,
      scheduleWorkout, 
      fetchAllWorkouts,
      fetchPerformancesForAllExercisesInARoutine
    }
  )(Calendar1);