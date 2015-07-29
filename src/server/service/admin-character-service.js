/* globals require, module */

var _ = require('underscore');
var Promise = require('promise');

var query = require('../neo4j');
var wrapper = require('./wrapper');

var cipher_list = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN id(node);';

var cipher_create = '';

var cipher_read = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {charId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN node';

var cipher_update = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {charId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  UPDATE node.name = {name}' +
	'  RETURN node';

var cipher_delete = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {charId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  REMOVE node' +
	'  RETURN node';

/**
 * A service for providing operations for character admin.
 * @type {{list: Function, create: Function, read: Function, update: Function, delete: Function}}
 */
module.exports = {

	/**
	 * Lists all of the characters in the database.
	 * @return {Promise} Resolves to a list of Character ids.
	 */
	list: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {
		return query(cipher_list, {
			userId: session.user.id

		}).then(function(results) {

			var items = _.collect(results, function(result) {
				return result['id(node)'];
			});

			return Promise.resolve(items);

		}).then(resolve, reject);
	}),

	/**
	 * Create a new Character object with the needed properties and links.
	 * @param {Object} character The character object.
	 * @return {Promise} Resolves to the created entity.
	 */
	create: wrapper(function(c) {
		return {
			name: [ c.required, c.string ]
		};

	}, function(params, session, resolve, reject) {
		return query(cipher_create, {
			char: params

		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				throw new Error('Illegal state: CREATE query not returning inserted object.');
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		}).then(resolve, reject);
	}),

	read: wrapper(function(c) {
		return {
			id: [ c.required, c.integer ]
		};

	}, function(params, session, resolve, reject) {
		return query(cipher_read, {
			charId: params.id,
			userId: session.user.id

		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				return Promise.reject(404);
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		}).then(resolve, reject);
	}),

	update: wrapper(function(c) {
		return {
			id: [ c.required, c.integer ]
		};

	}, function(params, session, resolve, reject) {
		return query(cipher_update, {
			charId: params.id,
			char: params

		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				throw new Error('Illegal state: UPDATE query not returning inserted object.');
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		}).then(resolve, reject);
	}),

	delete: wrapper(function(c) {
		return {
			id: [ c.required, c.integer ]
		};

	}, function(params, session, resolve, reject) {
		return query(cipher_delete, {
			charId: params.id

		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				throw new Error('Illegal state: DELETE query not returning inserted object.');
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		}).then(resolve, reject);
	})

};
