/* globals require, module */

var neo4j = require('neo4j');
var Promise = require('promise');

var config = require('./config');
var exit = require('./exit');

var connection = null;

function load() {
	
	if (!connection) {
		connection = new neo4j.GraphDatabase(config.data.uri);
	}

	return connection;

}

module.exports = function(query, params) {
	return new Promise(function(resolve, reject) {
		load().cypher({
			query: query,
			params: params
		}, function(error, results) {
			error
				? reject(error)
				: resolve(results);
		});
	});
};

exit.listen(function(resolve) {

	if (!connection) {
		console.log('Neo4j client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

	return connection.close().then(function() {
		return Promise.resolve(config.constant.EXIT_OK);
	}).catch(function(error) {
		console.log(error);
		return Promise.resolve(config.constant.EXIT_NEO4J);
	});

});
