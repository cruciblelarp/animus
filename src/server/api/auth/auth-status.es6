/* globals module, require */

module.exports = {

	method: 'GET',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

		};
	},

	resolver: function(params, session, resolve, reject) {

		if (!session.user) {
			return reject(401);
		}

		resolve(session.user);

	}

};

