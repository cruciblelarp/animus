/* globals module, require */

import * as app from './express';
import * as http from './http';
import * as sockit from 'sockit-express';

export default sockit({
	express: app,
	server: http
});
