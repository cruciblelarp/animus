/* globals before, after, describe, require */

import * as server from '../../server/server.es6';

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

before(function() {

	return server.start();

});

after(function() {

	return server.stop();

});

describe("The server", function() {

	it("should be started", function() {

		return req({
			uri: 'http://localhost:8000/',
			method: 'GET'

		}).then(function(response) {

				expect(response).to.not.be(null);
				done();

		});

	});

});
