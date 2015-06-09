/* globals require, module */

var _ = require('underscore');
var gulp = require('gulp');
var through = require('through2');

var config = require('./config');

module.exports = function() {

	var regex = /(define\()(function ?\(\) \{\s+return (\w+?);\s+?\}\);)/g;

	var intercept = through.obj(function(file, encoding, done) {

		if (file.path.indexOf('socket.io.js') < 0) {
			this.push(file);
			return done();
		}

		var content = file.contents.toString();

		if (!content.match(regex)) {
			throw new Error('Unable to match anon define calls in socket.io.js');
		}

		content = content.replace(regex, function(match, $1, $2, $3) {
			return $1 + '\'' + $3.toLowerCase() + '\', ' + $2;
		});

		file.contents = new Buffer(content, encoding);
		console.log('Fixed stupid amd bug in socket.io.js');

		this.push(file);
		return done();

	});

	return gulp.src(config.libraries)
		.pipe(intercept)
		.pipe(gulp.dest(config.PATH_STATIC_LIBS));

};
