/* globals module, require */

let sockit = require('sockit-express');

import * as app from './express.es6';
import * as http from './http.es6';

export default sockit({
	express: app,
	server: http
});
