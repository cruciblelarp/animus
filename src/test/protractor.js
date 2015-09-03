/* globals exports, require, __dirname */

var phantomjs = require('phantomjs');

var server = require('../server/server.es6');
var config = require('../scripts/config.es6');

exports.config = {

	seleniumServerJar: config.PATH_LIBS_ABS + '/protractor/selenium/selenium-server-standalone-2.45.0.jar',

	specs: [
		'./protractor/**/*.e2e.*'
	],

	capabilities: {
		browserName: 'phantomjs',
		'phantomjs.binary.path': phantomjs.path
	},

	framework: 'mocha',

	mochaOpts: {
		ui: 'bdd',
		reporter: 'list',
		compilers: 'es6:mocha-traceur'
	},

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	},

	beforeLaunch: function() {
		return server.start();
	},

	afterLaunch: function() {
		return server.stop();
	}

};
