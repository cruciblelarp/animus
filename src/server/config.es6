/* globals require, module, __dirname */

export default {

	path: {
		base: __dirname
	},

	debug: process.env['production']
		? process.env['production'] !== 'true'
		: true,

	hostname: process.env['HOST'] || 'localhost',

	port: process.env['PORT'] || 8000,
	database: {
		url: process.env['GRAPHENEDB_URL']
			|| 'http://neo4j:password@localhost:7474'
	},

	session: {
		secret: process.env['SECRET'] || 'secret'
	},

	timeout: {
		exit: 5000
	},

	constant: {

		EXIT_OK: 0,
		EXIT_DB: 1,
		EXIT_HTTP: 2,
		EXIT_SOCKET: 3,
		EXIT_SWARM: 4,
		EXIT_TIMEOUT: 5,
		EXIT_ERROR: 6,
		EXIT_NEO4J: 7

	}

};
