define([

	'angular',

	'angular-module',

	'admin/admin-config',
	'admin/abilities/admin-abilities-config',
	'admin/abilities/detail/admin-abilities-detail-config',
	'admin/characters/admin-characters-config',
	'admin/characters/detail/admin-characters-detail-config'

], function(ng, _animus) {

	ng.bootstrap(document, [ _animus ]);

});
