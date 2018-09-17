import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../less/progressCounter.css";

class ProgressCounter extends Component {
  render() {
    let date = (this.props.progressRecords[0] || {}).date || "";
    let newDate = new Date(date);
    let month = newDate.getMonth();
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let formattedDate = month + "/" + day + "/" + year;

    let weightLost;
    this.props.progressRecords.length <= 1
      ? (weightLost = "* calculation requires at least 2 progress reports")
      : (weightLost =
         (((this.props.progressRecords[0] || {}).weight || "") -
          ((this.props.progressRecords[this.props.progressRecords.length - 1] || {}).weight || "")) + " lbs");

    let inchesLost;
    this.props.progressRecords.length <= 1
      ? (inchesLost = "* calculation requires at least 2 progress reports")
      : (inchesLost =
         (((this.props.progressRecords[0] || {}).waist || "") -
          ((this.props.progressRecords[this.props.progressRecords.length - 1] || {}).waist || "")) + " inches");

    return (
      <div className="progress-container">
        <div className="progress-box border">
          <div className="number-lost">{weightLost}</div>
          <div>Weight Lost Since</div>
          <div>{formattedDate}</div>
        </div>
        <div className="progress-box">
          <div className="number-lost">{inchesLost}</div>
          <div>Inches Lost Since</div>
          <div>{formattedDate}</div>
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

ProgressCounter.propTypes = {
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ProgressCounter);
