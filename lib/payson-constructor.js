'use strict';

var rp = require('request-promise');
var utils = require('./utils');

function PaysonPayment(vendorId, apiKey, inProductionMode) {
	if(!vendorId || !apiKey) {
		throw new Error('credentials not provided');
	}

	this.vendorId = vendorId;
	this.apiKey = apiKey;
	this.inProductionMode = inProductionMode === true ? true : false;

	this.validate = function() {
		var options = {
			method: 'GET',
			uri: utils.getApiUri(this.inProductionMode, 'validate'),
			headers: {
				Authorization: utils.authString(this.vendorId, this.apiKey)
			},
			json: true
		};
		return rp(options);
	};

	this.create = function(checkoutObj) {
		var options = {
			method: 'POST',
			uri: utils.getApiUri(this.inProductionMode, 'create'),
			headers: {
				Authorization: utils.authString(this.vendorId, this.apiKey),
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: checkoutObj,
			json: true
		};
		return rp(options);
	};

	this.update = function(id, checkoutObj) {
		var options = {
			method: 'PUT',
			uri: utils.getApiUri(this.inProductionMode, 'update', id),
			headers: {
				Authorization: utils.authString(this.vendorId, this.apiKey),
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: checkoutObj,
			json: true
		};
		return rp(options);
	};

	this.read = function(id) {
		var options = {
			method: 'GET',
			uri: utils.getApiUri(this.inProductionMode, 'read', id),
			headers: {
				Authorization: utils.authString(this.vendorId, this.apiKey),
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			json: true
		};
		return rp(options);
	};
}

module.exports = PaysonPayment;
