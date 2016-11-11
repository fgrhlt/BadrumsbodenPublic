//
// Uses Stripe.js validation to check the CVC value
// passed in props.
var CVCField = React.createClass({
  handleChange: function (event) {
    this.props.onChange(event);
  },
  render: function () {
    var valid = Stripe.card.validateCVC(this.props.value);

    return <div className={valid ? "ok" : "err"}>
      <label for="cvc">CVC</label>
      <input type="text" id="cvc" onChange={this.handleChange} value={this.props.value} />
    </div>;
  },
});
