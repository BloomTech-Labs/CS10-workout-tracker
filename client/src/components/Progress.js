import React, { Component } from 'react';

class Progress extends Component {
    render() {
        return (
            <div>
                this is the progress component
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Progress;