import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../less/progressCounter.less";

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
      <div>
        <div>
          <div>{weightLost}</div>
          <div>Weight Lost since</div>
          <div>{formattedDate}</div>
        </div>
        <div>
          <div>{inchesLost}</div>
          <div>Inches Lost Since</div>
          <span>* around waist</span>
          <div>{formattedDate}</div>
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
