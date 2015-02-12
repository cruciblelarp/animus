define([

	'underscore',
	'angular',

	'angular-config'

], function(_, ng, _animus) {
	var COMPONENT_NAME = '$alert';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$log', '$timeout', '$parse',
		function($rootScope, $log, $timeout, $parse) {

			var $service = {

				// "Constant" expressions.
				TYPE_ERROR: 'error',
				TYPE_WARN: 'warn',
				TYPE_INFO: 'info',
				TYPE_GOOD: 'good',
				KEY_ALERTS: 'alerts',
				KEY_FLASH: 'flash_alerts',
				KEY_CONTENT: 'contentKey',
				KEY_CLASS: 'classes'

			};

			var STORE_FLASH = $parse('session.' + $service.KEY_FLASH);
			var STORE_ALERTS = $parse('session.' + $service.KEY_ALERTS);

			function alertSpecific(type) {
				return function(options) {
					return $service.display(_.extend(options, {
						type: type
					}));
				}
			}

			_.extend($service, {

				/**
				 * The core function of this service, 'display' constructs an alert object and stores it in the session for
				 * display, one way or another. The only parameter is an options hash that can contain the following keys:
				 * <ul>
				 *     <li><b>type -</b> Used to determine what css classes are added to the alert. The only valid options
				 *     are 'error', 'warn', 'info' and 'good'. The default is 'info'. All of these are exposed on the
				 *     service as "static" variables: <code>_alert.TYPE_ERROR</code>, <code>_alert.TYPE_WARN</code>,
				 *     etc. Defaults to 'info'.</li>
				 *     <li><b>context -</b> Used to provide context to content resolution. See the <code>_content</code>
				 *     service for more information on how that works. Defaults to an empty map.</li>
				 *     <li><b>flash -</b> When set to true, the alert is not displayed immediately. The alert will only
				 *     appear on the screen once a page transition occurs. This is especially useful for displaying a
				 *     message to provide context for a redirect. Defaults to false.</li>
				 *     <li><b>title -</b> The title of the alert. If set to a content code, it will be resolved
				 *     appropriately. No default.</li>
				 *     <li><b>body -</b> As with *title*, but basic formatting html is allowed. No default.</li>
				 *     <li><b>link -</b> If provided, the content either directly provided, or available from the content
				 *     service will be set as the link target for a small footer section on the alert. The text simply
				 *     says 'Click here for more information', where the 'here' is the hyperlink. No default.</li>
				 *     <li><b>contentKey -</b> This does everything the *title*, *body* and *link* properties do, but in
				 *     one motion. Only useful if you've entered in the expected content into the content service, but once
				 *     that is done, you only need to provide one key. If the key 'alert.test' is provided, the title,
				 *     body, and link will be populated by 'alert.text.title', 'alert.test.body, and 'alert.test.link',
				 *     respectively. No default.</li>
				 *     <li><b>timeout -</b> Causes the alert to be removed after the defined amount of milliseconds has
				 *     elapsed. If not defined, the user will need to dismiss the alert manually, or navigate to another
				 *     page. No default.</li>
				 *     <li><b>classes -</b> Adds the specified classes to the alert element when displayed. Data type is
				 *     array. Defaults to an empty array.</li>
				 * </ul>
				 * @param {Object} options
				 */
				display: function(options) {

					var alert = {
						id: new Date().getUTCDate(),
						type: options.type || $service.TYPE_INFO,
						context: options.context || {},
						flash: _.isBoolean(options.flash)
							? options.flash
							: false,
						classes: _.isArray(options[$service.KEY_CLASS])
							? options[$service.KEY_CLASS]
							: [],
						title: options.title,
						body: options.body,
						link: options.link
					};

					var store = alert.flash ? $service.KEY_FLASH : $service.KEY_ALERTS;
					$parse('session.' + store + '.' + alert.id).assign($rootScope, alert);

					if (options.timeout) {
						$timeout(function() {
							$service.remove(alert);
						}, options.timeout);
					}

				},

				error: alertSpecific($service.TYPE_ERROR),
				warn: alertSpecific($service.TYPE_WARN),
				info: alertSpecific($service.TYPE_INFO),
				good: alertSpecific($service.TYPE_GOOD),

				remove: function(alert) {
					$log.debug('Deleting alert with id: ' + alert.id);
					var alerts = STORE_ALERTS($rootScope);
					if (alerts) {
						delete alerts[alert.id];
					}
				},

				commit: function() {
					$log.debug('Turning flash messages into alerts.');
					var flash = STORE_FLASH($rootScope) || {};
					STORE_ALERTS.assign($rootScope, flash);
					STORE_FLASH.assign($rootScope, {});
				},

				clear: function() {
					$log.debug('Clearing all visible alerts...');
					STORE_ALERTS.assign($rootScope, {});
				}

			});

			$rootScope.$on('$stateChangeSuccess', $service.commit);

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
