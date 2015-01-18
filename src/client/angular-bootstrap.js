define([

	'angular',

	'angular-module',

	'banner/banner-directive',
	'character/character-directive',
	'layout/layout-directive',
	'login/login-directive',
	'news/news-directive'

], function(ng, _animus) {

	ng.bootstrap(document, [ _animus ]);

});
