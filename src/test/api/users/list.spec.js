/* globals require, describe, it */

let chai = require('chai');
let req = require('request-promise');

let expect = chai.expect;

import * as setup from '../setup.js';
import { request as login } from '../auth/login.spec.js';

export const request = () => {
	return req({
		uri: `${setup.baseurl}/api/user`,
		method: 'GET',
		json: true
	});
};

describe("GET:/users", () => {

	it('should be secured', () => {

		return request().then((response) => {
			expect(response).to.not.be(null);
			expect(response.status).to.equal(401);

		});

	});

	it('should provide a list of users', () => {

		return login('realuser', 'realpassword').then(() => {
			return request();

		}).then((response) => {
			expect(response).to.not.be(null);
			expect(response.status).to.equal(200);

		});

	});

});
