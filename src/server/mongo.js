/* globals require, module */

module.exports = {

	get: function(collection, query) {
		switch (collection) {

			case 'user':
				return {
					then: function(callback) {
						return callback({
							_id: query.email.length,
							email: query.email,
							password: {
								_id: query.email.length
							}
						});
					}
				};

			case 'password':
				return {
					then: function(callback) {
						return callback({
							_id: query._id,
							hash: 'password'
						});
					}
				};

			default:
				return {
					then: function(callback) {
						return callback({
						});
					}
				};

		}

	}

};
