/* globals require, module */

var _ = require('underscore');

var query = require('../neo4j');
var model = require('../model');
var socket = require('../socket');

socket.use(function(socket, next) {

	var data = model(socket.handshake.session);

	data.on('user.id', function(id) {

		if (!id) {
			return;
		}

		query('MATCH (n),(u:User)' +
			' WHERE id(u) = {userId}' +
			' AND (n) - [:Requires] -> (:Permission) <- [:Possesses] - (u)' +
			' XOR NOT (n) - [:Requires] -> (:Permission)' +
			' RETURN n;', {
			userId: id
		}).then(function(results) {

			data.items = _.collect(results, function(result) {
				return _.extend({}, result.n.properties, {
					id: result.n._id
				});
			});

		}).done();

	});

	data.on('items', function(items) {
		socket.emit('sync', {
			updates: [{
				type: 'replace',
				key: 'items',
				value: items
			}]
		});
	});

	return next();

});


