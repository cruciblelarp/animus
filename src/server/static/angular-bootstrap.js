define([

	'angular',

	'angular-module',

	'layout/layout-directive',
	'pages/config',
	'pages/login/login-config',
	'pages/admin/admin-config',
	'pages/admin/abilities/admin-abilities-config',
	'pages/admin/abilities/detail/admin-abilities-detail-config',
	'pages/admin/characters/admin-characters-config',
	'pages/admin/characters/detail/admin-characters-detail-config'

], function(ng, _animus) {

	ng.bootstrap(document, [ _animus ]);

});
