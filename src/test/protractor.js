/** exports, require */

var phantomjs = require('phantomjs');

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

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	}

};
