/* globals module, __dirname */

var path = require('path');

var config = require('../server/config');

module.exports = function(config) {
	config.set({
		basePath: path.resolve(__dirname, '../../'),

		browsers: [
			'PhantomJS'
		],

		frameworks: [
			'mocha',
			'protractor',
			'traceur'
		],

		hostname: config.hostname,

		loggers: [

			{
				type: 'console'
			},

			{
				type: 'file',
				filename: 'karma.log',
				maxLogSize: 20480,
				backups: 0,
				category: 'relative-logger'
			}
		],

		plugins: [
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-junit-reporter'
		],

		port: config.port,

		preprocessors: {

			'src/server/**/*.es6': [
				'traceur',
				'coverage'
			],

			'src/server/**/*.js': [
				'coverage'
			]

		},

		reporters: [
			'progress',
			'coverage',
			'junit'
		],

		singleRun: true,

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		traceurPreprocessor: {
			options: {
				sourceMaps: true,
				modules: 'amd'
			}
		}

	})
};
