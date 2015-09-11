
import app from '../express.es6';
import staticHandler from './staticHandler.es6';

export default function (dir, file) {

	let renderer = function() {};

	app({
		method: 'GET',
		uri: dir,
		accept: mime.html
	}, renderer);

	staticHandler(dir, file);

}
