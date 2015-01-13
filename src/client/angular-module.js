var angular = require('angular');

module.exports = angular.module('crucible', [
]);

// "Leaf" components
require('./banner/banner-directive.js');
require('./login/login-directive.js');
