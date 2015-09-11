/* globals require, module, __dirname */

import scan from './hateoas/scanner.es6';

let _ = require('underscore');
let paths = require('path');

export const mime = {
	jade: 'application/jade',
	html: 'text/html',
	js: 'application/javascript',
	json: 'application/json',
	css: 'text/css',
	less: 'application/less',
	scss: 'application/sass'
};

export default scan(paths.resolve(__dirname, 'api'));
