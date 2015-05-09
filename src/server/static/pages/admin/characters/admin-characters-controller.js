define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service'

	//'data/characters-data'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'adminCharactersController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _swarm,
		function($scope, $swarm) {

			//$scope.characters = $swarm.watch('characters');

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
