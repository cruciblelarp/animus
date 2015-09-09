/* globals require, module, console */

var Model = require('model');

import socket from './socket.es6';

module.exports = function(session) {

	if (!session.model) {
		session.model = new Model();
		console.log(session.id + ': model initialised.');
	}

	return session.model;

};
