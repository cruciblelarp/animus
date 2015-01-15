define([
	'underscore',
	'angular-module',
	'swarm/swarm-service'
], function(_, animus) {

	return animus.controller('newsCtrl', [
		'$scope',
		'$swarm',
		function($scope, $swarm) {

			_.extend($scope, {

				stories: [
					{
						content: 'This is a news story brief that rambles on a bit. (1)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (2)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (3)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (4)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (5)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (6)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (7)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (8)'
					},
					{
						content: 'This is a news story brief that rambles on a bit. (9)'
					}
				]

			});

		}
	]);

});
