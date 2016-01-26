/* globals require, module */

import query from 'cypher-query';
import neo4j from 'neo4j-simple';

import config from './config.es6';
import exit from './exit.es6';

let connection = null;

export default function () {

	if (!connection) {
		connection = neo4j(config.database.url, {
			idName: 'id'
		});
	}

	return connection;

}

exit(function(resolve) {

	if (!connection) {
		console.log('Neo4j client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

});
