/* globals require, module */

var _ = require('underscore');

var query = require('../neo4j');
var model = require('../model');
var socket = require('../socket');

socket.use(function(socket, next) {

	var data = model(socket.handshake.session);

	data.on('user.roles', function(roles) {

		if (!roles) {
			return;
		}

		query('OPTIONAL MATCH (n) - [r:Requires] -> (p:Permission) WHERE p.name IN {roles} XOR r = NULL RETURN n;', {
			roles: roles
		}).then(function(results) {

			model.items = _.collect(results, function(result) {
				return _.extend({}, result.n.properties, {
					id: result.n._id
				});
			});

		}).done();

	});

	data.on('items', function(items) {

		socket.emit('sync', {
			type: 'replace',
			key: 'items',
			value: items
		});

	});

	return next;
});


