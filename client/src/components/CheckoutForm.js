import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      ccStatus: true,
      transactionStatus: true
    };
  }

  submit = async ev => {
    let { token } = await this.props.stripe.createToken();
    if (token) {
      axios
        .post("http://localhost:8080/charge", {
          token: token.id,
          id: this.props.id
        })
        .then(() => {
          this.setState({
            complete: true,
            transactionStatus: true,
            ccStatus: true
          });
        })
        .catch(() => {
          this.setState({ transactionStatus: false });
        });
    } else {
      this.setState({ ccStatus: false });
    }
  };

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

export default injectStripe(CheckoutForm);
