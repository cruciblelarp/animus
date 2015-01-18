define([

	'angular',
	'text!layout/layout-template.html',

	'angular-module'

], function(ng, template, _animus) {
	var COMPONENT_NAME = 'wrapLayout';

	ng.module(_animus).directive(COMPONENT_NAME, function() {
		return {
			restrict: 'A',
			transclude: true,
			template: template
		}
	});

	return COMPONENT_NAME;
});
