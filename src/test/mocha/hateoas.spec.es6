/* globals describe, __dirname */

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

			var expectedFiles = [ 'hateoas.spec.es6', 'mocha.opts' ];

			target.forFilesIn(__dirname, function(file, stats) {
				expect(expectedFiles).to.contain(file);

			}).then(done).catch(function(error) {
				throw error;
			});

		});

	});

});
