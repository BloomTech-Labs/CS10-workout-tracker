import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardBody, CardText, CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import { deleteProgress, updateProgress } from "../../actions";
import "../../less/progressCard.css";



class ProgressCard extends Component {

  state = {
    weight: this.props.record.weight || "",
    hips: this.props.record.hips || "",
    waist: this.props.record.waist || "",
    r_arm: this.props.record.r_arm || "",
    l_arm: this.props.record.l_arm || "",
    r_leg: this.props.record.r_leg || "",
    l_leg: this.props.record.l_leg || "",
    error: false,
    modal: false
  }

  toggle = () => {
    this.setState({
      error: false,
      modal: !this.state.modal
    });
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    let { weight, hips, waist, r_arm, l_arm, r_leg, l_leg } = this.state;

    if (weight !== "" || waist !== "") {
      this.props.updateProgress(this.props.record._id, {
        weight,
        hips,
        waist,
        r_arm,
        l_arm,
        r_leg,
        l_leg
      });

      this.setState({
        error: false,
        modal: !this.state.modal
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="card-container">
        <Card>
          <CardHeader className="card-header">
            <div className="card-date">
              {moment(this.props.record.date).format("MM/DD/YYYY")}
            </div>
            <div className="btn-container">
              <div
                className="icon-btn"
                onClick={() => this.props.deleteProgress(this.props.record._id)}
              >
                {" "}
                <i className="fas fa-trash-alt icon" />
              </div>
              <div className="icon-btn" onClick={this.toggle}>
                <i className="fas fa-pencil-alt icon" />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <CardText>{`Weight: ${this.props.record.weight} lbs`}</CardText>
            <CardText>{`Waist: ${this.props.record.waist}in`}</CardText>
            <CardText>
              {this.props.record.hips ? `Hips: ${this.props.record.hips}in` : "Hips: "}
            </CardText>
            <CardText>
              {this.props.record.r_arm
                ? `(R) Arm: ${this.props.record.r_arm}in`
                : "(R) Arm: "}
            </CardText>
            <CardText>
              {this.props.record.l_arm
                ? `(L) Arm: ${this.props.record.l_arm}in`
                : "(L) Arm: "}
            </CardText>
            <CardText>
              {this.props.record.r_leg
                ? `(R) Leg: ${this.props.record.r_leg}in`
                : "(R) Leg: "}
            </CardText>
            <CardText>
              {this.props.record.l_leg
                ? `(L) Leg: ${this.props.record.l_leg}in`
                : "(L) Leg: "}
            </CardText>
          </CardBody>
        </Card>

         <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Progress</ModalHeader>
          {this.state.error && (
                <div className="error">
                  * Weight and waist are required fields.
                </div>
              )}
          <ModalBody>
            <form className="progressForm">
              Weight:
              <input
                type="text"
                name="weight"
                value={this.state.weight}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.weight}
              />
              Waist:
              <input
                type="text"
                name="waist"
                value={this.state.waist}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.waist}
              />
              Hips:
              <input
                type="text"
                name="hips"
                value={this.state.hips}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.hips}
              />
              (R) Arm:
              <input
                type="text"
                name="r_arm"
                value={this.state.r_arm}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.r_arm}
              />
              (L) Arm:
              <input
                type="text"
                name="l_arm"
                value={this.state.l_arm}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.l_arm}
              />
              (R) Leg:
              <input
                type="text"
                name="r_leg"
                value={this.state.r_leg}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.r_leg}
              />
              (L) Leg:
              <input
                type="text"
                name="l_leg"
                value={this.state.l_leg}
                onChange={this.handleFieldChange}
                // placeholder={this.props.record.l_leg}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Update
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
};

ProgressCard.propTypes = {
  record: PropTypes.object,
  deleteProgress: PropTypes.func,
  updateProgress: PropTypes.func
};

export default connect(
  null,
  { deleteProgress, updateProgress }
)(ProgressCard);
