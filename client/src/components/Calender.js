// import React from "react";
// import Calendar from 'react-big-calendar';
// import moment from 'moment';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext } from 'react-dnd';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";


// // Setup the localizer by providing the moment (or globalize) Object
// // to the correct localizer.

// // moment.locale("en");
// Calendar.setLocalizer(Calendar.momentLocalizer(moment));// or globalizeLocalizer

// const DnDCalendar = withDragAndDrop(Calendar);

// const myEventsList = [
//   {
//     allDay: false,
//     'start': new Date('September 23, 2018 11:13:00'),
//     'end': new Date('September 23, 2018 11:13:00'),
//     title: 'hi',
//   },
//   {
//     allDay: true,
//     end: new Date('September 29, 2018 11:13:00'),
//     start: new Date('September 29, 2018 11:13:00'),
//     title: 'All Day Event',
//     note: "run 10 miles",
//     body: "Arms",
//     performance: {
//       reps: 4,
//       sets: 4,
//       wieght: 50
//     },

//   }



  
// ];


// class Calender extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       events: myEventsList
//     };
//     this.moveEvent = this.moveEvent.bind(this);
//   }

//   // state.event = []
//   // compdidmount populate state.event
//   // handleSubmit = (e) => {
    
//   // }
//   moveEvent({ event, start, end }) {
//     const { events } = this.state;

//     const idx = events.indexOf(event);
//     const updatedEvent = { ...event, start, end };

//     const nextEvents = [...events]
//     nextEvents.splice(idx, 1, updatedEvent)

//     this.setState({
//       events: nextEvents
//     })

//     alert(`${event.title} was dropped onto ${event.start}`);
//   }
  
//   onEventResize = (type, { event, start, end, allDay }) => {
//     this.setState(state => {
//       state.events[0].start = start;
//       state.events[0].end = end;
//       return { events: state.events };
//     });
//   };

  
//   render() {
//     let test = function(e){
//       console.log(e);
//     }
    
//     return (
      

//       <div style={{height: "500px", width: "90%"}}>
        

//         <DnDCalendar
//           onSelectEvent={test}
//           //this is a test
//           // events={myEventsList}
//           // startAccessor='startdate'
//           // endAccessor='enddate'
//           // views={allViews}
//           // step={60}
//           // // popup={true}
//           // selectable={true}
//           // onView={() => {}}
//           // showMultiDayTimes
//           // // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
//           // // defaultDate={new Date()}
//           // formats={formats}
//           // onNavigate={date => this.setState({ date })}
//           onView={() => alert("hello")}
//           selectable
//           onEventDrop={this.moveEvent}
//           showMultiDayTimes={true}
//           resizable
//           defaultDate={new Date()}
//           defaultView="month"
//           events={this.state.events}
//           style={{ height: "100vh" }}
//         />
//       </div>
//     );
//   }
// }

// export default DragDropContext(HTML5Backend)(Calender);

import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import "../less/calendar.css";
// import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import logo from "./logo.svg";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class Calender extends Component {

  constructor() {
    super()
  
    this.state = {
      events: [
        {

          start: new Date(),
          end: new Date(moment().add(1, "minute")),
          title: "testing title"
        }
      ]
    };

    this.moveEvent = this.moveEvent.bind(this);
  }
  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    console.log(event);
    console.log(start, end);

  }


  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DnDCalendar
          selectable
          onEventDrop={this.moveEvent}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          // onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Calender);


