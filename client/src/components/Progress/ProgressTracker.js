import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../less/progressTracker.css";

class ProgressTracker extends Component {
  render() {
    // || operator is used to short circuit the absence of props upon render
    let firstProgress = (this.props.progressRecords[0] || {});
    let mostRecentProgress = (this.props.progressRecords[this.props.progressRecords.length - 1] || {})

    let firstProgressDate = firstProgress.date;
    let newDate = new Date(firstProgressDate);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let formattedDate = month + "/" + day + "/" + year;

    let startingWeight =  firstProgress.weight;
    let mostRecentWeight = mostRecentProgress.weight;
    let startingInches = firstProgress.waist;
    let mostRecentInches = mostRecentProgress.waist;
    let weightLost;
    let inchesLost;

    let error = "* calculation requires at least 2 progress submissions."

    // If the user only has 1 or 0 progress submissions, then calculation will not take place
    this.props.progressRecords.length <= 1 ? 
      weightLost = <div className="error">{error}</div> : 
      // Otherwise
      weightLost = startingWeight - mostRecentWeight + " lbs";

    // same logic as above but for inches
    this.props.progressRecords.length <= 1 ? 
      inchesLost = <div className="error">{error}</div> : 
      inchesLost = startingInches - mostRecentInches + " inches";

    /* If weightLost or inchesLost are negative numbers, 
    then they will be converted to positives and displayed as gains*/
    let weightGained = parseInt(weightLost, 10) * -1;
    let inchesGained = parseInt(inchesLost, 10) * -1;

    return (
      <div className="progress-container">

        <div className="progress-box border">
          {/*if there is only 1 progress in the database, 
          weightLost becomes the error text and parseInt() returns NaN error. 
          To avoid that, check if type of weightLost is not a string or in other words is NaN. 
          If yes, then display error. This line can not be isNaN(weightLost) 
          because weightLost is always a string and never a number unless forced*/}
          {typeof weightLost !== "string" ? 
            <div className="error">{error}</div> : 
            <div className="number-lost">{parseInt(weightLost, 10) >= 0 ? weightLost : weightGained}</div>
          }

          {parseInt(weightLost, 10) >= 0 ? <div>Weight Lost Since</div> : <div>Weight Gained Since</div>}

          {/* if user deletes all progresses, then the date becomes month/date/year -> NaN/NaN/NaN */}
          <div>{isNaN(month) ? null : formattedDate}</div>
        </div>

        <div className="progress-box">
          {/*same logic as above but for inches*/}
          {typeof inchesLost !== "string" ? 
            <div className="error">{error}</div> : 
            <div className="number-lost">{parseInt(inchesLost, 10) >= 0 ? inchesLost : inchesGained}</div>
          }

          {parseInt(inchesLost, 10) >= 0 ? <div>Inches Lost Since</div> : <div>Inches Gained Since</div>}

          <div>{isNaN(month) ? null : formattedDate}</div>
          <span className="disclaimer">* around waist</span>
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

ProgressTracker.propTypes = {
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ProgressTracker);
