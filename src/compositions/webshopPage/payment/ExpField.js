
//
// Uses Stripe.js validation to check the card expiration
// passed in props.
var ExpField = React.createClass({
  handleChange: function (event) {
    this.props.onChange(event);
  },
  render: function () {
    var valid = Stripe.card.validateExpiry(this.props.month, this.props.year);

    return <div className={valid ? "ok" : "err"}>
      <div>
        <label for="expMonth">Expiry Month</label>
        <input type="text" value={this.props.month} onChange={this.handleChange} id="exp_month" />
      </div>
      <div>
        <label for="expYear">Expiry Year</label>
        <input type="text" value={this.props.year} onChange={this.handleChange} id="exp_year" />
      </div>
    </div>
  },
});
