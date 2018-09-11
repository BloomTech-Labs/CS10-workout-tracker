import React, { Component } from 'react';

class Workouts extends Component {
    render() {
        return (
            <div>
                this is the workouts component
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Workouts;