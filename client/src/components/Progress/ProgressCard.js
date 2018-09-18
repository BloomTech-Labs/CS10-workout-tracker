import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProgress } from "../../actions";
import "../../less/progressCard.css";

const ProgressCard = props => {
  return (
    <div className="progress-record">
      <button onClick={() => props.deleteProgress(props.record._id)}>
        delete
      </button>
      <div>{`Weight: ${props.record.weight} lbs`}</div>
      <div>{`Waist: ${props.record.waist}in`}</div>
      <div>{`Hips: ${props.record.hips}in`}</div>
      <div>{`(R) Arm: ${props.record.r_arm}in`}</div>
      <div>{`(L) Arm: ${props.record.l_arm}in`}</div>
      <div>{`(R) Leg: ${props.record.r_leg}in`}</div>
      <div>{`(L) Leg: ${props.record.l_leg}in`}</div>
    </div>
  );
};

ProgressCard.propTypes = {
    record: PropTypes.object,
    deleteProgress: PropTypes.func
  };
  
  export default connect(
    null,
    { deleteProgress }
  )(ProgressCard);
