define([
	'angular-module',
	'login/login-controller',
	'text!login/login-template.html'
], function(animus, controller, template) {

	animus.directive('panelLogin', function() {

		return {
			restrict: 'A',
			replace: true,
			controller: controller,
			template: template
		};

	});

});
