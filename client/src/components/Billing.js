import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { connect } from "react-redux";

import NavBar from "./NavBar";

class Billing extends Component {
  render() {
    console.log(this.props.userInfo.user._id);
    return (
      <div>
        <NavBar />
        {/* Note: The client and server Stripe api keys are two separate keys. This api key is a publishable key which is why I'm comfortable committing it for now, it is also a test key and will also need to be replaced in production */}
        <StripeProvider apiKey="pk_test_cHtCbIjlhDr11p9OdysyIN9P">
          <Elements>
            <CheckoutForm
              id={this.props.userInfo.user._id}
              premiumUser={this.props.userInfo.user.premiumUser}
            />
          </Elements>
        </StripeProvider>
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
    msg: state.user.message
  };
};

export default connect(
  mapStateToProps,
  null
)(Billing);
