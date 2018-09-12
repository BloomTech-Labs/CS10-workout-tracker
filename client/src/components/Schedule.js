import React, { Component } from 'react';

class Schedule extends Component {
    render() {
        return (
            <div>
                this is the schedule component
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Schedule;