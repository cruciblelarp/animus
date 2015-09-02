/* globals require, module */

var _ = require('underscore');
var suit = require('suit');


var constraint = suit.constraints();

var Validator = function(constructor) {
	var schema = constructor(constraint);
	return function(candidate) {
		return new Promise(function(resolve, reject) {
			try {
				return resolve(suit.fit(candidate, schema));

			} catch (error) {

				if (_.isString(error)) {
					console.warn(error);
					return reject(400, {
						message: error
					});
				}

				if (error.message && error.stack) {
					return reject(error);
				}

				return reject(400, error);

			}
		});

	}
};

module.exports = function(validation, operation, secure) {

	var validator = new Validator(validation);

	// Each service function is provided two arguments: params and session.
	return function(params, session) {

		if (( secure || _.isUndefined(secure) ) && ( !session.user || !session.user.id )) {
			console.log('Attempted access to secured endpoint.');
			return Promise.reject(401);
		}

		// If the request payload successfully validates..
		return validator(params).then(function(result) {

			// Return a promise for the operation.
			return new Promise(function(resolve, reject) {

				// All operations return the result of their resolution/rejection
				return operation(result, session, resolve, reject);

			});

		});

	};
};
