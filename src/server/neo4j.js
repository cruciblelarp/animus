/* globals require, module */

import query from 'cypher-query';
import neo4j from 'neo4j-simple';

import config from './config.js';
import exit from './exit.js';

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
