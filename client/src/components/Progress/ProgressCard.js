import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import moment from "moment";
import { deleteProgress } from "../../actions";
import "../../less/progressCard.css";

const ProgressCard = props => {
  return (
    <div className="card-container">
      <Card>
        <CardHeader className="card-header">
          <div className="card-date">
            {moment(props.record.date).format("MM/DD/YYYY")}
          </div>
          <div className="btn-container">
            <div
              className="icon-btn"
              onClick={() => props.deleteProgress(props.record._id)}
            >
              {" "}
              <i className="fas fa-trash-alt icon" />
            </div>
            <div className="icon-btn">
              <i className="fas fa-pencil-alt icon" />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <CardText>{`Weight: ${props.record.weight} lbs`}</CardText>
          <CardText>{`Waist: ${props.record.waist}in`}</CardText>
          <CardText>
            {props.record.hips ? `Hips: ${props.record.hips}in` : "Hips: "}
          </CardText>
          <CardText>
            {props.record.r_arm
              ? `(R) Arm: ${props.record.r_arm}in`
              : "(R) Arm: "}
          </CardText>
          <CardText>
            {props.record.l_arm
              ? `(L) Arm: ${props.record.l_arm}in`
              : "(L) Arm: "}
          </CardText>
          <CardText>
            {props.record.r_leg
              ? `(R) Leg: ${props.record.r_leg}in`
              : "(R) Leg: "}
          </CardText>
          <CardText>
            {props.record.l_leg
              ? `(L) Leg: ${props.record.l_leg}in`
              : "(L) Leg: "}
          </CardText>
        </CardBody>
      </Card>
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
