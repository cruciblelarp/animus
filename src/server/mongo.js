/* globals require, module */

var mongodb = require('mongodb');
var Promise = require('promise');

var config = require('./config');
var exit = require('./exit');

var connection = null;

function getConnection() {

	if (connection) {
		return connection;
	}

	return connection = new Promise(function(resolve, reject) {

		mongodb.MongoClient.connect(config.mongo.uri, function(error, connection) {
			return error
				? reject(error)
				: resolve(connection);
		});

	});

}

function getCollection(name) {
	return getConnection().then(function(db) {
		return new Promise(function(resolve, reject) {
			try {
				resolve(db.collection(name));
			} catch(error) {
				reject(error);
			}
		});
	});
}

module.exports = {

	get: function(collectionName, query) {
		return getCollection(collectionName).then(function(collection) {
			return new Promise(function(resolve, reject) {
				collection.find(query).toObject(function(err, item) {
					return err
						? reject(err)
						: resolve(item);
				});
			});
		});
	},

	list: function(collectionName, query) {
		return getCollection(collectionName).then(function(collection) {
			return new Promise(function(resolve, reject) {
				collection.find(query).toArray(function(err, item) {
					return err
						? reject(err)
						: resolve(item);
				});
			});
		});
	}

};

exit.listen(function(resolve) {

	if (!connection) {
		console.log('Mongo client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

	return connection.then(function(conn) {
		conn.close(true, function(error) {
			return error
				? resolve(config.constant.EXIT_MONGO)
				: resolve(config.constant.EXIT_OK);
		});
	});

});
