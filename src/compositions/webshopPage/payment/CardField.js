//
// Uses Stripe.js card validation to check the card number
// passed in props.
var CardField = React.createClass({
  handleChange: function (event) {
    this.props.onChange(event);
  },
  render: function () {
    var valid = Stripe.card.validateCardNumber(this.props.value);

    return <div className={valid ? "ok" : "err"}>
      <label for="cardNumber">Card Number</label>
      <input type="text" onChange={this.handleChange} value={this.props.value} id="cardNumber"/>
    </div>
  },
});
