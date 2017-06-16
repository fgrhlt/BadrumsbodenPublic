'use strict';

/**
 * Payson documentation: https://api.payson.se/wp/order-item/
 */

function OrderItem(name, reference, unitPrice, quantity) {
	console.log('name, reference, unitPrice, quantity', name, reference, unitPrice, quantity);
	this.name = name;
	this.quantity = quantity
	this.reference = reference;
	this.taxRate = 0.25; //TODO: hur mkt?
	this.unitPrice = unitPrice;
	this.type = 'Physical';

	// this.setQuantity = function(quantity) {
	// 	this.quantity = quantity || 1;
	// }; TODO, remove? 

	// this.setTaxRate = function(taxRate) {
	// 	this.taxRate = taxRate || 0.25;
	// };
}

module.exports = OrderItem;
