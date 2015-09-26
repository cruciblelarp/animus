import { registerResolverConfigFactory } from '../scanner.es6';
import ResolverConfig from '../ResolverConfig.es6';
import ResolverConfigFactory from '../ResolverConfigFactory.es6';

export default registerResolverConfigFactory(new ResolverConfigFactory('es6', function(file) {
	return require(file);
}));
