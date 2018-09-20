import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
  }

  submit = async ev => {
    let { token } = await this.props.stripe.createToken();
    if (token) {
      this.props.processPayment({
        token: token.id,
        id: this.props.id
      });

      this.setState({
        complete: true
      });
    } else {
      return;
    }
  };

  render() {
    if (this.props.premiumUser === true)
      return <h2>Already a premium user.</h2>;
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

export default injectStripe(CheckoutForm);
