/* globals require, module */

var _ = require('underscore');

var query = require('../neo4j');
var socket = require('../socket');

socket.$react(function(model, socket) {

	model.on('user', function(user) {

		if (!user) {
			return;
		}

		query('MATCH (n),(u:User)' +
			' WHERE id(u) = {userId}' +
			' AND (n) - [:Requires] -> (:Permission) <- [:Possesses] - (u)' +
			' XOR NOT (n) - [:Requires] -> (:Permission)' +
			' RETURN n;', {
			userId: user.id
		}).then(function(results) {

			model.entities = _.collect(results, function(result) {
				return _.extend({}, result.n.properties, {
					id: result.n._id,
					labels: result.n.labels
				});
			});

		}).done();

	});

	model.on('entities', function(entities) {
		socket.emit('sync', {
			updates: [{
				type: 'replace',
				key: 'entities',
				value: entities
			}]
		});
	});

});


