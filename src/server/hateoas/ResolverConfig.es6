export default class ResolverConfig {

	/**
	 * Details on a particular resource invocation resolver.
	 * @param {String} method The HTTP method for the request.
	 * @param {String} content The mime type pattern to match requests against.
	 * @param {Function} validator A suit validator function.
	 * @param {Function} resolver A resolver function.
	 */
	constructor(method, content, validator, resolver) {
		this.method = method;
		this.content = content;
		this.validator = validator;
		this.resolver = resolver;
	}

}
