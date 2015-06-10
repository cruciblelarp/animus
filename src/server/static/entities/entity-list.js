define([

	'angular',
	'text!entities/entity-list.html',

	'angular-module'

], function(ng, template, _animus) {
	var COMPONENT_NAME = 'entityList';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		return {
			restrict: 'A',
			replace: true,
			template: template
		};

	});

	return COMPONENT_NAME;
});
