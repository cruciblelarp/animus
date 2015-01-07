define([
		'underscore'
], function(_) {
	return [
		'$scope',
		function($scope) {

			_.extend($scope, {

				username: 'bob',
				password: 'joe',

				login: function ($event) {
					$event.preventDefault();
				}

			});

		}	
	];
});
