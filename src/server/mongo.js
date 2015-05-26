/* globals require, module */

var mongodb = require('mongodb-promise');
var Promise = require('promise');

var config = require('./config');
var exit = require('./exit');

var MongoClient = mongodb.MongoClient;

var connection = null;

module.exports = function() {

	if (connection) {
		return connection;
	}

	return connection = MongoClient.connect(config.mongo.uri).catch(function(err) {
		connection = null;
		return Promise.reject(error);
	});

};

exit.listen(function(resolve) {

	if (!connection) {
		console.log('Mongo client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

	return connection.close().then(function() {
		return Promise.resolve(config.constant.EXIT_OK);
	}).catch(function(error) {
		console.log(error);
		return Promise.resolve(config.constant.EXIT_MONGO);
	});

});
