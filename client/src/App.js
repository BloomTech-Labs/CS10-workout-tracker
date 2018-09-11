import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, Link } from 'react-router-dom';
import RegistrationPage from "./components/RegistrationPage";
import AccessControl from "./components/AccessControl";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Schedule from "./components/Schedule";

class App extends Component {
  state = {
    message: "",
    connected: false
  };

  componentDidMount() {
    axios.get("http://localhost:8080").then(res => {
      this.setState({ message: res.data.message, connected: true });
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.connected ? <div>I'm connected</div> : null}
        <Link to="/schedule"><button>Test</button></Link>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/schedule" component={AccessControl(Schedule)} />
        {/* <Route path="/workouts" component={Workouts} />
        <Route path="/progress" component={Progress} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} /> */}
      </div>
    );
  }
}

export default App;
