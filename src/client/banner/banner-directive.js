var app = require('../angular-module.js');
var template = require('./banner-template.html');

module.exports = app.directive('banner', function () {

	return {
		restrict: 'A',
		template: template
	};

});
