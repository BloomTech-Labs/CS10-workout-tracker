import React, { Component } from 'react';

class Progress extends Component {
    state = {
        weight: "",
        hips: "",
        waist: "",
        r_arm: "",
        l_arm: "",
        r_leg: "",
        l_leg: ""
    }

    handleFieldChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    handleSubmit = event => {
    event.preventDefault();
   
        this.props.progress({
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
            <form className="ProgressForm" onSubmit={this.handleSubmit}>
            <input
                type="text"
                name="weight"
                placeholder="Weight"
                value={this.state.weight}
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
                name="waist"
                placeholder="Waist"
                value={this.state.waist}
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
        </div>
        );
    }
}

export default Progress;