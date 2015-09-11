/* globals require, module, __dirname */

let _ = require('underscore');

import app from './express.es6';
import manifest from './manifest.es6';

let constraint = suit.constraints();

export const mime = {
	jade: 'application/jade',
	html: 'text/html',
	js: 'application/javascript',
	json: 'application/json',
	css: 'text/css',
	less: 'application/less',
	scss: 'application/sass'
};




export function addSassHandler(dir, file) {
	//
}

export let handlers = new Map([
	[ [ 'es6' ], addActionHandler ],
	[ [ 'jade' ], addJadeHandler ],
	[ [ 'scss' ], addSassHandler ],
	[ [ 'js' ], addStaticHandler ]
]);



export function scan(dir) {

	forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file);
		}

		let extension = file.slice(file.lastIndexOf('.') + 1);

		handlers.forEach(function(handler, extensions) {
			if (extensions.contains(extension)) {
				handler(dir, file);
			}
		});

	});

}

export default scan(paths.resolve(__dirname, 'api'));
