/* globals require, module, process */

var _ = require('underscore');
var Promise = require('promise');

var config = require('./config');

var listeners = [];
var exitCode = 0;

// Hook into all the process exit codes.
var events = new Promise(function(resolve) {

	var exiting = false;
	function exit(event) {
		if (!exiting) {
			exiting = true;
			resolve(event);
		}
	}

	process.on('SIGTERM', exit);
	process.on('SIGINT', exit);
	process.on('SIGQUIT', exit);
	process.on('uncaughtException', function() {
		exitCode = config.constant.EXIT_ERROR;
		exit.apply(exit, arguments);
	});

});

// Resolve all the listeners as promises in one go.
var closing = events.then(function() {
	return Promise.all(_.collect(listeners, function(listener) {
		return new Promise(listener);
	}));
});

var timer = null;

// Make sure the exit doesn't take too long.
var timeout = events.then(function() {
	return new Promise(function(resolve) {
		return timer = setTimeout(function() {
			return resolve([
				config.constant.EXIT_TIMEOUT
			]);
		}, config.timeout.exit);
	});
});

// Whichever process finishes first.
var first = new Promise(function(resolve) {

	var triggered = false;
	function trigger(data) {
		if (!triggered) {
			triggered = true;
			resolve(data);
		}
	}

	closing.then(trigger);
	timeout.then(trigger);

});

// regardless which finishes first, clear the timeout.
first.then(function() {
	clearTimeout(timer);
});

// exit the process with the provided code.
first.then(function(list) {
	var max = _.max(exitCode, _.max(list));
	process.exit(max);
});

module.exports = {

	listen: function (callback) {
		listeners.push(callback);
	}

};
