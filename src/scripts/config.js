'use strict';

/* globals require, module, __dirname */

var path = require('path');

var $config = {};

$config.PATH_SCRIPTS = 'src/scripts';

$config.PATH_STATIC = 'src/server/static';
$config.PATH_STATIC_ABS = path.resolve(__dirname + '/../..', $config.PATH_STATIC);
$config.PATH_STATIC_REL = '../../' + $config.PATH_STATIC;
$config.PATH_STATIC_LIBS = $config.PATH_STATIC + '/lib';

$config.watch_noread = {
	read: false
};

$config.sourcemaps = {
	sourceRoot: $config.PATH_STATIC,
	sourceMappingURLPrefix: './'
};

$config.manifest = {
	hash: true,
	exclude: [
		$config.PATH_STATIC + '/app.manifest'
	]
};

$config.libraries = [
	'node_modules/URIjs/src/URI.js',
	'node_modules/URIjs/src/punycode.js',
	'node_modules/URIjs/src/IPv6.js',
	'node_modules/URIjs/src/SecondLevelDomains.js',
	'node_modules/angular/angular.js',
	'node_modules/requirejs/require.js',
	'node_modules/requirejs-text/text.js',
	'node_modules/underscore/underscore.js',
	'node_modules/angular-ui-router/release/angular-ui-router.js',
	'node_modules/angular-bootstrap/dist/ui-bootstrap.js',
	'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.js',
	'node_modules/angulartics/src/angulartics.js',
	'node_modules/angulartics/src/angulartics-ga.js',
	'node_modules/socket.io/node_modules/socket.io-client/socket.io.js',
	'node_modules/ngstorage/ngStorage.js'
];

$config.requirejs = require($config.PATH_STATIC_REL + '/require-config');
$config.requirejs.baseUrl = 'src/server/static';

module.exports = $config;
