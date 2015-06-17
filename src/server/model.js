/* globals require, module, console */

var Model = require('model');

var socket = require('./socket');

module.exports = function(session) {

	if (!session.model) {
		session.model = new Model();
		console.log(session.id + ': model initialised.');
	}

	return session.model;

};
