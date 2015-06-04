define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-user-service'

], function(_, ng, _animus, _user) {
	var COMPONENT_NAME = 'accountDetailsController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _user,
		function($scope, $user) {

			var user = $scope.user = $user.getUser();

			$scope.details = _.extend({}, {
				token: user.token
			});

		}
	]);

	return COMPONENT_NAME;
});
