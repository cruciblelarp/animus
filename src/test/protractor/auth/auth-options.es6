/* globals module, require, describe, it, browser, element, by */

describe('animus auth options', function() {

	var options = browser.options('http://localhost:8000/auth');

	it('should provide an html template', function(done) {

		expect(options).not.toBe(null);

		done();
	});

});
