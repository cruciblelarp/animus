define([
	'angular',
	'text!login/login-template.html',
	'angular-module',
	'login/login-controller.js'
], function(ng, template) {

	ng.module('animus').directive('panelLogin', function() {

		return {
			restrict: 'A',
			template: template,
			controller: 'loginCtrl'
		};

	});

});
