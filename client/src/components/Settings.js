import React, { Component } from 'react';

class Settings extends Component {
    render() {
        return (
            <div>
                this is the settings component
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Settings;