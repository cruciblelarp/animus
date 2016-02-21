/* globals exports, require, __dirname */

var loader = require('es6-module-loader');
var phantomjs = require('phantomjs');

var System = loader.System;
System.transpiler = 'traceur';
System.traceurOptions = {
	// fuck knows.
};

Promise.all([
	System.import('../server/server.es6'),
	System.import('../scripts/config.es6')

]).then(function (imports) {
	var server = imports[0];
	var config = imports[1];

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

		beforeLaunch: function () {
			return server.start();
		},

		afterLaunch: function () {
			return server.stop();
		}

	};

}).catch(function (error) {
	console.error(error.message);
	throw error;
});
