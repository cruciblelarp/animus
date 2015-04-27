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

$config.requirejs = require($config.PATH_STATIC_REL + '/require-config');

module.exports = $config;
