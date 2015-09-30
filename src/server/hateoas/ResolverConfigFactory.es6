export default class ResolverConfigFactory {

	/**
	 *
	 * @param {String} extension
	 * @param {Function} factory
	 */
	constructor(extension, factory) {
		this.extension = extension;
		this.factory = factory;
	}

}
