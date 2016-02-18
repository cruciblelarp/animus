/* globals before, after, describe, it, console */

import req from 'request-promise';

export const baseurl = 'http://localhost:8000/api';

export const request = req.defaults({
	resolveWithFullResponse: true,
	simple: false,
	json: true,
	jar: true
});

before(() => {

	req.debug = true;

});

beforeEach(() => {

	request.jar();

});
