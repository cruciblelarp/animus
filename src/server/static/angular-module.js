define([

	'angular',

	'ui-router',
	'angulartics',
	'angulartics-google'

], function(ng) {
	var COMPONENT_NAME = 'animus';

	ng.module(COMPONENT_NAME, [
		'ui.router',
		'angulartics',
		'angulartics.google.analytics'
	]);

	return COMPONENT_NAME;
});
