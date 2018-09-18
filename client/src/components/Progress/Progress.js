import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { addProgress, fetchProgress, deleteProgress } from "../../actions";
import NavBar from "../NavBar";
import ProgressTracker from "./ProgressTracker";
import "../../less/progress.css";

class Progress extends Component {
  state = {
    weight: "",
    hips: "",
    waist: "",
    r_arm: "",
    l_arm: "",
    r_leg: "",
    l_leg: ""
  };

  componentDidMount() {
    this.props.fetchProgress();
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.addProgress({
      weight: this.state.weight,
      hips: this.state.hips,
      waist: this.state.waist,
      r_arm: this.state.r_arm,
      l_arm: this.state.l_arm,
      r_leg: this.state.r_leg,
      l_leg: this.state.l_leg
    });

    this.setState({
      weight: "",
      hips: "",
      waist: "",
      r_arm: "",
      l_arm: "",
      r_leg: "",
      l_leg: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="progress-container">
            <form className="ProgressForm" onSubmit={this.handleSubmit}>
              <div>{moment().format("MM/DD/YYYY")}</div>
              <input
                type="text"
                name="weight"
                placeholder="Weight"
                value={this.state.weight}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="waist"
                placeholder="Waist"
                value={this.state.waist}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="hips"
                placeholder="Hips"
                value={this.state.hips}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="r_arm"
                placeholder="(R) Arm"
                value={this.state.r_arm}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="l_arm"
                placeholder="(L) Arm"
                value={this.state.l_arm}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="r_leg"
                placeholder="(R) Leg"
                value={this.state.r_leg}
                onChange={this.handleFieldChange}
              />
              <input
                type="text"
                name="l_leg"
                placeholder="(L) Leg"
                value={this.state.l_leg}
                onChange={this.handleFieldChange}
              />
              <button className="Form__submit" type="submit">
                Submit
              </button>
            </form>
            <div className="progress-data">
              <ProgressTracker />

              <div className="progress-records">
                {this.props.progressRecords.map(record => {
                  return (
                    <div key={record._id} className="progress-record">
                      <button
                        onClick={() => this.props.deleteProgress(record._id)}
                      >
                        delete
                      </button>
                      <span>{`Weight: ${record.weight} lbs`}</span>
                      <span>{`Waist: ${record.waist}in`}</span>
                      <span>{`Hips: ${record.hips}in`}</span>
                      <span>{`(R) Arm: ${record.r_arm}in`}</span>
                      <span>{`(L) Arm: ${record.l_arm}in`}</span>
                      <span>{`(R) Leg: ${record.r_leg}in`}</span>
                      <span>{`(L) Leg: ${record.l_leg}in`}</span>
                    </div>
                  );
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
  addProgress: PropTypes.func,
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  mapStateToProps,
  { addProgress, fetchProgress, deleteProgress }
)(Progress);
