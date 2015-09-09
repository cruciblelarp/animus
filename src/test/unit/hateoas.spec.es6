/* globals describe, __dirname */

let _ = require('underscore');
let path = require('path');
let chai = require('chai');

let expect = chai.expect;

import * as target from '../../server/hateoas.es6';

describe('The hateoas module', function() {

	describe('scan function', function() {

		it('should exist and be a function', function() {
			expect(target.scan).to.be.a('function');
		});

	});

	describe('wireResource function', function() {

		it('should exist and be a function', function() {
			expect(target.wireResource).to.be.a('function');
		});

	});

	describe('validate function', function() {

		it('should exist and be a function', function() {
			expect(target.validate).to.be.a('function');
		});

	});

	describe('forFilesIn function', function() {

		it('should exist and be a function', function() {
			expect(target.forFilesIn).to.be.a('function');
		});

		it('should enumerate all the files in the provided directory, with their stats', function(done) {

			var expectedFiles = [
				path.resolve(__dirname, 'hateoas.spec.es6')
			];

			target.forFilesIn(__dirname, function(file, stats) {
				console.log('Found ' + file);

				let listSize = expectedFiles.length;
				expectedFiles = _.without(expectedFiles, path.resolve(file));

				expect(expectedFiles).to.have.length(listSize - 1);

			}).then(function() {
				expect(expectedFiles).to.have.length(0);
				done();

			}).catch(function(error) {
				done(error);
			});

		});

	});

});
