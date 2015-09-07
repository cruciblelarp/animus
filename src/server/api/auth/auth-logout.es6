/* globals module, require */

module.exports = {

	method: 'DELETE',

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
			return reject(404);
		}

		session.destroy();
		return resolve();

	}

};

