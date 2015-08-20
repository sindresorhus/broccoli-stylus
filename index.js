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
