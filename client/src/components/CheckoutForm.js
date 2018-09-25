import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "reactstrap";
import "../less/billing.css";

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
        <p>Purchase Premium staus for only $8.99</p>
        <CardElement className="cardElement" />
        <Button className="submit-btn" outline size="sm" onClick={this.submit}>
          Process Payment
        </Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
