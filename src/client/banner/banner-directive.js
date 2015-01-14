var ng = require('angular');
var template = require('./banner-template.html');

require('../angular-module.js');

angular.module('animus').directive('banner', function () {

	return {
		restrict: 'A',
		template: template
	};

});

