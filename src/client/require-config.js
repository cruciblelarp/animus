require.config({
    
    paths: {
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min',
        'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'css': 'https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css.min'
    },

    shim: {

        'angular': {
            exports: 'angular'
        }

    },

    deps: [
        'banner/banner-directive.js'
    ]

});