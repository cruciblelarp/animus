define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service',

	//'data/abilities-data',

	'ui-router'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'adminAbilitiesController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _swarm, '$state', '$stateParams',
		function($scope, $swarm, $state, $stateParams) {

			//$scope.abilities = $swarm.watch('abilities');

			$scope.selection = null;

			$scope.abilities = [

				{
					_id: new Date().getTime(),
					"name": "Finesse 1",
					"cost": 0
				},

				{
					_id: new Date().getTime(),
					"name": "Finesse 2",
					"cost": 5,
					"prerequisites": [
						"Finesse 1"
					]
				},

				{
					_id: new Date().getTime(),
					"name": "Finesse 3",
					"cost": 5,
					"prerequisites": [
						"Finesse 2"
					]
				},

				{
					_id: new Date().getTime(),
					"name": "Weaponry",
					"cost": 0,
					"degree": "novice",
					"description": "Use of any melee weapon. Each strike deals 1 point of damage."
				},

				{
					_id: new Date().getTime(),
					"name": "Small Weapons, Adept",
					"cost": 3,
					"degree": "adept",
					"prerequisites": [
						"Weaponry",
						"Finesse 2"
					],
					"description": "Adept with Small Weapons (<50cm). BLEED 1/Encounter. This ability counts as a Weapon Skill",
					"tags": [
						"weapon"
					]
				},

				{
					_id: new Date().getTime(),
					"name": "Small Weapons, Expert",
					"cost": 3,
					"degree": "expert",
					"prerequisites": [
						"Small Weapons, Adept",
						"Finesse 3"
					],
					"description": "Expert with Small Weapons (<50cm). SLOW 1/Encounter. This ability counts as a Weapon Skill.",
					"tags": [
						"weapon"
					]
				},

				{
					_id: new Date().getTime(),
					"name": "Ghoul",
					"cost": 0,
					"description": "Secret",
					"shadow": true,
					"tags": [
						"template"
					]
				}

			];

			$scope.$on('$stateChangeSuccess', function() {
				if ($state.includes('admin.abilities.detail')) {
					$scope.selection = _.findWhere($scope.abilities, {
						_id: $stateParams.ability
					});
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
