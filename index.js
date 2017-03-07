'use strict';
var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var stylus = require('stylus');

function StylusFilter(inputTree, options) {
	if (!(this instanceof StylusFilter)) {
		return new StylusFilter(inputTree, options);
	}

	Filter.call(this, inputTree);

	this.inputTree = inputTree;
	this.options = options || {};
}

StylusFilter.prototype = Object.create(Filter.prototype);
StylusFilter.prototype.constructor = StylusFilter;

StylusFilter.prototype.extensions = ['styl'];
StylusFilter.prototype.targetExtension = 'css';

StylusFilter.prototype.processString = function (str) {
	var opts = this.options;

	var importRegex = new RegExp(/@import ['"].*['"]/);
	while (importRegex.test(str)) {
		var imp = importRegex.exec(str);
		var sourceReg = new RegExp(/['"].*['"]/);
		var extReg = new RegExp(/.styl/);

		// get import file src and remove quotes
		var src = sourceReg.exec(imp[0])[0].replace(/"/g, '').replace(/'/g, '');

		// add '.styl' to filename if not exist
		if (!extReg.test(src)) {
			src = src + '.styl';
		}

		// building file path to add to import array
		src = this.inputTree.inputTree.inputTree + '/' + this.inputTree.srcDir + '/' + src;

		// create import array if not exist
		if (!opts.import) {
			opts.import = [];
		}

		// push file source to import array
		opts.import.push(src);

		// remove the import from stylus src
		str = str.replace(importRegex, '');
	}

	var s = stylus(str);

	if (opts.include) {
		opts.include.forEach(function (el) {
			s.include(el);
		});
	}

	if (opts.use) {
		opts.use.forEach(function (el) {
			s.use(el());
		});
	}

	if (opts.import) {
		opts.import.forEach(function (el) {
			s.import(el);
		});
	}

	if (opts.urlFn) {
		opts.urlFn.forEach(function (el) {
			s.define(el, stylus.url());
		});
	}

	if (opts.set) {
		Object.keys(opts.set).forEach(function (key) {
			s.set(key, opts.set[key]);
		});
	}

	if (opts.define) {
		Object.keys(opts.define).forEach(function (key) {
			s.define(key, opts.define[key]);
		});
	}

	return new RSVP.Promise(function (resolve, reject) {
		s.render(function (err, data) {
			if (err) {
				return reject(err);
			}

			resolve(data);
		});
	});
};

module.exports = StylusFilter;
