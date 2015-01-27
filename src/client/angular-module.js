define([

	'angular',
	'ui-router'

], function(ng) {
	var COMPONENT_NAME = 'animus';

	ng.module(COMPONENT_NAME, [
		'ui.router'
	]);

	return COMPONENT_NAME;
});
