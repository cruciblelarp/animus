/* globals require, module */

var _ = require('underscore');

var app = require('./express');
var auth = require('./service/auth-service');
var account = require('./service/account-service');
var adminCharacter = require('./service/admin-character-service');

function scan(config, path) {
	return new Promise(function(resolve, reject) {

		var promises = _.collect(config, function(value, key) {

			if (!_.isFunction(value)) {
				return scan(value, ( path || '' ) + '/' + key);
			}

			return Promise.resolve(app[key](path, function (request, response) {

				var data = _.extend({}, request.query, request.body, request.params);

				return value(data, request.session).then(function (result) {
					return response.status(200).send(result);

				}, function (error) {

					// Basic error response.
					if (_.isNumber(error)) {
						return response.status(error);
					}

					// Custom error response.
					if (error.status && error.message) {
						return response.status(error.status).send({
							error: error.message
						});
					}

					// System error response.
					if (error.message && error.stack) {
						console.error(error.stack);
						return response.status(500).send({
							error: error.message
						});
					}

					// Unexpected error response.
					console.error('Unexpected error response!');
					return response.status(500);

				});

			}));

		});

		return Promise.all(_.compact(promises))
			.then(resolve, reject);

	});
}

module.exports = scan({

	auth: {

		/**
		 * @api {get} /api/auth Checks that the authentication for the current user is valid.
		 * @apiName GetUser
		 * @apiGroup Authentication
		 *
		 * @apiSuccess {Object} user The user record currently in the session.
		 *
		 * @type {Function}
		 */
		get: auth.check,

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
		 * @type {Function}
		 */
		post: auth.login,

		/**
		 * @api {delete} /api/auth Invalidates the current session.
		 * @apiName InvalidateUser
		 * @apiGroup Authentication
		 *
		 * @type {Function}
		 */
		delete: auth.logout

	},

	account: {

		post: account.signup,

		put: account.update,

		get: account.recover

	},

	admin: {

		accounts: {
			post: null, // create
			get: null, // list
			':id': {
				get: null, // view
				put: null, // update
				delete: null // remove
			}
		},

		characters: {
			get: adminCharacter.list,
			post: adminCharacter.create,
			':id': {
				get: adminCharacter.read,
				put: adminCharacter.update,
				delete: adminCharacter.delete
			}
		}

	}
}, '/api');
