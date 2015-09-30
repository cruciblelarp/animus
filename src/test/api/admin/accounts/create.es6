/* globals require, describe, it */

let path = "http://localhost:8000/";

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

describe("GET:/admin/accounts", function () {

	return req({
		uri: path,
		method: 'GET'

	}).then(function(options) {

		it('should provide an html template', function(done) {

			expect(options).to.not.be(null);
			done();

		});

	});

});
