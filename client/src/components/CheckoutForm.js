import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { processPayment } from "../actions";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  handleSubmit(event) {
    event.preventDefault();
    let { stripeToken } = this.props.stripe.createToken({ name: "Name" });
    let response = processPayment(stripeToken.id);
    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "At time of render, Billing Page received this app state:",
    state
  );
  return {
    userInfo: state.auth.currentUser,
    msg: state.auth.message
  };
};

export default connect(
  mapStateToProps,
  { processPayment }
)(injectStripe(CheckoutForm));
