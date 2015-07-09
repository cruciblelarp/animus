/* globals exports, require, __dirname */

var phantomjs = require('phantomjs');
var server = require('../server/server');
var config = require('../scripts/config');

exports.config = {

	seleniumServerJar: config.PATH_LIBS_ABS + '/protractor/selenium/selenium-server-standalone-2.45.0.jar',

	capabilities: {
		browserName: 'phantomjs',
		'phantomjs.binary.path': phantomjs.path
	},

	framework: 'mocha',

	mochaOpts: {
		ui: 'bdd',
		reporter: 'list'
	},

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	},

	beforeLaunch: function() {
		return server();
	},

	onCleanUp: function() {
		return server().then(function(close) {
			return close();
		});
	}

};
