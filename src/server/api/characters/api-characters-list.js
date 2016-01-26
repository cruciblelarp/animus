/* global */
'use strict';

import * as suit from 'suit';

import resource from './api-characters-resource.js';
import neo4j from '../../neo4j.es6';

export const query = 'MATCH c:Character WHERE (c) <- [:plays] <- u:User AND (c) <- [:permission-read] <- u';

const operation = resource.GET().as('json');

operation.validator = (data) => {
	return suit.fit(data, (c) => {
		return {
		}
	});
};

operation.handler = (request, response, data) => {

	return neo4j(query, data).then((result) => {
		return response.status(200)
				.body(result); // not actually detailed enough.

	}).catch((error) => {
		return response.status(500)
				.body(JSON.stringify(error)); // not actually detailed enough.
	});

};
