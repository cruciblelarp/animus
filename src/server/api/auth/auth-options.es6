/* globals module, require */

module.exports = {

	GET: {

		/**
		 * @api {get} /api/auth Checks that the authentication for the current user is valid.
		 * @apiName GetUser
		 * @apiGroup Authentication
		 *
		 * @apiSuccess {Object} user The user record currently in the session.
		 *
		 * @type {Function}
		 */
		'application/json': {
			name: 'status',
			action: require('./status.es6')
		},

		'application/javascript': {
			name: 'angular-controller',
			action: require('./angular-controller.es6')
		},

		'text/html': {
			name: 'angular-template',
			action: require('./angular-template.jade')
		}

	},

	POST: {

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
		'application/json': {
			name: 'login',
			action: require('./login.es6')
		}

	},

	/**
	 * @api {delete} /api/auth Invalidates the current session.
	 * @apiName InvalidateUser
	 * @apiGroup Authentication
	 *
	 * @type {Function}
	 */
	DELETE: {

		'application/json': {
			name: 'logout',
			action: require('./logout.es6')
		}

	}

};
