import { registerResolverConfigFactory } from '../scanner.es6';
import ResolverConfig from '../ResolverConfig.es6';
import ResolverConfigFactory from '../ResolverConfigFactory.es6';

let _ = require('underscore');
let jade = require('jade');

export default registerResolverConfigFactory(new ResolverConfigFactory('jade', function(file) {
	return new ResolverConfig('GET', '*/html', null, function(data, session, resolve, reject) {

		let scope = _.extend({}, session, data);

		jade.renderFile(file, scope, function(error, html) {

			if (error) {
				reject(error);

			} else {
				resolve(html);
			}

		});

	});
}));
