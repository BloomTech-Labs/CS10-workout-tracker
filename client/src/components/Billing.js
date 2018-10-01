import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { connect } from "react-redux";
import { processPayment } from "../actions";
import "../css/main.css";

class Billing extends Component {
  render() {
    return (
      <div className="billing-outer">
        <div className="billing-container">
          <div className="billing-inner">
            {/* Note: The client and server Stripe api keys are two separate keys. This api key is a publishable key which is why I'm comfortable committing it for now, it is also a test key and will also need to be replaced in production */}
            <StripeProvider apiKey="pk_test_cHtCbIjlhDr11p9OdysyIN9P">
              <Elements>
                <CheckoutForm
                  id={this.props.userInfo.user._id}
                  // !! Experimental patch !!
                  premiumUser={
                    this.props.premiumUser ||
                    this.props.userInfo.user.premiumUser
                  }
                  processPayment={this.props.processPayment}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
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
    premiumUser: state.user.premiumUser,
    msg: state.user.message
  };
};

export default connect(
  mapStateToProps,
  { processPayment }
)(Billing);
