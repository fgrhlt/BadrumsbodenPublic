'use strict';

/**
 * Payson documentation: https://api.payson.se/wp/order-item/
 */

function OrderItem(name, reference, unitPrice, type) {
	this.name = name;
	this.quantity = 1;
	this.reference = reference;
	this.taxRate = 0.25;
	this.unitPrice = unitPrice;
	this.type = type || 'Physical';

	this.setQuantity = function(quantity) {
		this.quantity = quantity || 1;
	};

	this.setTaxRate = function(taxRate) {
		this.taxRate = taxRate || 0.25;
	};
}

module.exports = OrderItem;
