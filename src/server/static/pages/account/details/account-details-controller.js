define([

	'underscore',
	'angular',

	'angular-module'

], function(_, ng, _animus, _user) {
	var COMPONENT_NAME = 'accountDetailsController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _user,
		function($scope, $user) {

			function copy() {
				var user = $scope.original = $user.getUser();
				$scope.user = _.extend({}, {
					email: user.email,
					name: user.name,
					token: user.token,
					_id: user._id,
					userId: user.userId
				});
			}

			$scope.reset = function($event) {
				$event.preventDefault();
				copy();
			};

			$scope.submit = function($event) {
				$event.preventDefault();
				var user = $user.getUser();
				user.set($scope.user);
			};

			$scope.$on('$stateChangeSuccess', function(event, newState) {
				if (newState.name === 'account-details') {
					copy();
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
