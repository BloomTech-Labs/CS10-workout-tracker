import React, { Component } from 'react';

class Billing extends Component {
    render() {
        return (
            <div>
                this is the billing component
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default Billing;