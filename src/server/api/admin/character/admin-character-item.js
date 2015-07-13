/* globals module, require */

var tools = require('../../tools');
var service = require('../../../service/admin-character');

module.exports = tools.path('/api/admin/characters/:id', {

	get: function(request, response) {
		return service.read(request.id).done(function(data) {

			return response.send(200, data);

		}, tools.handleError(response));
	},

	put: function(request, response) {
		return service.update(request.id, request.body).done(function(data) {

			return response.send(200, data);

		}, tools.handleError(response));
	},

	delete: function(request, response) {
		return service.delete(request.id).done(function(data) {

			return response.send(200, data);

		}, tools.handleError(response));
	}

});
