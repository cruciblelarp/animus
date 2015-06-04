/** globals module, require, describe, it, browser, element, by **/

describe('animus login page', function() {
	it('should login with test credentials', function() {
		browser.get('http://localhost:8000/debug.html');

		// log-in
		element(by.css('input[type=email]')).sendKeys('email@somewhere.com');
		element(by.css('input[type=password]')).sendKeys('password');
		element(by.css('button[type=submit]')).click();

		// Navigate to user details
		element(by.css('a[ui-sref=account]')).click();
		element(by.css('a[ui-sref=account.details]')).click();

		var email = element(by.css('input[ng-model=details.email]'));
		expect(email.getAttribute('value')).toEqual('email@somewhere.com');

	});
});
