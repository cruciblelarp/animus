/* globals require, module */

import neo4j from 'neo4j-simple';

import config from './config.js';
import exit from './exit.js';

let connection = null;

/**
 * @returns {Promise} A neo4j database connection.
 */
export function connect() {
	return new Promise((resolve, reject) => {
		try {

			if (!connection) {
				connection = neo4j(config.database.url, {
					idName: 'id'
				});
			}

			return resolve(connection);

		} catch (error) {
			return reject(error);
		}
	});
}

export default function query(query, params) {
	return connect().then((db) => {
		return db.query(query, params);
	});
}

exit(function(resolve) {

	if (!connection) {
		console.log('Neo4j client has not been initialised.');
		return resolve(config.constant.EXIT_OK);
	}

});
