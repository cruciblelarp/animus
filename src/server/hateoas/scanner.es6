/* globals require, console */

import ResolverConfig from './ResolverConfig.es6';
import ManifestConfig from './ManifestConfig.es6';
import ResolverFactoryConfig from './ResolverFactoryConfig.es6';

const fs = require('fs');
const paths = require('path');

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

			var promises = files.collect(function(fileName) {
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
		let resolverFactoryList = resolverConfigFactories[extension];

		if (!resolverFactoryList || !resolverFactoryList.length) {
			let resolverConfig = require(file);
			let manifestConfig = new ManifestConfig(resolverConfig, file);
			return Promise.resolve(onConfigFound(manifestConfig));
		}

		let promises = resolverFactoryList.collect(function(factory) {
			let resolverConfig = factory(file);
			let manifestConfig = new ManifestConfig(resolverConfig, file);
			return Promise.resolve(onConfigFound(manifestConfig));
		});

		return Promise.all(promises);

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
