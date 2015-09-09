/* globals require, describe, it */

const path = "http://localhost:8000/";

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

describe("The root endpoint", function () {

	return req({
		uri: path,
		method: 'OPTIONS'

	}).then(function(options) {

		it('should provide an html template', function(done) {

			expect(options).to.not.be(null);
			done();

		});

	});

});
