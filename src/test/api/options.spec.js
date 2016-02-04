/* globals require, describe, beforeEach, it */

import chai from 'chai';
import req from 'request-promise';

const expect = chai.expect;

import * as setup from './setup.js';

export const request = () => {
	return req({
		uri: `${setup.baseurl}/api`,
		method: 'OPTIONS',
		json: true
	});
};

describe("OPTIONS:/", () => {

	it('should provide a', () => {

		return request().then((options) => {
			expect(options).to.not.be(null);
		});

	});

});
