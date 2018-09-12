import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReduxThunk from "redux-thunk";

import RegistrationPage from "./components/RegistrationPage";
import AccessControl from "./components/AccessControl";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Schedule from "./components/Schedule";
import Workouts from "./components/Workouts";
import Progress from "./components/Progress";
import Billing from "./components/Billing";
import Settings from "./components/Settings";

import combinedReducer from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(combinedReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/schedule" component={AccessControl(Schedule)} />
        <Route path="/workouts" component={AccessControl(Workouts)} />
        <Route path="/progress" component={AccessControl(Progress)} />
        <Route path="/billing" component={AccessControl(Billing)} />
        <Route path="/settings" component={AccessControl(Settings)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
