/* globals require, module, console */

var _ = require('underscore');

var query = require('../neo4j');
var socket = require('../socket');

socket.$react(function(model, socket) {

	model.on('user', function(user) {

		if (!user) {
			return;
		}

		query('MATCH (node:Entity),(user:User)' +
			' WHERE id(user) = {userId}' +
			' AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
			' XOR NOT (node) - [:Requires] -> (:Permission)' +
			' RETURN node;', {
			userId: user.id
		}).then(function(results) {

			model.entities = _.collect(results, function(result) {
				return _.extend({}, result.node.properties, {
					id: result.node._id,
					labels: result.node.labels
				});
			});

		}).done();

	});

	model.on('entities', function(entities) {
		console.log(socket.handshake.session.id + ': sending entity list.');
		socket.emit('sync', {
			updates: [{
				type: 'replace',
				key: 'entities',
				value: entities
			}]
		});
	});

});


