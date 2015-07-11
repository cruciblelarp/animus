/* globals require, module */

var _ = require('underscore');
var suit = require('suit');

var constraint = suit.constraints();

module.exports = function(constructor) {
	var schema = constructor(constraint);
	return function(candidate, onError) {
		try {
			return suit.fit(candidate, schema);

		} catch (error) {

			if (_.isString(error)) {
				console.debug(error);
				return onError(error);
			}

			console.error(error.stack);
			return onError(error.message);

		}
	}
};
