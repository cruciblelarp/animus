define([

	'underscore',
	'angular',

	'angular-module'

], function(_, ng, _animus) {
	var COMPONENT_NAME = 'adminCharactersController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		function($scope) {

			$scope.characters = [

				{
					_id: 1,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 2,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 3,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 4,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 5,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 6,
					"name": "Ghoul",
					"background": "Secret"
				},

				{
					_id: 7,
					"name": "Ghoul",
					"background": "Secret"
				}

			];

		}
	]);

	return COMPONENT_NAME;
});
