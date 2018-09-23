import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
// import events from '../events'
// import dates from '../../src/utils/dates'
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";

import { fetchRoutines, scheduleWorkout, fetchAllWorkouts } from "../actions";

BigCalendar.momentLocalizer(moment);

class Calendar1 extends Component {

    state = {
        modal: false,
        // selectedValue: {
        //     title: "",
        //     id: ""
        // },
        events: [],
        selectedValue: "",
        selectedId: "",
        selectedDate: ""
    }

    componentDidMount() {
        this.props.fetchRoutines()
        this.props.fetchAllWorkouts()
    }

     handleChange = (e) => {
        // this.setState({selectedValue: {title: e.target.value, id: e.target.value._id}});
        // console.log(e.target.value.title)
        // console.log(typeof(e.target.value))
        // let indexOfSelectedValue;

        this.setState({selectedValue: e.target.value}, () => {
             this.props.routines.map((routine, index) => {
                if (routine.title === this.state.selectedValue) {
                    return this.setState({ selectedId: routine._id}, () => {console.log(this.state.selectedId)})
                    
                }
            })
        })

        // console.log(this.state.selectedValue)
        
        // let id = this.props.routines[indexOfSelectedValue]._id

        // this.setState({ selectedId: id })

        // console.log(indexOfSelectedValue)

        // console.log(this.state.selectedValue)


    //   let id =  this.findWithAttr(this.props.routines, "title", this.state.selectedValue)

    //     console.log(id)

    //     console.log(this.props.routines)
        
      }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    onSelectSlot = (selected) => {
        
        this.setState({ selectedDate: selected.start })
        console.log("SELECTED DATE: " + this.state.selectedDate)
        this.toggle()
    }

    scheduleWorkout = () => {
        this.props.scheduleWorkout(this.state.selectedId, this.state.selectedDate)
        this.setState({ selectedValue: "", selectedId: "", selectedDate: ""})
        this.toggle();
    }

    render() {
        {this.props.workouts.map(workout => this.state.events.push({allDay: false, 'start': workout.date, 'end': workout.date, title: workout.routine.title}))}
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

        console.log(this.events)
        return (
            <React.Fragment>
            <BigCalendar
                events={this.state.events}
                views={allViews}
                step={60}
                showMultiDayTimes={true}
                // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: "100vh" }}
                selectable={true}
                onSelectSlot={this.onSelectSlot}
            />

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Schedule a Workout!</ModalHeader>
                <ModalBody>
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

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    console.log(
        "At time of render, Billing Page received this app state:",
        state
      );
    return {
      routines: state.workouts.routines,
      workouts: state.workouts.workouts
    };
  };


  export default connect(
    mapStateToProps,
    {
      fetchRoutines,
      scheduleWorkout, 
      fetchAllWorkouts
    }
  )(Calendar1);