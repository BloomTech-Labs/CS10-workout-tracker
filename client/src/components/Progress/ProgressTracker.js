import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../less/progressTracker.css";

class ProgressTracker extends Component {
  render() {
    let date = (this.props.progressRecords[0] || {}).date || "";
    let newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let formattedDate = month + "/" + day + "/" + year;

    let weightLost;
    this.props.progressRecords.length <= 1
      ? (weightLost = <div className="error">* calculation requires at least 2 progress reports</div>)
      : (weightLost =
         (((this.props.progressRecords[0] || {}).weight || "") -
          ((this.props.progressRecords[this.props.progressRecords.length - 1] || {}).weight || "")) + " lbs");

    let inchesLost;
    this.props.progressRecords.length <= 1
      ? (inchesLost = <div className="error">* calculation requires at least 2 progress reports</div>)
      : (inchesLost =
         (((this.props.progressRecords[0] || {}).waist || "") -
          ((this.props.progressRecords[this.props.progressRecords.length - 1] || {}).waist || "")) + " inches");
        
    let weightGained = parseInt(weightLost) * -1;
    let inchesGained = parseInt(inchesLost) * -1;

    return (
      <div className="progress-container">
        <div className="progress-box border">
          {/* <div className="number-lost">{parseInt(weightLost) >= 0 ? weightLost : weightGained }</div> */}
          {typeof(weightLost) != 'string' ? <div className="error">* calculation requires at least 2 progress reports</div> : <div className="number-lost">{parseInt(weightLost) >= 0 ? weightLost : weightGained }</div> }  
          {parseInt(weightLost) > 0 ? <div>Weight Lost Since</div> : <div>Weight Gained Since</div> }
          {isNaN(month) ? null : <div>{formattedDate}</div> }
        </div>
        <div className="progress-box">
          {/* <div className="number-lost">{parseInt(inchesLost) >= 0 ? inchesLost : inchesGained }</div> */}
          {typeof(inchesLost) != 'string' ? <div className="error">* calculation requires at least 2 progress reports</div> : <div className="number-lost">{parseInt(inchesLost) >= 0 ? inchesLost : inchesGained }</div> }  
          { parseInt(inchesLost) > 0 ? <div>Inches Lost Since</div> : <div>Inches Gained Since</div> }
          { isNaN(month) ? null : <div>{formattedDate}</div> }
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
