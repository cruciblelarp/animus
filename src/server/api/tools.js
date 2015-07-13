/* globals require, module */

var _ = require('underscore');
var app = require('../express');

module.exports = {

	path: function(path, actions) {
		return _.collect(actions, function(handler, method) {
			return app[method](path, handler);
		});
	},

	handleError: function(response) {
		return function(error) {

			if (_.isNumber(error)) {
				return response.send(error);
			}

			console.error(error.stack);
			return response.send(500, error.message);

		}
	}

};
