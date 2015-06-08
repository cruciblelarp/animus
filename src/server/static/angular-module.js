define([

	'angular',

	'ui-router',
	'angulartics',
	'angulartics-google',
	'ng-storage'

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
