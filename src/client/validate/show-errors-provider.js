define([

	'angular',

	'angular-module'

], function(ng, _animus) {
	var COMPONENT_NAME = 'showErrorsConfig';

	ng.module(_animus).provider(COMPONENT_NAME, [
		function() {

			var _showSuccess = false;

			return {

				showSuccess: function (showSuccess) {
					return _showSuccess = showSuccess;
				},

				$get: function () {
					return {
						showSuccess: _showSuccess
					};
				}

			}
		}
	]);

});
