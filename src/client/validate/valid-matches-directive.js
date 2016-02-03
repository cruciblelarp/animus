define([

	'underscore',
	'angular',

	'angular-module',
	'utils/util-service'

], function(_, ng, _animus, _util) {
	var COMPONENT_NAME = 'validMatches';

	ng.module(_animus).directive(COMPONENT_NAME, [
		_util,
		function($util) {

			function validate($scope, expression, invert, value) {

				var target = $util.$get($scope, expression);
				return invert
					? value !== target
					: value === target;

			}

			return {
				restrict: 'A',
				require: 'ngModel',
				link: function($scope, $element, attributes, control) {
					var expression;
					var invert;

					attributes.$observe('validMatches', function(value) {
						invert = _.str.startsWith(value, '!');
						expression = _.str.ltrim(value, '!');
					});

					control.$parsers.push(function(value) {

						// Validate the control and update it
						var valid = validate($scope, expression, invert, value);
						control.$setValidity('matches', valid);

						return value;

					});

				}
			};

		}
	]);

	return COMPONENT_NAME;
});
