/* globals module, require, describe, it, browser, element, by */

describe('animus root options', function() {

	var options = browser.options('http://localhost:8000/');

	it('should provide an html template', function(done) {

		expect(options).not.toBe(null);

		done();
	});

});
