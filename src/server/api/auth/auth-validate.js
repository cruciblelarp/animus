/* globals module, require */

var app = require('../../express');
var process = require('../../service/auth/auth-validate');

/**
 * @api {post} /api/auth Logs the user in.
 * @apiName ValidateUser
 * @apiGroup Authentication
 *
 * @apiParam {String} email The email of the user.
 * @apiParam {String} password The password of the user.
 *
 * @apiSuccess {Object} user The user record now stored in the session.
 *
 * @type {String}
 */
module.exports = app.post('/api/auth', function(request, response) {

	var email = request.body.email;
	var password = request.body.password;

	if (email && !password) {
		return response.redirect('/auth');
	}

	return process(email, password).done(function(user) {
		request.session.user = user;
		response.send(200, user);

	}, function(error) {

		if (_.isNumber(error)) {
			return response.send(error);
		}

		console.error(error.stack);
		return response.send(500);

	});

});
