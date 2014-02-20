'use strict';
var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');

afterEach(function () {
	rimraf.sync('temp');
});

it('should compile Stylus', function () {
	assert.equal(
		fs.readFileSync('temp/fixture.css', 'utf8'),
		fs.readFileSync('fixture/expected.css', 'utf8')
	);
});
