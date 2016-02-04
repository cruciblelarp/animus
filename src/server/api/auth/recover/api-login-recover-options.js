/* globals module, require */

module.exports = {

	GET: {

		'application/javascript': {
			action: require('./account-recover-angular_controller.js')
		},

		'text/html': {
			action: require('./account-recover-angular_template.jade')
		}

	},

	POST: {

		'application/json': {
			action: require('./account-recover-submit.js')
		}

	},

	PUT: {

		'application/json': {
			action: require('./account-recover-confirm.js')
		}

	}

};
