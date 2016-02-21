/* global describe, it */
'use strict';

import chai from 'chai';

const expect = chai.expect;

import * as setup from '../setup.js';

export const request = (email, password) => {

	const body = {};
	email && ( body.email = email );
	password && ( body.password = password );

	return setup.request({
		uri: `${setup.baseurl}/auth`,
		method: 'PUT',
		body: body
	});

};

describe('POST:/auth', () => {

	it('should reject a missing email', () => {

		return request(undefined, 'irrelevantpassword').then((result) => {

			expect(result).to.exist;
			expect(result.statusCode).to.equal(400);

		});

	});

	it('should reject a missing password', () => {

		return request('irrelevantemail', undefined).then((result) => {

			expect(result).to.exist;
			expect(result.statusCode).to.equal(400);

		});

	});

	it('should reject a missing email and password', () => {

		return request(undefined, undefined).then((result) => {

			expect(result).to.exist;
			expect(result.statusCode).to.equal(400);

		});

	});

	it('should reject a bad email', () => {

		return request('notauser@dontexist.com', 'irrelevantpassword').then((result) => {

			expect(result).to.exist;
			expect(result.statusCode).to.equal(404);

		});

	});

	it('should reject a bad password', () => {

		return request('email@somewhere.com', 'wrongpassword').then((result) => {

			expect(result).to.exist;
			expect(result.statusCode).to.equal(401);

		});

	});

	it('should log-in a correct username + password', () => {

		return request('email@somewhere.com', 'password').then((result) => {

			expect(result).to.exist;
			console.info(JSON.stringify(result.body));
			expect(result.statusCode).to.equal(200);

		});

	});

	describe('when successfully logged-in', () => {

		let result = null;

		before(() => {
			return request('email@somewhere.com', 'password').then((response) => {
				result = response;
			});
		});

		it('should not have a password listed.', () => {
			expect(result.password).to.not.exist;
		});

		it('should have a list of user permissions', () => {
			expect(result.permissions).to.exist;
			expect(result.permissions).to.be.an('array');
			expect(result.permissions.length).to.be.greaterThan(0);
		});

	});

});
