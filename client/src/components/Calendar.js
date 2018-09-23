import React from "react";

import BigCalendar from 'react-big-calendar';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

moment.locale("en");
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
  {
    allDay: false,
    'start': new Date('September 23, 2018 11:13:00'),
    'end': new Date('September 23, 2018 11:13:00'),
    title: 'hi',
  },
  {
    allDay: true,
    end: new Date('September 29, 2018 11:13:00'),
    start: new Date('September 29, 2018 11:13:00'),
    title: 'All Day Event',
  },
]


class Calendar extends React.Component {

  constructor() {
    super();
    this.state = {
      events: myEventsList
    }
  
  }
  
  render() {
    let test = function(){
      alert("selected")
    }
    
    return (
      <div style={{height: "500px", width: "90%"}}>
        <BigCalendar
          onSelectEvent={test}
          // events={myEventsList}
          // startAccessor='start'
          // endAccessor='end'
          // views={allViews}
          // step={60}
          // // popup={true}
          selectable={true}
          // onView={() => {}}
          // showMultiDayTimes
          // // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          // // defaultDate={new Date()}
          // formats={formats}
          // onNavigate={date => this.setState({ date })}
          selectable
          showMultiDayTimes={true}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default Calendar;


