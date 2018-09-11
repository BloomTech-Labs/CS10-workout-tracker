import React, { Component } from 'react';
import { connect } from 'react-redux';


export default (ComposedComponent) => {
    class RequireAuthentication extends Component {
        
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push("/register");
            }
        }

        render() {
            console.log("Access control is happening")
            return (
                <div>
                    {this.props.authenticated ? <ComposedComponent /> : <div>Not authorized!</div>}
                </div>   
            )

        }
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.auth.authed
        }
    }
    return connect(mapStateToProps)(RequireAuthentication);
}


