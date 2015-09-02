/* globals module, require, describe, it, browser, element, by */

var req = require('request-promise');
var chai = require('chai');

var expect = chai.expect;

describe('animus root options', function() {

	var path = "http://localhost:8000/";

	return browser.executeAsyncScript(function(done) {

		return req({
			uri: path,
			method: 'OPTIONS'
		});

	}).then(function(options) {

		it('should provide an html template', function(done) {

			expect(options).to.not.be(null);
			done();

		});

	});

});
