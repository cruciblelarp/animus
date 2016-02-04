/* global describe, it */
'use strict';

import chai from 'chai';
import req from 'request-promise';

const expect = chai.expect;

import * as setup from '../setup.js';

export const request = (username, password) => {

	const body = {};
	username && ( body.username = username );
	password && ( body.password = password );

	return req({
		uri: `${setup.baseurl}/api/auth`,
		method: 'POST',
		json: true,
		body: body
	});

};

describe('POST:/auth', () => {

	it('should reject a missing username', () => {

		return request(undefined, 'irrelevantpassword').then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a missing password', () => {

		return request('irrelevantuser', undefined).then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a missing username and password', () => {

		return request(undefined, undefined).then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a bad username', () => {

		return request('notauser', 'irrelevantpassword').then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should reject a bad password', () => {

		return request('realuser', 'wrongpassword').then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(400);

		});

	});

	it('should log-in a correct username + password', () => {

		return request('realuser', 'realpassword').then((result) => {

			expect(result).to.not.equal(null);
			expect(result.status).to.equal(204);

		});

	});

});
