/* globals module, require */

var tools = require('../../tools');
var service = require('../../../service/admin-character');

module.exports = tools.path('/api/admin/characters', {

	get: function(request, response) {
		return service.list(request.query).done(function(data) {

			return response.send(200, data);

		}, tools.handleError(response));
	},

	post: function(request, response) {
		return service.create(request.body).done(function(data) {

			return response.send(200, data);

		}, tools.handleError(response));
	}

});
