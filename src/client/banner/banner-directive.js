var app = require('angular-module');

module.exports = app.directive('banner', function () {

	return {
		restrict: 'A',
		template: require('banner/banner-template.html')
	};

});
