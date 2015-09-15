export default class ResolverFactoryConfig {

	/**
	 *
	 * @param {String} extension
	 * @param {Function} factory
	 */
	constructor(extension, factory) {
		this.extension = extension;
		this.factory = factory;
	}

	extension;

	factory;

}
