/**
 * This function return the complete string to use in the header "Authorization" field.
 * Payson documentation: https://api.payson.se/wp/new-api/api-methods/
 * @param  {String} vendorId Vendor ID
 * @param  {String} apiKey   Api key
 * @return {String}          Base64 encoded string
 */
module.exports.authString = function authString(vendorId, apiKey) {
	return 'Basic ' + new Buffer(vendorId + ':' + apiKey).toString('base64');
}

/**
 * This functions returns the URI for a specfic method. It considers instance state (demo or production) and possible methods reflect method names in payson documentation
 * https://api.payson.se/wp/new-api/api-methods/
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
module.exports.getApiUri = function getApiUri(inProductionMode, method, id) {

	var endpoint;

	switch (method) {
		case "validate":
			endpoint = '/Accounts';
			break;
		case "create":
			endpoint = '/Checkouts';
			break;
		case "read":
			endpoint = '/Checkouts/' + id;
			break;
		case "update":
			endpoint = '/Checkouts/' + id;
			break;
		case "list":
			endpoint = '/Checkouts';
			break;
		default:
			throw new Error('no or wrong method provided');
	}

	if(inProductionMode) {
		return 'https://api.payson.se/2.0' + endpoint;
	} else {
		return 'https://test-api.payson.se/2.0' + endpoint;
	}
}
