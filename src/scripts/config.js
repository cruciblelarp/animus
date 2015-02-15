'use strict';

/* globals require, module, __dirname */

var path = require('path');

var $config = {};
$config.PATH_STATIC = 'src/server/static';
$config.PATH_STATIC_ABS = path.resolve(__dirname + '/../../..', $config.PATH_STATIC);

module.exports = $config;
