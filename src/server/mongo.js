/* globals require, module */

var mongodb = require('promised-mongo');
var Promise = require('promise');

var config = require('./config');
var exit = require('./exit');

var connection = null;

function withConn() {

	if (connection) {
		return connection;
	}

	return connection = new Promise(function(resolve, reject) {

		var db = mongodb(config.mongo.uri, [
			'user',
			'character',
			'resource',
			'password'
		]);

		return db.runCommand({
			ping: 1
		}).then(function() {
			return resolve(db);
		}).catch(function(error) {
			connection = null;
			return reject(error);
		});

	});

}

module.exports = withConn;

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
