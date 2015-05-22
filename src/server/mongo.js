/* globals require, module */

var mongodb = require('mongodb');
var assert = require('assert');
var Promise = require('promise');

var config = require('./config');

var client = null;

function getConnection() {

	if (client) {
		return client;
	}

	mongodb.MongoClient.connect(config.mongo.uri, function(err, db) {
		assert.equal(null, err);
		client = db;
	});

}

module.exports = {

	get: function(collection, query) {
		return new Promise(function(resolve, reject) {
			getConnection().collection(collection).find(query).toObject(function(err, item) {
				return err
					? reject(err)
					: resolve(item);
			});
		});
	},

	list: function(collection, query) {
		return new Promise(function(resolve, reject) {
			getConnection().collection(collection).find(query).toArray(function(err, list) {
				return err
					? reject(err)
					: resolve(list);
			});
		});
	}

};
