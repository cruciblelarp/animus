/* globals module, require */

var app = require('./express');
var http = require('./http');
var sockit = require('sockit-express');

module.exports = sockit({
	express: app,
	server: http
});
