/* globals module, require, describe, it, browser, element, by */

describe('animus admin options', function() {

	var options = browser.options('http://localhost:8000/admin');

	it('should provide an html template', function(done) {

		expect(options).not.toBe(null);

		done();
	});

});
