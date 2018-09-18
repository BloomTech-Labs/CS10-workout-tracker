import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";

import NavBar from "./NavBar";

class Billing extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <StripeProvider apiKey="pk_test_cHtCbIjlhDr11p9OdysyIN9P">
          <Elements>
            <CheckoutForm {...this.props} />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
