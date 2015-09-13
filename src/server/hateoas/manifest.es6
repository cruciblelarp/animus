/* globals require */

import scanner from './scanner.es6';

let _ = require('underscore');

export let manifest = {
	children: {}
};

/**
 *
 * @param {Array|String} path The path to store the config under; if a string, will be converted to an array.
 * @param {Object} config The endpoint configuration to store.
 * @param {Object} [parent] Used internally with recursive search.
 */
export function store(path, config, parent) {

	if (_.isString(path)) {
		store(path.split('/'), config, parent);
		return;
	}

	if (parent.children) {
		store(path, config, parent.children);
		return;
	}

	let target = _.first(path);
	if (!target) {

		// Make sure the required method is available.
		if (!manifest[config.method]) {
			manifest[config.method] = {};
		}

		// File the config under the method and mime type.
		manifest[config.method][config.mime] = config;

		// Done processing this store operation.
		return;

	}

	let targetManifest = parent || manifest;
	if (!targetManifest[target]) {
		targetManifest[target] = {
			children: {}
		}
	}

	store(_.rest(path), config, targetManifest.children);

}

export function init(basePath) {

	scanner(basePath, function(path, config) {
		store(path.split('/'), config, manifest);
	});

}

/**
 *
 * @param {Array|String} path
 * @param {String} method
 * @param {String} mime
 * @param {Object} parent
 * @returns {Object}
 */
export function find(path, method, mime, parent) {

	parent = parent || manifest;

	if (_.isString(path)) {
		return find(path.split('/'), method, mime, parent);
	}

	let target = _.first(path);
	if (!target) {

		let methodTarget = parent[method];
		if (!methodTarget) {
			return null;
		}

		let mimeTarget = methodTarget[mime];
		if (!mimeTarget) {
			return null;
		}

		return mimeTarget;

	}

	return find(_.rest(path), method, mime, target.children);

}

export default {
	init: init,
	find: find
};
