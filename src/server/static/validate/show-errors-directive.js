define([

	'underscore',
	'angular',

	'angular-module',
	'validate/show-errors-provider'

], function(_, ng, _animus, _showErrorsConfig) {
	var COMPONENT_NAME = 'showErrors';

	ng.module(_animus).directive(COMPONENT_NAME, [
		'$timeout', _showErrorsConfig,
		function ($timeout, $showErrorsConfig) {

			function query($element, query) {

				var unwrapped = $element && $element[0];
				if (!unwrapped) {
					return null;
				}

				var result = unwrapped.querySelector(query);
				return angular.element(result);

			}

			function isSuccessVisible(options) {

				return options && _.isBoolean(options.showSuccess)
					? options.showSuccess
					: $showErrorsConfig.showSuccess;

			}

			function updateClasses(control, $element, options) {

				var error = control && control._touched
					? control.$invalid
					: null;

				$element.toggleClass('has-error', error === true);
				if (isSuccessVisible(options)) {
					$element.toggleClass('has-success', error === false);
				}

			}

			function revalidate(control) {

				var validators = _.union(control.$formatters, control.$parsers);
				var value = _.reduce(validators, function(value, validator) {
					return validator(value);
				}, control.$viewValue);

				control._errors = _.clone(control.$error);

				return value;

			}

			return {
				restrict: 'A',
				require: '^form',
				compile: function ($element) {

					if (!$element.hasClass('form-group')) {
						throw 'show-errors element does not have the \'form-group\' class';
					}

					var target = query($element, '[name]');
					var inputName = target.attr('name');

					if (!inputName) {
						throw 'show-errors element has no child input elements with a \'name\' attribute';
					}

					return function($scope, $element, attrs, formCtrl) {

						var options = $scope.$eval(attrs['showErrors']);

						target.bind('blur', function() {
							formCtrl[inputName]._touched = true;
							$scope.$broadcast('show-errors-validate');
						});

						$scope.$on('show-errors-validate', function() {

							var control = formCtrl[inputName];
							if (control._touched) {
								var value = revalidate(control);
								control.$setViewValue(value);
								$scope.$apply();
							}

							updateClasses(control, $element, options);

						});

					}

				}
			};

		}
	]);

	return COMPONENT_NAME;
});
