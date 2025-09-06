import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions"

class Payments extends Component {
  render() {
    //debugger
    return (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={token => this.props.handleToken(token)}
        amount={500}
        name="Emaily"
        description="$5.00 for 5 credits"
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);