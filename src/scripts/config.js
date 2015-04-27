'use strict';

/* globals require, module, __dirname */

var path = require('path');

var $config = {};
$config.PATH_STATIC = 'src/server/static';
$config.PATH_STATIC_ABS = path.resolve(__dirname + '/../..', $config.PATH_STATIC);
$config.PATH_STATIC_REL = '../../' + $config.PATH_STATIC;
$config.PATH_STATIC_LIBS = $config.PATH_STATIC + '/lib';

$config.sourcemaps = {
	sourceRoot: $config.PATH_STATIC,
	sourceMappingURLPrefix: '.'
};

$config.requirejs = require($config.PATH_STATIC_REL + '/require-config');

module.exports = $config;
