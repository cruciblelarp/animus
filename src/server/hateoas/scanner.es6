/* globals require, console */

import jadeHandler from './jadeHandler.es6';
import staticHandler from './staticHandler.es6';
import actionHandler from './actionHandler.es6';
import sassHandler from './sassHandler.es6';
import ResolverConfig from './ResolverConfig.es6';
import ManifestConfig from './ManifestConfig.es6';
import ResolverFactoryConfig from './ResolverFactoryConfig.es6';

const fs = require('fs');
const paths = require('path');

const handlers = {
	jade: jadeHandler,
	js: staticHandler,
	es6: actionHandler,
	scss: sassHandler
};

/**
 *
 * @param {String} path
 * @param {Function} onFileRead
 * @returns {Promise}
 */
export function forFilesIn(path, onFileRead) {
	return new Promise(function(resolve, reject) {

		console.log("Scanning " + path + " for files...");
		fs.readdir(path, function(error, files) {

			if (error) {
				console.error("Failed to read directory:" + path);
				return reject(error);
			}

			var promises = _.collect(files, function(fileName) {
				let file = paths.resolve(path, fileName);

				return new Promise(function(resolve, reject) {
					fs.stat(file, function(error, stats) {
						error
							? reject(error)
							: resolve(stats);
					});

				}).then(function(stats) {
					return onFileRead(file, stats);

				}).catch(function(error) {
					console.error("Failed to stat file: " + file);
					return Promise.reject(error);
				});

			});

			return Promise.all(promises).then(resolve, reject);

		});

	});
}

/**
 *
 * @param {String} dir
 * @param {Function} onConfigFound
 * @returns {Promise}
 */
export function scan(dir, onConfigFound) {
	return forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file, onConfigFound);
		}

		let extension = file.slice(file.lastIndexOf('.') + 1);
		if (extension === 'es6') {
			let resolverConfig = require(file);
			let manifestConfig = new ManifestConfig(resolverConfig, file);
			return onConfigFound(manifestConfig);
		}

		let content = null; // TODO: Match the mime to the resolver.
		let resolver = null; // TODO: get this from somewhere.

		let resolverConfig = new ResolverConfig('GET', content, null, resolver);
		let manifestConfig = new ManifestConfig(resolverConfig, file);
		return onConfigFound(manifestConfig);

	});
}

export let resolverConfigFactories = {};

/**
 * Registers a resolverConfigFactory function in the index.
 * @param {ResolverFactoryConfig} config
 */
export function registerStaticResolver(config) {

	let factoryList = resolverConfigFactories[config.extension];
	if (!factoryList) {
		resolverConfigFactories[config.extension] = [];
		return registerStaticResolver(config);
	}

	factoryList.push(config.factory);

}
