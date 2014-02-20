'use strict';
var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var stylus = require('stylus');

function StylusFilter(inputTree, options) {
	if (!(this instanceof StylusFilter)) {
		return new StylusFilter(inputTree, options);
	}

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

	if (opts.paths) {
		s.include(opts.paths);
	}

	if (opts.use) {
		opts.use.forEach(function (el) {
			s.use(el());
		});
	}

	if (opts.set) {
		opts.set.forEach(function (el) {
			s.set(el, true);
		});
	}

	if (opts.import) {
		opts.set.forEach(function (el) {
			s.import(el);
		});
	}

	if (opts.urlFn) {
		opts.urlFn.forEach(function (el) {
			s.define(el, stylus.url());
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
	}.bind(this));
};

module.exports = StylusFilter;
