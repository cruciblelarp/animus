/* globals require, module, __dirname */

module.exports = {

	path: {
		base: __dirname
	},

	hostname: process.env['HOST'] || 'localhost',

	port: process.env['PORT'] || 8000,
	mongo: {
		uri: process.env['MONGOLAB_URI']
			|| 'mongodb://localhost:27017/animus'
	},

	socket: {
		port: 1234
	},

	timeout: {
		exit: 5000
	},

	constant: {

		EXIT_OK: 0,
		EXIT_MONGO: 1,
		EXIT_HTTP: 2,
		EXIT_SOCKET: 3,
		EXIT_SWARM: 4,
		EXIT_TIMEOUT: 5,
		EXIT_ERROR: 6

	}

};
