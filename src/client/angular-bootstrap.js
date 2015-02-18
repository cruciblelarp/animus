define([

	'angular',

	'angular-module',

	'admin/admin-config',
	'admin_abilities/admin-ability-config',
	'admin_characters/admin-character-config'

], function(ng, _animus) {

	ng.bootstrap(document, [ _animus ]);

});
