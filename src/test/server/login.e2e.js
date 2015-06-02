/** globals module, require, describe, it, browser, element, by **/

describe('animus login page', function() {
	it('should login with test credentials', function() {
		browser.get('http://localhost:8000/debug.html');

		element(by.css('input[type=email]')).sendKeys('email@somewhere.com');
		element(by.css('input[type=password]')).sendKeys('password');
		element(by.css('button[type=submit]')).click();

		var page = element(by.css('#admin-dashboard'));
		expect(page).not.toBe(null);

	});
});
