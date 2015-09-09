/* globals before, after, describe, require */

import * as server from '../../server/server.es6';

let chai = require('chai');

let expect = chai.expect;

before(function() {

	return server.start();

});

after(function() {

	return server.stop();

});

describe("The server", function() {

	it("should be started", function() {

		expect(true).to.be(true);

	});

});
