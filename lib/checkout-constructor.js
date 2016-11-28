'use strict';

function Checkout(reference, checkoutUri, confirmationUri, notificationUri, termsUri) {
	this.merchant = {
		checkoutUri: checkoutUri,
		confirmationUri: checkoutUri,
		notificationUri: notificationUri,
		termsUri: checkoutUri,
		reference: reference,
		integrationInfo: 'Custom integration from the lovely open source community'
	};
	this.order = {
		currency: 'sek',
		items: []
	};
	this.gui = {
		locale: 'sv'
	};

	this.addItem = function(item) {
		this.order.items.push(item);
	};
}

module.exports = Checkout;
