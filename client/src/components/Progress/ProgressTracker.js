import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import "../../less/progressTracker.css";

class ProgressTracker extends Component {
  render() {
    // || operator is used to short circuit the absence of props upon render
    let firstProgress = this.props.progressRecords[0] || {};
    let mostRecentProgress =
      this.props.progressRecords[this.props.progressRecords.length - 1] || {};

    let firstProgressDate = firstProgress.date;
    let formattedDate = moment(firstProgressDate).format("MM/DD/YYYY");

    let startingWeight = firstProgress.weight;
    let mostRecentWeight = mostRecentProgress.weight;
    let weightLost = startingWeight - mostRecentWeight + " lbs";
    let weightGained = parseInt(weightLost, 10) * -1 + " lbs";

    let startingInches = firstProgress.waist;
    let mostRecentInches = mostRecentProgress.waist;
    let inchesLost = startingInches - mostRecentInches + " inches";
    let inchesGained = parseInt(inchesLost, 10) * -1 + " inches";

    return (
      <div className="progress-tracker">
        {this.props.progressRecords.length <= 1 ? (
          <div>
            <div className="progress-tracker-title">Progress Tracker</div>
            <div className="tracker-requirement">
              * Submit at least 2 progresses to calculate weight lost/gained and
              inches lost/gained.
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="progress-box border">
              <div className="number-lost">
                {parseInt(weightLost, 10) >= 0 ? weightLost : weightGained}
              </div>
              {parseInt(weightLost, 10) >= 0 ? (
                <div>Weight Lost Since</div>
              ) : (
                <div>Weight Gained Since</div>
              )}
              <div>{formattedDate}</div>
            </div>
            <div className="progress-box">
              <div className="number-lost">
                {parseInt(inchesLost, 10) >= 0 ? inchesLost : inchesGained}
              </div>
              {parseInt(inchesLost, 10) >= 0 ? (
                <div>Inches Lost Since</div>
              ) : (
                <div>Inches Gained Since</div>
              )}
              <div>{formattedDate}</div>
              <div className="disclaimer">* around waist</div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    progressRecords: state.progress.progressRecords
  };
};

ProgressTracker.propTypes = {
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ProgressTracker);
