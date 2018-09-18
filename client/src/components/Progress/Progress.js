import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchProgress } from "../../actions";
import NavBar from "../NavBar";
import ProgressTracker from "./ProgressTracker";
import ProgressCard from "./ProgressCard";
import ProgressForm from "./ProgressForm";
import "../../less/progress.css";

class Progress extends Component {
  componentDidMount() {
    this.props.fetchProgress();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="progress-container">
            <div className="progress-data">
              <ProgressTracker />
              <ProgressForm />
              <div className="progress-records">
                {this.props.progressRecords.map(record => {
                  return <ProgressCard key={record._id} record={record} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    progressRecords: state.progress.progressRecords
  };
};

Progress.propTypes = {
  fetchProgress: PropTypes.func,
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  mapStateToProps,
  { fetchProgress }
)(Progress);
