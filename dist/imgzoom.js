(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImgZoom = undefined;

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ImgZoom(opts) {
    var _this = this;

    opts = (0, _objectAssign2.default)({
        smallc: '',
        scale: 1
    }, opts);

    this.opts = opts;
    this.doc = document.documentElement || document.body;
    this.smallc = document.querySelector(opts.smallc);
    this.smallcRect = this.smallc.getBoundingClientRect();
    this.smallcAbs = {
        top: this.smallcRect.top + this.doc.scrollTop,
        left: this.smallcRect.left + this.doc.scrollLeft
    };
    this.smallImg = this.smallc.querySelector('img');
    this.smallZoom = null;
    this.bigc = null;
    this.bigImg = null;

    this.smallc.onmouseover = function () {
        _this._mouseover();
    };
    this.smallc.onmouseout = function () {
        _this._mouseout();
    };
    this.smallc.onmousemove = function (e) {
        _this._mousemove(e);
    };
}

ImgZoom.prototype._mouseover = function () {
    var self = this;
    if (!this.smallZoom) {
        this.smallc.insertAdjacentHTML('beforeEnd', '<span class="smallzoom j-smallzoom"></span>');
        this.smallZoom = document.querySelector('.j-smallzoom');
    }
    if (!this.bigc) {
        var bigcOffset = 100,
            bigcLeft = this.smallcAbs.left + this.smallc.offsetWidth + bigcOffset,
            bigcTop = this.smallcAbs.top;
        document.body.insertAdjacentHTML('beforeEnd', '<div style="top:' + bigcTop + 'px;left:' + bigcLeft + 'px;" class="bigc j-imgzoom-bigc"><img class="bigimg" /></div>');
        this.bigc = document.querySelector('.j-imgzoom-bigc');
        this.bigImg = this.bigc.firstChild;
    }
    //小图为最新的容器子元素
    this.smallImg = this.smallc.querySelector('img');
    //大图为最新的小图对应的大图
    var bigImg = this.bigImg;
    bigImg.src = this.smallImg.getAttribute('data-big');
    // bigImg.onload = function(evt){
    //     if(self.opts.scale == 1){
    //         var scale = bigImg.width/self.smallImg.width;
    //         self.bigc.style.width = scale * self.smallZoom.offsetWidth + 'px';
    //         self.bigc.style.height = scale * self.smallZoom.offsetHeight + 'px';
    //         self.opts.scale = scale;
    //     }
    // }
    //显示小图放大镜和大图
    this.smallZoom.style.display = 'inline-block';
    this.bigc.style.display = 'block';
};

ImgZoom.prototype._mouseout = function () {
    // this.smallZoom.style.display = 'none';
    // this.bigc.style.display = 'none';
};

ImgZoom.prototype._mousemove = function (e) {
    var left = e.clientX - this.smallcRect.left - this.smallZoom.offsetWidth / 2,
        top = e.clientY - this.smallcRect.top - this.smallZoom.offsetHeight / 2;
    // left = mid(0,this.smallc.offsetWidth - this.smallZoom.offsetWidth,left);
    // top = mid(0,this.smallc.offsetHeight - this.smallZoom.offsetHeight,top);

    this.smallZoom.style.top = top + 'px';
    this.smallZoom.style.left = left + 'px';

    // var ratio = (this.bigImg.offsetWidth - this.bigc.offsetWidth)/(this.smallImg.offsetWidth - this.smallZoom.offsetWidth);
    var ratio = this.bigImg.offsetWidth / this.smallImg.offsetWidth;

    this.bigImg.style.top = -ratio * top + 'px';
    this.bigImg.style.left = -ratio * left + 'px';
};

function mid(min, max, mid) {
    return Math.min(Math.max(min, mid), max);
}

exports.ImgZoom = ImgZoom;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);
});