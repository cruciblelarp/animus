/* globals require, module */

var Model = require('model');

var socket = require('./socket');

module.exports = function(session) {

	if (!session.model) {
		session.model = new Model();
	}

	return session.model;

};
