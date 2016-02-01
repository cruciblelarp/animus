/* globals module, require */

module.exports = {

	GET: {

		'text/html': require('./account-angular_template.jade'),

		'application/javascript': require('./account-angular_controller.js'),

		'application/json': require('./account-details.es6')

	},

	'POST': {

		'application/json': require('./account-signup.es6')

	},

	'PUT': {

		'application/json': require('./account-update.es6')

	}

};
