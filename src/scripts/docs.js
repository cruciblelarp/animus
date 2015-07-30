/* globals require, module */

var gulp = require('gulp');
var apidoc = require('gulp-apidoc');

module.exports = function() {

	return apidoc.exec({
		src: 'src/server',
		dest: 'src/server/static/docs',
		debug: true,
		includeFilters: [
			'^.*\\.js$'
		]
	})

};
