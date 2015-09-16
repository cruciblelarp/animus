import { registerResolverConfigFactory } from '../scanner.es6';
import ResolverConfig from '../ResolverConfig.es6';
import ResolverConfigFactory from '../ResolverConfigFactory.es6';

let factory = new ResolverConfigFactory('jade', function(file) {
	return new ResolverConfig('GET', '*/jade', null, function(data, session, resolve, reject) {
		//
	});
});


registerResolverConfigFactory(factory);
export default factory;
