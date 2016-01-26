/* global JSON */
'use strict';

import * as suit from 'suit';

import resource from './api-characters-_id-resource.js';
import neo4j from '../../../neo4j.es6';

export const query = 'MATCH c:Character WHERE id(c) = :charId';

const operation = resource.DELETE().as('json');

operation.validator = (data) => {
	return suit.fit(data, (c) => {
		return {

			charId: [
				c.required(),
				c.integer()
			]

		};
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
