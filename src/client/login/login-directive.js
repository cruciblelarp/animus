define([

	'angular',
	'text!login/login-template.html',

	'angular-module',
	'login/login-controller'

], function(ng, template, _animus, _controller) {
	var COMPONENT_NAME = 'panelLogin';

	ng.module(_animus).directive(COMPONENT_NAME, function() {

		return {
			restrict: 'A',
			replace: true,
			controller: _controller,
			template: template,
			scope: true
		};

	});

	return COMPONENT_NAME;
});
