define([
    'angular-config',
    'text!banner/banner-template.html',
    'css!banner/banner-style.css'
], function(module, template) {
    return module.directive('banner', function() {

        return {
            restrict: 'A',
            template: template
        };

    });
});