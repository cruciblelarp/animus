define([

	'underscore',
	'angular',

	'angular-module',
	'network/provider-path',

	'ui-router'

], function(_, ng, _animus, _path) {
	var COMPONENT_NAME = '$routing';

	ng.module(_animus).provider(COMPONENT_NAME, [
		_path + 'Provider', '$stateProvider', '$urlRouterProvider',
		function(_pathProvider, $stateProvider, $urlRouterProvider) {

			var redirects = {};

			function stateName(state) {
				return state.name
					? state.name
					: state;
			}

			return $provider = {

				otherwise: $urlRouterProvider.otherwise,

				path: _pathProvider.url,

				states: function(stateMap) {

					var defaultRedirect = stateMap._;
					if (defaultRedirect) {
						$provider.otherwise(defaultRedirect);
						delete stateMap._;
					}

					_.each(stateMap, function(stateConfig, stateName) {
						$provider.state(stateName, stateConfig);
					});

				},

				state: function(stateName, stateConfig) {

					if (stateConfig.children) {
						_.each(stateConfig.children, function(childConfig, childName) {

							var fullChildName = childName.indexOf(stateName) !== 0
									? stateName + '.' + childName
									: childName;

							$provider.state(fullChildName, _.extend(childConfig, {
								parent: stateName
							}));

						});

						delete stateConfig.children;
					}

					if (stateConfig.redirect) {
						$provider.redirect(stateName, stateConfig.redirect);
						stateConfig.abstract = false;
						delete stateConfig.redirect;
					}

					if (!_.isUndefined(stateConfig.rolesRequired)) {
						var data = stateConfig.data || (stateConfig.data = {});
						data.rolesRequired = stateConfig.rolesRequired;
						delete stateConfig.rolesRequired;
					}

					if (stateConfig.templateUrl && stateConfig.templateUrl.indexOf('/') === 0) {
						stateConfig.templateUrl = $provider.path(stateConfig.templateUrl);
					}

					$stateProvider.state(stateName, stateConfig);

				},

				redirect: function(fromState, toState) {
					redirects[stateName(fromState)] = stateName(toState);
				},

				$get: [
					'$rootScope', '$state', _path,
					function($rootScope, $state, _path) {

						$rootScope.$on('$stateChangeStart', function($event, state) {
							var redirect = redirects[state.name];
							if (redirect) {
								$event.preventDefault();
								$state.go(redirect);
							}
						});

						return $service = {

							go: _.bind($state.go, $state),

							path: _path.url

						};

					}
				]

			};

		}
	]);

	return COMPONENT_NAME;
});
