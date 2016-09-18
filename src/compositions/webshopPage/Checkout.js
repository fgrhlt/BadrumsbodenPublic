/* global StripeCheckout */

//
// Simple integration with Stripe's Checkout
//
var PaymentButton = React.createClass({
	handleChange: function (event) {
    this.props.onChange(event);
  },
  openCheckout: function (event) {
    this.props.handler.open({
    	name: this.props.name,
      amount: this.props.amount,
      description: this.props.description,
    });
  	event.preventDefault();
	},
	render: function () {
  	var format = function (amount) {
    	return "$" + (amount / 100).toFixed(2);
		};
    var _this = this;

		// Important: uses "ref" below to attach the click handler to
    // the native DOM element. Some browsers, particularly Chrome iOS
    // will not allow the Checkout popup to trigger from the synthetic
    // click event React provides.
		return
(		<div>
    	<button name="customButton"
      				ref={function (btn) {
                     if (btn != null) {
                       btn.onclick = _this.openCheckout;
                     }
				    	 }}>Pay {format(this.props.amount)} with Card</button>
     </div>)
  },
});

//
// Main Payment Form component, all mutable state lives here. Child
// components are updated through props and store no state of their own.
//
var PaymentForm = React.createClass({
	getInitialState: function () {
  	return {
    	amount: 1000,
      description: '2 Reactive Components',
      name: 'JSFiddle Shop',
      response: {},
      token: '',
      stripeCheckoutHandler: StripeCheckout.configure({
      	key: this.props.publishableKey,
        token: this.handleToken,
	    }),
    };
  },
  handleToken: function (response) {
  	this.setState({response: response, token: response.id});
  },
  handleChange: function (event) {
    event.preventDefault();

    var state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  },
	render: function () {
    return

(		<form>
    	<div>
        <label for="amount">Name</label>
        <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
      </div>

			<div>
        <label for="amount">Description</label>
        <input type="text" id="description" onChange={this.handleChange} value={this.state.description} />
      </div>

			<div>
        <label for="amount">Amount (in cents)</label>
        <input type="text" id="amount" onChange={this.handleChange} value={this.state.amount} />
      </div>

			<PaymentButton handler={this.state.stripeCheckoutHandler} onToken={this.handleToken} amount={this.state.amount} description={this.state.description} name={this.state.name} />
      <div>
        <div className="token">
          <label for="token">Token</label>
          <input type="text" name="token" value={this.state.token} />
        </div>
        {this.state.token ?
        	<div>
          	<p><small>Token received from Stripe and ready to send to your server! You could do this directly from callback passed to <code>Stripe.card.createToken()</code> by either an AJAX call or triggering a normal DOM form submission.</small></p>
            <p><small>Use the token to create a <a href="https://stripe.com/docs/charges" target="_blank">Charge</a> with your <em>server-side</em> code.</small></p>
          	<input type="submit" />
          </div> :
          <div /> }
			</div>
      <div>
      	<h4>Stripe Response</h4>
	      <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
      </div>
		</form>)
  }
});

ReactDOM.render(<PaymentForm publishableKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh' />, document.getElementById('app'));
