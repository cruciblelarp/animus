/* globals require, module */

var wrapper = require('./wrapper');

module.exports = {

	signup: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {
		return reject(501);
	}),

	recover: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {
		return reject(501);
	}),

	update: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {
		return reject(501);
	})

};
