var ng = require('angular');
var template = require('./login-template.html');

require('../angular-module.js');
require('./login-controller.js');

angular.module('animus').directive('loginPanel', function() {

	return {
		restrict: 'A',
		template: template,
		controller: 'loginController'
	};

});

