/* globals require, module */

var http = require('http');

import app from './express.es6';
import exit from './exit.es6';
import config from './config.es6';

var Server = http.Server;

// create and start the HTTP server with static file serving.
let server = new Server(app);

export default server;

exit(function(resolve) {

	if (!server) {
		console.log('Http server has not been created.');
		return resolve(config.constant.EXIT_OK);
	}

	try {
		server.close();
		return resolve(config.constant.EXIT_OK);
	} catch (error) {
		console.error(error);
		resolve(config.constant.EXIT_HTTP);
	}

});
