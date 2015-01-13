var app = require('angular-module');
var template = require('login/login-template.html');
var controller = require('login/login-controller');

module.exports = app.directive('loginPanel', function() {

	return {
		restrict: 'A',
		template: template,
		controller: controller
	};

});
