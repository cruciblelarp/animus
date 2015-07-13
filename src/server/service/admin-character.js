/* globals require, module */

var query = require('../neo4j');

var cipher_list = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN node;';

var cipher_create = '';

var cipher_read = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {charId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)';

var cipher_update = '';

var cipher_delete = '';

/**
 * A service for providing operations for character admin.
 * @type {{list: Function, create: Function, read: Function, update: Function, delete: Function}}
 */
module.exports = {

	/**
	 * Lists all of the characters in the database.
	 * @return {Promise} Resolves to a list of Character items.
	 */
	list: function() {
		return query(cipher_list, {
			userId: request.session.userId

		}).then(function(results) {

			var items = _.collect(results, function(result) {
				return _.extend({}, result.node.properties, {
					id: result.node._id,
					labels: result.node.labels
				});
			});

			return Promise.resolve(items);

		});
	},

	/**
	 * Create a new Character object with the needed properties and links.
	 * @param {Object} character The character object.
	 * @return {Promise} Resolves to the created entity.
	 */
	create: function(character) {
		return query(cipher_create, {
			char: character
		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				return Promise.reject(new Error('Illegal state: CREATE query not returning inserted object.'));
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		});
	},

	read: function(id) {
		return query(cipher_read, {
			charId: id
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

		});
	},

	update: function(id, character) {
		return query(cipher_update, {
			charId: id,
			char: character
		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				return Promise.reject(new Error('Illegal state: UPDATE query not returning inserted object.'));
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		});
	},

	delete: function(id) {
		return query(cipher_delete, {
			charId: id
		}).then(function(results) {

			var result = _.first(results);
			if (!result) {
				return Promise.reject(new Error('Illegal state: DELETE query not returning inserted object.'));
			}

			var character = _.extend({}, result.node.properties, {
				id: result.node._id,
				labels: result.node.labels
			});

			return Promise.resolve(character);

		});
	}

};
