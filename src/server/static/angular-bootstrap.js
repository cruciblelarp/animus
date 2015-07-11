define([

	'angular',

	'angular-module',

	'layout/layout-directive',
	'pages/config',
	'pages/login/login-config',
	'pages/account/account-page',
	'pages/admin/admin-page',
	'pages/admin/abilities/admin-abilities-config',
	'pages/admin/abilities/detail/admin-abilities-detail-config',
	'routing/routing-interceptor'

], function(ng, _animus) {

	ng.bootstrap(document, [ _animus ]);

});
