import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const token = localStorage.getItem("token");
const requestOptions = { headers: { "x-access-token": token } };

class CheckoutForm extends Component {
  submit(event) {
    event.preventDefault();
    this.props.stripe
      .createToken({ name: "Jenny Rosen" })
      .then(({ stripeToken }) => {
        console.log("Token: ", token);
        axios
          .post(`http://localhost:8080/charge`, stripeToken, requestOptions)
          .then(res => {
            window.alert("Thank you for your payment!");
          });
      });
  }

  render() {
    return (
      <form className="checkout" onSubmit={this.submit}>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
