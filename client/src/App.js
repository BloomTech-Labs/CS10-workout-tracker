import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Route } from 'react-router-dom';
import RegistrationPage from "./components/RegistrationPage";
class App extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    axios.get("http://localhost:8080/").then(res => {
      this.setState({ message: res.data.message });
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>{this.state.message}</p>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route path="/register" component={RegistrationPage} />
        {/* <Route path="/login" component={} /> */}
      </div>
    );
  }
}

export default App;
