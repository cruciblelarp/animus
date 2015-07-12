/* globals module, require */

var app = require('../../express');

/**
 * @api {get} /api/auth Checks that the authentication for the current user is valid.
 * @apiName GetUser
 * @apiGroup Authentication
 *
 * @apiSuccess {Object} user The user record currently in the session.
 *
 * @type {String}
 */
module.exports = app.get('/api/auth', function(request, response) {

	if (!request.session.user) {
		return response.send(401);
	}

	return response.send(200, request.session.user);

});
