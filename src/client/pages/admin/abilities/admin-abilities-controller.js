define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service',

	//'data/abilities-data'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'adminAbilitiesController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _swarm,
		function($scope, $swarm) {

			//$scope.abilities = $swarm.watch('abilities');

			$scope.abilities = [

				{
					_id: 1,
					"name": "Finesse 1",
					"cost": 0
				},

				{
					_id: 2,
					"name": "Finesse 2",
					"cost": 5,
					"prerequisites": [
						"Finesse 1"
					]
				},

				{
					_id: 3,
					"name": "Finesse 3",
					"cost": 5,
					"prerequisites": [
						"Finesse 2"
					]
				},

				{
					_id: 4,
					"name": "Weaponry",
					"cost": 0,
					"degree": "novice",
					"description": "Use of any melee weapon. Each strike deals 1 point of damage."
				},

				{
					_id: 5,
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
					_id: 6,
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
					_id: 7,
					"name": "Ghoul",
					"cost": 0,
					"description": "Secret",
					"shadow": true,
					"tags": [
						"template"
					]
				}

			];

		}
	]);

	return COMPONENT_NAME;
});
