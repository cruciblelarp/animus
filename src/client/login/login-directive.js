var app = require('../angular-module.js');
var template = require('./login-template.html');
var controller = require('./login-controller.js');

module.exports = app.directive('loginPanel', function() {

	return {
		restrict: 'A',
		template: template,
		controller: controller
	};

});
