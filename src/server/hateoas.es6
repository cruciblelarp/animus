/* globals require, module, __dirname */

import scan from './hateoas/scanner.es6';
import './hateoas/resolvers/es6ActionResolverFactory.es6';
import './hateoas/resolvers/es6StaticResolverFactory.es6';
import './hateoas/resolvers/jadeHtmlRenderingResolverFactory.es6';
import './hateoas/resolvers/jadeStaticResolverFactory.es6';
import './hateoas/resolvers/scssCssRenderingResolverFactory.es6';
import './hateoas/resolvers/scssStaticResolverFactory.es6';

let _ = require('underscore');
let paths = require('path');

export let mime = {
	jade: 'application/jade',
	html: 'text/html',
	js: 'application/javascript',
	json: 'application/json',
	css: 'text/css',
	less: 'application/less',
	scss: 'application/sass'
};

