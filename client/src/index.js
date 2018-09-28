import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReduxThunk from "redux-thunk";
import RegistrationPage from "./components/RegistrationPage";
import AccessControl from "./components/AccessControl";
import LoginPage from "./components/LoginPage";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import LandingPage from "./components/Landing/LandingPage";
import Schedule from "./components/Schedule";
import RoutineManager from "./components/Routine-Manager/Container";
import MainWorkout from "./components/Workout/MainWorkout";
import Progress from "./components/Progress/Progress";
import Billing from "./components/Billing";
import Settings from "./components/Settings";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import combinedReducer from "./reducers";


// const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

// ============= Xang Added this for dev to see the redux store  =====

const createStoreWithMiddleware = compose(
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore);
/// ==========================================

const store = createStoreWithMiddleware(combinedReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="main__page">
        <Nav />
        <div className="push__nav"></div>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        
        <div className="main__side__content">
          
            <SideBar/>  
          <div className="main__container">
            <Route path="/register" exact component={RegistrationPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/forgot" exact component={ForgotPassword} />
            <Route path="/reset" exact component={PasswordReset} />
            <Route path="/schedule" exact component={AccessControl(Schedule)} />
            {/* <Route path="/workouts" exact component={AccessControl(RoutineManager)} /> */}
            <Route path="/workouts" exact component={AccessControl(MainWorkout)} />
            <Route path="/progress" exact component={AccessControl(Progress)} />
            <Route path="/billing" exact component={AccessControl(Billing)} />
            <Route path="/settings" exact component={AccessControl(Settings)} />
          </div>
        </div>
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
