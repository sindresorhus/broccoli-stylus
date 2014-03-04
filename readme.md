# [broccoli](https://github.com/joliss/broccoli)-stylus [![Build Status](https://travis-ci.org/sindresorhus/broccoli-stylus.png?branch=master)](https://travis-ci.org/sindresorhus/broccoli-stylus)

> Compile [Stylus](https://github.com/LearnBoost/stylus)

*Issues with the output should be reported on the Stylus [issue tracker](https://github.com/LearnBoost/stylus/issues).*


## Install

```
npm install --save broccoli-stylus
```


## Example

```js
var stylus = require('broccoli-stylus');
tree = stylus(tree, options);
```


## API

### stylus(tree, options)

#### options

##### [include](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#includepath)

Type: `Array`

Paths to scan for @import directives when parsing.

##### [use](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#usefn)

Type: `Array`

Pass in Stylus plugins to be used during compilation.

##### [import](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#importpath)

Type: `Array`

Defer importing of the given paths until evaluation is performed.

##### [urlFn](http://learnboost.github.io/stylus/docs/functions.url.html)

Type: `Array`

Will use iterate over the values and call `stylus.define(value, stylus.url());` for each iteration.

##### [set](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#setsetting-value)

Type: `Object`

Set some settings.

##### [define](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#definename-node)

Type: `Object`

Define global variables that will be accessible in Stylus files.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
