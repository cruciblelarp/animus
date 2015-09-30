import ResolverConfig from './ResolverConfig.es6';

export default class ManifestConfig extends ResolverConfig {

	/**
	 * Creates a ManifestConfig instance from an existing ResolverConfig and the file it is defined in (or refers to).
	 * @param {ResolverConfig} resolver The ResolverConfig instance that this manifest entry should be based off.
	 * @param file The files that the ResolverConfig is defined in or refers to.
	 */
	constructor(resolver, file) {
		super(resolver.method, resolver.content, resolver.validator, resolver.resolver);
		this.file = file;
		this.type = file.slice(file.lastIndexOf('.') + 1);
	}

}
