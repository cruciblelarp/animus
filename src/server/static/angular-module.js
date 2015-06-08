define([

	'angular',

	'ui-router',
	'angulartics',
	'angulartics-google',
	'ngStorage'

], function(ng) {
	var COMPONENT_NAME = 'animus';

	ng.module(COMPONENT_NAME, [
		'ui.router',
		'angulartics',
		'angulartics.google.analytics',
		'ngStorage'
	]);

	return COMPONENT_NAME;
});
