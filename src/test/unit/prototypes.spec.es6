/* globals require, describe, it, Array, Map, Object */

import * as prototypes from '../../server/prototypes.js';

let chai = require('chai');

let expect = chai.expect;

describe('A prototype extension', function() {

	describe('to collect iterable results', function() {

		it('should be defined on Array, Map, and Object prototypes', function() {
			expect(Array.prototype.collect).to.be.a('function');
			expect(Map.prototype.collect).to.be.a('function');
			expect(Object.prototype.collect).to.be.a('function');
		});

		it('should collect values transformed from an Array', function() {

			let array = [ 'a', 'b', 'c' ];
			let transform = function(item) {
				return item.toUpperCase();
			};

			let result = array.collect(transform);

			expect(result).to.eql([ 'A', 'B', 'C' ]);

		})

	});

	describe('to filter iterable results', function() {

		it('should be defined on Array, Map, and Object prototypes', function() {
			expect(Array.prototype.filter).to.be.a('function');
			expect(Map.prototype.filter).to.be.a('function');
			expect(Object.prototype.filter).to.be.a('function');
		});

		it('should filter an Array based on a provided predicate', function() {

			let array = [ 'a', 'b', 'c' ];
			let predicate = function(item) {
				return item !== 'b';
			};

			let result = prototypes.filter.call(array, predicate);

			expect(result).to.eql([ 'a', 'c' ]);

		});

	});

	describe('to print a prototype chain', function() {

		it('should be defined on Object', function() {
			expect(Object.prototype.protoChain).to.be.a('function');
		});

		it('should return a well-formatted prototype chain', function() {

			let array = [];

			let result = prototypes.protoChain.call(array);

			expect(result).to.equal('Object :: Array');

		});

	});

});
