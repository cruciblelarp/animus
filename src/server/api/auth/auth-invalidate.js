/* globals module, require */

var app = require('../../express');

/**
 * @api {delete} /api/auth Invalidates the current session.
 * @apiName InvalidateUser
 * @apiGroup Authentication
 *
 * @type {String}
 */
module.exports = app.del('/api/auth', function(request, response) {

	if (request.session.user) {
		request.session.destroy();
		return response.send(200);
	}

	return response.send(404);

});
