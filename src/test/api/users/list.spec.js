/* globals require, describe, it */

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

import * as setup from '../setup.js';
import { request as login } from '../auth/login.spec.js';

export const request = () => {
	return req({
		resolveWithFullResponse: true,
		uri: `${setup.baseurl}/users`,
		method: 'GET',
		simple: false,
		json: true
	});
};

describe("GET:/users", () => {

	it('should be secured', () => {

		return request().then((response) => {
			expect(response).to.exist;
			expect(response.statusCode).to.equal(401);

		});

	});

	it('should provide a list of users', () => {

		return login('realuser', 'realpassword').then((response) => {
			expect(response.statusCode).to.equal(200);
			return request();

		}).then((response) => {
			expect(response).to.exist;
			expect(response.statusCode).to.equal(200);

		});

	});

});
