/* globals require, module */

var mongodb = require('promised-mongo');

var config = require('./config');
var exit = require('./exit');

var connection = null;

function getConnection() {

	if (connection) {
		return connection;
	}

	connection = mongodb(config.mongo.uri, [
		'user',
		'character',
		'resource',
		'password'
	]);

	connection.runCommand({
		ping: 1
	}).catch(function(error) {
		connection = null;
		throw error;
	});

	return connection;

}

module.exports = getConnection;

exit.listen(function(resolve) {

	if (!connection) {
		console.log('Mongo client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

	return connection.close(true, function(error) {
		return error
			? resolve(config.constant.EXIT_MONGO)
			: resolve(config.constant.EXIT_OK);
	});

});
