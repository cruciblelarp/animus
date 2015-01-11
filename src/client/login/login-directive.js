define([
	'angular-config',
	'login/login-controller',
	'text!login/login-template.html',
	'css!login/login-style.css'
], function (module, controller, template) {
	module.directive('loginPanel', function() {

		return {
			restrict: 'A',
			template: template,
			controller: controller
		};

	});
});
