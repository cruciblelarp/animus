/* global describe, it */
'use strict';

let path = "http://localhost:8000/";

import chai from 'chai';
import req from 'request-promise';

let expect = chai.expect;

describe('POST:/api/auth', () => {

	it('should handle login checking', () => {

		return req({
			uri: `${path}/auth`,
			method: 'GET'

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(401);

		});

	});

	it('should reject a missing username', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				password: 'irrelevantpassword'
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a missing password', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				username: 'irrelevantuser'
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a missing username and password', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a bad username', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				username: 'notauser',
				password: 'irrelevantpassword'
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a bad password', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				username: 'realuser',
				password: 'wrongpassword'
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should log-in a correct username + password', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				username: 'realuser',
				password: 'realpassword'
			}

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(204);

		});

	});

	it('should confirm log-in after successful login', () => {

		return req({
			uri: `${path}/auth`,
			method: 'POST',
			json: true,
			body: {
				username: 'realuser',
				password: 'realpassword'
			}

		}).then(function(result) {

			return req({
				uri: `${path}/auth`,
				method: 'GET'

			});

		}).then(function(result) {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(204);

		});

	})

});
