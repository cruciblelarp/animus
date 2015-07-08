/** exports, require */

var phantomjs = require('phantomjs');
var server = require('../server/server');

exports.config = {

	seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

	multiCapabilities: [

		{
			browserName: 'chrome'
		},

		{
			browserName: 'phantomjs',
			'phantomjs.binary.path': phantomjs.path
		}

	],

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
		return server()();
	}

};
