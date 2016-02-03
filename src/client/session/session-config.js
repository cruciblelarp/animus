define([

	'underscore',
	'angular',

	'angular-module',

	'utils/util-service'

], function(_, ng, _animus) {

	ng.module(_animus).run([
		'$rootScope', '$sessionStorage',
		function($rootScope, $sessionStorage) {

			$rootScope['session'] = $sessionStorage;

		}
	]);

});
