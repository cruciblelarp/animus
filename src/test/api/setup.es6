/* globals before, after, describe, require */

import * as server from '../../server/server.js';

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

before(function(done) {

	console.log('Starting the server...');
	server.start(function() {
		console.log('Server started!\n');
		done();

	}, function(error) {
		console.warn('Server failed to start!');
		done(error);

	});

});

after(function(done) {

	server.stop(function() {
		console.log('Server stopped!');
		done();

	}, function(error) {
		console.warn('Server failed to stop properly!');
		done(error);

	});

});

describe("The server", function() {

	it("should be started", function() {

		return req({
			uri: 'http://localhost:8000/',
			method: 'GET'

		}).then(function(response) {

				expect(response.status).to.be(200);
				done();

		});

	});

});
