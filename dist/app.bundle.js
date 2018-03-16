/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(11);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var hide = __webpack_require__(7);
var redefine = __webpack_require__(26);
var ctx = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(20);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(30);
var enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* KUTE.js - The Light Tweening Engine
 * by dnp_theme
 * Licensed under MIT-License
 */
(function (root,factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD. Register as an anonymous module.
  } else if (typeof exports == 'object') {
    module.exports = factory(); // Node, not strict CommonJS
  } else {
    root.KUTE = factory();
  }
}(this, function () {
  "use strict";

  // set a custom scope for KUTE.js
  var g = typeof global !== 'undefined' ? global : window, time = g.performance,
    body = document.body, tweens = [], tick = null, // tick must be null!!

    // strings
    length = 'length',
    split = 'split',
    indexOf = 'indexOf',
    replace = 'replace',

    offsetWidth = 'offsetWidth',
    offsetHeight = 'offsetHeight',

    options = 'options',
    valuesStart = 'valuesStart',
    valuesEnd = 'valuesEnd',
    valuesRepeat = 'valuesRepeat',

    element = 'element',
    playing = 'playing',

    duration = 'duration',
    delay = 'delay',
    offset = 'offset',
    repeat = 'repeat',
    repeatDelay = 'repeatDelay',
    yoyo = 'yoyo',
    easing = 'easing',
    chain = 'chain',
    keepHex = 'keepHex',

    style = 'style',
    dataTweening = 'data-tweening',
    getElementsByTagName = 'getElementsByTagName',
    addEventListener = 'addEventListener',
    removeEventListener = 'removeEventListener';


  //supported properties
  var colorProps = ['color', 'backgroundColor'], // 'hex', 'rgb', 'rgba' '#fff' 'rgb(0,0,0)' / 'rgba(0,0,0,0)' 'red' (IE9+)
    boxModelProps  = ['top', 'left', 'width', 'height'], 
    transformFunctions  = ['translate3d', 'translateX', 'translateY', 'translateZ', 'rotate', 'translate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scale'],
    scrollProp  = ['scroll'], // has no default value, it's calculated on tween start
    opacityProp  = ['opacity'], // opacity
    coreProps = colorProps.concat( opacityProp, boxModelProps, transformFunctions),
    defaultPropsValues = {}; 

  //populate default values object
  for ( var propertyIndex=0, allCorePropLength = coreProps[length], coreProp; propertyIndex < allCorePropLength; propertyIndex++ ){
    coreProp = coreProps[propertyIndex];
    if (colorProps[indexOf](coreProp) !== -1){
      defaultPropsValues[coreProp] = 'rgba(0,0,0,0)'; // defaultPropsValues[coreProp] = {r:0,g:0,b:0,a:1};
    } else if ( boxModelProps[indexOf](coreProp) !== -1 ) {
      defaultPropsValues[coreProp] = 0;
    } else if ( coreProp === 'translate3d' ){ // px
      defaultPropsValues[coreProp] = [0,0,0];
    } else if ( coreProp === 'translate' ){ // px
      defaultPropsValues[coreProp] = [0,0];
    } else if ( coreProp === 'rotate' || /X|Y|Z/.test(coreProp) ){ // deg
      defaultPropsValues[coreProp] = 0;
    } else if ( coreProp === 'scale' || coreProp === 'opacity' ){ // unitless
      defaultPropsValues[coreProp] = 1;
    }
  }

  // default tween options, since 1.6.1
  var defaultOptions = {
      duration: 700,
      delay: 0,
      offset: 0,
      repeat: 0,
      repeatDelay: 0,
      yoyo: false,
      easing: 'linear',
      keepHex: false,
    },
    // tools / utils
    getPrefix = function() { //returns browser prefix
      var prefixes = ['Moz', 'moz', 'Webkit', 'webkit', 'O', 'o', 'Ms', 'ms'], thePrefix;
      for (var pIndex = 0, pfl = prefixes[length]; pIndex < pfl; pIndex++) { 
        if (prefixes[pIndex]+'Transform' in body[style]) { thePrefix = prefixes[pIndex]; break; }  
      }
      return thePrefix;
    },
    property = function(propertyToPrefix){ // returns prefixed property | property
      var prefixRequired = (!(propertyToPrefix in body[style])) ? true : false, prefix = getPrefix(); // is prefix required for property | prefix
      return prefixRequired ? prefix + (propertyToPrefix.charAt(0).toUpperCase() + propertyToPrefix.slice(1)) : propertyToPrefix;
    },
    selector = function(el,multi){ // a public selector utility
      var requestedElem;
      if (multi){
        requestedElem = el instanceof Object || typeof el === 'object' ? el : document.querySelectorAll(el);
      } else {
        requestedElem = typeof el === 'object' ? el : document.querySelector(el);
      }
      if (requestedElem === null && el !== 'window') throw new TypeError('Element not found or incorrect selector: '+el);
      return requestedElem;
    },
    radToDeg = function(a) { return a*180/Math.PI; },
    trueDimension = function (dimValue,isAngle) { //true dimension returns { v = value, u = unit }
      var intValue = parseInt(dimValue) || 0, mUnits = ['px','%','deg','rad','em','rem','vh','vw'], theUnit;
      for (var mIndex=0; mIndex<mUnits[length]; mIndex++) { 
        if ( typeof dimValue === 'string' && dimValue[indexOf](mUnits[mIndex]) !== -1 ) { 
          theUnit = mUnits[mIndex]; break; 
        } 
      }
      theUnit = theUnit !== undefined ? theUnit : (isAngle ? 'deg' : 'px');
      return { v: intValue, u: theUnit };
    },
    trueColor = function (colorString) { // replace transparent and transform any color to rgba()/rgb()
      if (/rgb|rgba/.test(colorString)) { // first check if it's a rgb string
        var vrgb = colorString[replace](/\s|\)/,'')[split]('(')[1][split](','), colorAlpha = vrgb[3] ? vrgb[3] : null;
        if (!colorAlpha) {
          return { r: parseInt(vrgb[0]), g: parseInt(vrgb[1]), b: parseInt(vrgb[2]) };
        } else {
          return { r: parseInt(vrgb[0]), g: parseInt(vrgb[1]), b: parseInt(vrgb[2]), a: parseFloat(colorAlpha) };
        }
      } else if (/^#/.test(colorString)) {
        var fromHex = hexToRGB(colorString); return { r: fromHex.r, g: fromHex.g, b: fromHex.b };
      } else if (/transparent|none|initial|inherit/.test(colorString)) {
        return { r: 0, g: 0, b: 0, a: 0 };
      } else if (!/^#|^rgb/.test(colorString) ) { // maybe we can check for web safe colors
        var siteHead = document[getElementsByTagName]('head')[0]; siteHead[style].color = colorString;
        var webColor = g.getComputedStyle(siteHead,null).color; webColor = /rgb/.test(webColor) ? webColor[replace](/[^\d,]/g, '')[split](',') : [0,0,0];
        siteHead[style].color = ''; return { r: parseInt(webColor[0]), g: parseInt(webColor[1]), b: parseInt(webColor[2]) };
      }
    },
    rgbToHex = function (r, g, b) { // transform rgb to hex or vice-versa | webkit browsers ignore HEX, always use RGB/RGBA
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    hexToRGB = function (hex) {
      var hexShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      hex = hex[replace](hexShorthand, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    getInlineStyle = function(el) { // get transform style for element from cssText for .to() method
      if (!el) return; // if the scroll applies to `window` it returns as it has no styling
      var css = el[style].cssText[replace](/\s/g,'')[split](';'), transformObject = {}; // the cssText | the resulting transform object

      // if we have any inline style in the cssText attribute, usually it has higher priority
      for ( var i=0, csl = css[length]; i<csl; i++ ){
        if ( /transform/i.test(css[i])) {
          var tps = css[i][split](':')[1][split](')'); //all transform properties
          for ( var k=0, tpl = tps[length]-1; k< tpl; k++){
            var tpv = tps[k][split]('('), tp = tpv[0], tv = tpv[1]; // each transform property, the sp is for transform property
            if ( transformFunctions[indexOf](tp) !== -1 ){
              transformObject[tp] = /translate3d/.test(tp) ? tv[split](',') : tv;
            }
          }
        }
      }
      return transformObject;
    },
    getCurrentStyle = function (elem,propertyName) { // get computed style property for element for .to() method
      var styleAttribute = elem[style], computedStyle = g.getComputedStyle(elem,null) || elem.currentStyle, 
        prefixedProp = property(propertyName), //the computed style | prefixed property
        styleValue = styleAttribute[propertyName] && !/auto|initial|none|unset/.test(styleAttribute[propertyName]) ? styleAttribute[propertyName] : computedStyle[prefixedProp];
      if ( propertyName !== 'transform' && (prefixedProp in computedStyle || prefixedProp in styleAttribute) ) {
        if ( styleValue ){
          if (prefixedProp === 'filter') { // handle IE8 opacity
            var filterValue = parseInt(styleValue[split]('=')[1][replace](')',''));
            return parseFloat(filterValue/100);
          } else {
            return styleValue;
          }
        } else {
          return defaultPropsValues[propertyName];
        }
      }
    },

    //more internals
    getAll = function () { return tweens; },
    removeAll = function () { tweens = []; },
    add = function (tw) { tweens.push(tw); },
    remove = function (tw) { var i = tweens[indexOf](tw); if (i !== -1) { tweens.splice(i, 1); }},
    stop = function () { if (tick) { _cancelAnimationFrame(tick); tick = null; } },

    canTouch = ('ontouchstart' in g || navigator && navigator.msMaxTouchPoints) || false, // support Touch?
    touchOrWheel = canTouch ? 'touchstart' : 'mousewheel', mouseEnter = 'mouseenter', //events to prevent on scroll
    _requestAnimationFrame = g.requestAnimationFrame || g.webkitRequestAnimationFrame || function (c) { return setTimeout(c, 16) },
    _cancelAnimationFrame = g.cancelAnimationFrame || g.webkitCancelRequestAnimationFrame || function (c) { return clearTimeout(c) },
    transformProperty = property('transform'),

    // true scroll container
    html = document[getElementsByTagName]('HTML')[0],
    // scrollContainer = navigator && /webkit/i.test(navigator.userAgent) || document.compatMode == 'BackCompat' ? body : html,
    scrollContainer = document.compatMode == 'BackCompat' ? body : html, // webkit browsers are now srolling the HTML

    // browser detection
    isIE = navigator && (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null) ? parseFloat( RegExp.$1 ) : false,
    isIE8 = isIE === 8, // check IE8/IE


    // KUTE.js INTERPOLATORS
    interpolate = g.Interpolate = {},
    number = interpolate.number = function(a,b,v) { // number1, number2, progress
      a = +a; b -= a; return a + b * v;
    },
    unit = interpolate.unit = function(a,b,u,v) { // number1, number2, unit, progress
      a = +a; b -= a; return ( a + b * v ) + u;
    },
    color = interpolate.color = function(a,b,v,toHex){ // rgba1, rgba2, progress, convertToHex(true/false)
      var _c = {}, c, ep = ')', cm =',', rgb = 'rgb(', rgba = 'rgba(';
      for (c in b) { _c[c] = c !== 'a' ? (number(a[c],b[c],v)>>0 || 0) : (a[c] && b[c]) ? (number(a[c],b[c],v) * 100 >> 0 )/100 : null; }
      return toHex ? rgbToHex( _c.r, _c.g, _c.b ) : !_c.a ? rgb + _c.r + cm + _c.g + cm + _c.b + ep : rgba + _c.r + cm + _c.g + cm + _c.b + cm + _c.a + ep;
    },
    translate = interpolate.translate = function (a,b,u,v){
      var translation = {};
      for (var ax in b){
        translation[ax] = ( a[ax]===b[ax] ? b[ax] : ( (a[ax] + ( b[ax] - a[ax] ) * v ) * 1000 >> 0 ) / 1000 ) + u;
      }
      return translation.x||translation.y ? 'translate(' + translation.x + ',' + translation.y + ')' :
        'translate3d(' + translation.translateX + ',' + translation.translateY + ',' + translation.translateZ + ')';
    },
    rotate = interpolate.rotate = function (a,b,u,v){
      var rotation = {};
      for ( var rx in b ){
        rotation[rx] = rx === 'z' ? ('rotate('+ (((a[rx] + (b[rx] - a[rx]) * v) * 1000 >> 0 ) / 1000) + u + ')')
                                  : (rx + '(' + (((a[rx] + (b[rx] - a[rx]) * v) * 1000 >> 0 ) / 1000) + u + ')');
      }
      return rotation.z ? rotation.z : (rotation.rotateX||'') + (rotation.rotateY||'') + (rotation.rotateZ||'');
    },
    skew = interpolate.skew = function (a,b,u,v){
      var skewProp = {};
      for ( var sx in b ){
        skewProp[sx] = sx + '(' + (((a[sx] + (b[sx] - a[sx]) * v) * 1000 >> 0) / 1000) + u + ')';
      }
      return (skewProp.skewX||'') + (skewProp.skewY||'');
    },
    scale = interpolate.scale = function(a,b,v){
      return 'scale(' + (((a + (b - a) * v) * 1000 >> 0 ) / 1000) + ')';
    },

    // KUTE.js DOM update functions
    DOM = {},
    ticker = function(t) {
      var i = 0;
      while ( i < tweens[length] ) {
        if ( update.call(tweens[i],t) ) {
          i++;
        } else {
          tweens.splice(i, 1);
        }
      }
      tick = _requestAnimationFrame(ticker);
    },
    update = function(t) {
      t = t || time.now();
      if ( t < this._startTime && this[playing] ) { return true; }

      var elapsed = Math.min(( t - this._startTime ) / this[options][duration], 1), progress = this[options][easing](elapsed); // calculate progress

      for (var tweenProp in this[valuesEnd]){ // render the DOM update
        DOM[tweenProp](this[element],tweenProp,this[valuesStart][tweenProp],this[valuesEnd][tweenProp],progress,this[options]); 
      }

      if (this[options].update) { this[options].update.call(); } // fire the updateCallback

      if (elapsed === 1) {
        if (this[options][repeat] > 0) {
          if ( isFinite(this[options][repeat] ) ) { this[options][repeat]--; }

          if (this[options][yoyo]) { // handle yoyo
            this.reversed = !this.reversed;
            reverse.call(this);
          }

          this._startTime = (this[options][yoyo] && !this.reversed) ? t + this[options][repeatDelay] : t; //set the right time for delay
          return true;
        } else {

          if (this[options].complete) { this[options].complete.call(); }

          scrollOut.call(this); // unbind preventing scroll when scroll tween finished

          for (var i = 0, ctl = this[options][chain][length]; i < ctl; i++) { // start animating chained tweens
            this[options][chain][i].start();
          }

          //stop ticking when finished
          close.call(this);
        }
        return false;
      }
      return true;
    },

    // applies the transform origin and perspective
    perspective = function () {
      var el = this[element], ops = this[options];
      if ( ops.perspective !== undefined && transformProperty in this[valuesEnd] ) { // element perspective
        this[valuesStart][transformProperty]['perspective'] = this[valuesEnd][transformProperty]['perspective']; 
      }
      // element transform origin / we filter it out for svgTransform to fix the Firefox transformOrigin bug https://bugzilla.mozilla.org/show_bug.cgi?id=923193
      if ( ops.transformOrigin !== undefined && (!('svgTransform' in this[valuesEnd])) ) { el[style][property('transformOrigin')] = ops.transformOrigin; } // set transformOrigin for CSS3 transforms only
      if ( ops.perspectiveOrigin !== undefined ) { el[style][property('perspectiveOrigin')] = ops.perspectiveOrigin; } // element perspective origin
      if ( ops.parentPerspective !== undefined ) { el.parentNode[style][property('perspective')] = ops.parentPerspective + 'px'; } // parent perspective
      if ( ops.parentPerspectiveOrigin !== undefined ) { el.parentNode[style][property('perspectiveOrigin')] = ops.parentPerspectiveOrigin; } // parent perspective origin
    },

    // plugin connector objects
    prepareStart = {}, // check current property value when .to() method is used
    crossCheck = {}, // checks for differences between start and end value, try to make sure start unit and end unit are same as well as consistent, stack transforms, process SVG paths

    // parse properties object
    // string parsing and property specific value processing
    parseProperty = { // we already start working on core supported properties
      boxModel : function(tweenProp,inputValue){
        if (!(tweenProp in DOM)){
          DOM[tweenProp] = function(elem,tweenProp,a,b,v){
            elem[style][tweenProp] = ( v > 0.99 || v < 0.01 ? ((number(a,b,v)*10)>>0)/10 : (number(a,b,v) ) >> 0 ) + 'px';
          }
        }
        var boxValue = trueDimension(inputValue), offsetProp = tweenProp === 'height' ? offsetHeight : offsetWidth;
        return boxValue.u === '%' ? boxValue.v * this[element][offsetProp] / 100 : boxValue.v;
      },
      transform : function(tweenProp,inputValue) {
        if (!(transformProperty in DOM)) {
          DOM[transformProperty] = function(elem,tweenProp,a,b,v,o){
            elem[style][tweenProp] = (a.perspective||'')
              + ('translate' in a ? translate(a.translate,b.translate,'px',v):'')
              + ('rotate' in a ? rotate(a.rotate,b.rotate,'deg',v):'')
              + ('skew' in a ? skew(a.skew,b.skew,'deg',v):'')
              + ('scale' in a ? scale(a.scale,b.scale,v):'');
          }
        }

        // process each transform property
        if (/translate/.test(tweenProp)) {
          if (tweenProp === 'translate3d') {
            var t3d = inputValue[split](','), t3d0 = trueDimension(t3d[0]), t3d1 = trueDimension(t3d[1], t3d2 = trueDimension(t3d[2]));
            return {
              translateX : t3d0.u === '%' ? (t3d0.v * this[element][offsetWidth] / 100) : t3d0.v,
              translateY : t3d1.u === '%' ? (t3d1.v * this[element][offsetHeight] / 100) : t3d1.v,
              translateZ : t3d2.u === '%' ? (t3d2.v * (this[element][offsetHeight] + this[element][offsetWidth]) / 200) : t3d2.v // to be changed with something like element and/or parent perspective
            };
          } else if (/^translate(?:[XYZ])$/.test(tweenProp)) {
            var t1d = trueDimension(inputValue), percentOffset = /X/.test(tweenProp) ? this[element][offsetWidth] / 100 : /Y/.test(tweenProp) ? this[element][offsetHeight] / 100 : (this[element][offsetWidth]+this[element][offsetHeight]) / 200;

            return t1d.u === '%' ? (t1d.v * percentOffset) : t1d.v;
          } else if (tweenProp === 'translate') {
            var tv = typeof inputValue === 'string' ? inputValue[split](',') : inputValue, t2d = {}, t2dv,
              t2d0 = trueDimension(tv[0]), t2d1 = tv[length] ? trueDimension(tv[1]) : {v: 0, u: 'px'};
            if (tv instanceof Array) {
              t2d.x = t2d0.u === '%' ? (t2d0.v * this[element][offsetWidth] / 100) : t2d0.v,
              t2d.y = t2d1.u === '%' ? (t2d1.v * this[element][offsetHeight] / 100) : t2d1.v
            } else {
              t2dv = trueDimension(tv);
              t2d.x = t2dv.u === '%' ? (t2dv.v * this[element][offsetWidth] / 100) : t2dv.v,
              t2d.y = 0
            }

            return t2d;
          }
        } else if (/rotate|skew/.test(tweenProp)) {
          if (/^rotate(?:[XYZ])$|skew(?:[XY])$/.test(tweenProp)) {
            var r3d = trueDimension(inputValue,true);
            return r3d.u === 'rad' ? radToDeg(r3d.v) : r3d.v;
          } else if (tweenProp === 'rotate') {
            var r2d = {}, r2dv = trueDimension(inputValue,true);
            r2d.z = r2dv.u === 'rad' ? radToDeg(r2dv.v) : r2dv.v;
            return r2d;
          }
        } else if (tweenProp === 'scale') {
          return parseFloat(inputValue); // this must be parseFloat(v)
        }
      },
      unitless : function(tweenProp,inputValue){  // scroll | opacity
        if (/scroll/.test(tweenProp) && !(tweenProp in DOM) ){
          DOM[tweenProp] = function(elem,tweenProp,a,b,v) {
            elem.scrollTop = (number(a,b,v))>>0;
          };
        } else if (tweenProp === 'opacity') {
          if (!(tweenProp in DOM)) {
            if (isIE8) {
              DOM[tweenProp] = function(elem,tweenProp,a,b,v) {
                var st = "alpha(opacity=", ep = ')';
                elem[style].filter = st + ((number(a,b,v) * 100)>>0) + ep;
              };
            } else {
              DOM[tweenProp] = function(elem,tweenProp,a,b,v) {
                elem[style].opacity = ((number(a,b,v) * 100)>>0)/100;
              };
            }
          }
        }
        return parseFloat(inputValue);
      },
      colors : function(tweenProp,inputValue){ // colors
        if (!(tweenProp in DOM)) {
          DOM[tweenProp] = function(elem,tweenProp,a,b,v,o) {
            elem[style][tweenProp] = color(a,b,v,o[keepHex]);
          };
        }
        return trueColor(inputValue);
      }
    },

    // process properties for endValues and startValues or one of them
    preparePropertiesObject = function(obj, fn) { // this, props object, type: start/end
      var propertiesObject = fn === 'start' ? this[valuesStart] : this[valuesEnd],
        skewObject = {}, rotateObject = {}, translateObject = {}, transformObject = {};

      for (var x in obj) {
        if (transformFunctions[indexOf](x) !== -1) { // transform object gets built here
          var prepAxis = ['X', 'Y', 'Z']; //coordinates //   translate[x] = pp(x, obj[x]);
          if ( /^translate(?:[XYZ]|3d)$/.test(x) ) { //process translate3d

            for (var fnIndex = 0; fnIndex < 3; fnIndex++) {
              var translateAxis = prepAxis[fnIndex];
              if ( /3d/.test(x) ) {
                translateObject['translate' + translateAxis] = parseProperty.transform.call(this,'translate' + translateAxis, obj[x][fnIndex]);
              } else {
                translateObject['translate' + translateAxis] = ('translate' + translateAxis in obj) ? parseProperty.transform.call(this,'translate' + translateAxis, obj['translate' + translateAxis]) : 0;
              }
            }
            transformObject['translate'] = translateObject;
          } else if ( /^rotate(?:[XYZ])$|^skew(?:[XY])$/.test(x) ) { //process rotation/skew
            var objectName = /rotate/.test(x) ? 'rotate' : 'skew',
              rotationOrSkew = objectName === 'rotate' ? rotateObject : skewObject;
            for (var rIndex = 0; rIndex < 3; rIndex++) {
              var oneAxis = prepAxis[rIndex];
              if ( obj[objectName+oneAxis] !== undefined && x !== 'skewZ' ) {
                rotationOrSkew[objectName+oneAxis] = parseProperty.transform.call(this,objectName+oneAxis, obj[objectName+oneAxis]);
              }
            }
            transformObject[objectName] = rotationOrSkew;
          } else if ( /(rotate|translate|scale)$/.test(x) ) { //process 2d translation / rotation
            transformObject[x] = parseProperty.transform.call(this, x, obj[x]);
          }
          propertiesObject[transformProperty] = transformObject;
        } else {
          if ( boxModelProps[indexOf](x) !== -1 ) {
            propertiesObject[x] = parseProperty.boxModel.call(this,x,obj[x]);
          } else if (opacityProp[indexOf](x) !== -1 || x === 'scroll') {
            propertiesObject[x] = parseProperty.unitless.call(this,x,obj[x]);
          } else if (colorProps[indexOf](x) !== -1) {
            propertiesObject[x] = parseProperty.colors.call(this,x,obj[x]);
          } else if (x in parseProperty) {  // or any other property from css/ attr / svg / third party plugins
            propertiesObject[x] = parseProperty[x].call(this,x,obj[x]);
          }
        }
      }
    },
    reverse = function () {
      if (this[options][yoyo]) {
        for (var reverseProp in this[valuesEnd]) {
          var tmp = this[valuesRepeat][reverseProp];
          this[valuesRepeat][reverseProp] = this[valuesEnd][reverseProp];
          this[valuesEnd][reverseProp] = tmp;
          this[valuesStart][reverseProp] = this[valuesRepeat][reverseProp];
        }
      }
    },
    close = function () { //  when animation is finished reset repeat, yoyo&reversed tweens
      if (this[repeat] > 0) { this[options][repeat] = this[repeat]; }
      if (this[options][yoyo] && this.reversed===true) { reverse.call(this); this.reversed = false; }
      this[playing] = false;

      !tweens[length] && stop();  // when all animations are finished, stop ticking after ~3 frames
    },
    preventScroll = function (eventObj) { // prevent mousewheel or touch events while tweening scroll
      var data = body.getAttribute(dataTweening);
      if (data && data === 'scroll') { eventObj.preventDefault(); }
    },
    scrollOut = function(){ //prevent scroll when tweening scroll
      if ( 'scroll' in this[valuesEnd] && body.getAttribute(dataTweening)) {
        body.removeAttribute(dataTweening);
      }
    },
    scrollIn = function(){
      if ( 'scroll' in this[valuesEnd] && !body.getAttribute(dataTweening)) {
        body.setAttribute(dataTweening, 'scroll');
      }
    },
    processEasing = function (fn) {
      if ( typeof fn === 'function') {
        return fn;
      } else if ( typeof fn === 'string' ) {
        return easingFn[fn]; // regular Robert Penner Easing Functions
      }
    },
    getStartValues = function () { // stack transform props for .to() chains
      var startValues = {}, currentStyle = getInlineStyle(this[element]),
        degreeProps = ['rotate','skew'], startAxis = ['X','Y','Z'];

      for (var tweenProperty in this[valuesStart]){
        if ( transformFunctions[indexOf](tweenProperty) !== -1 ) {
          var r2d = (/(rotate|translate|scale)$/.test(tweenProperty));
          if ( /translate/.test(tweenProperty) && tweenProperty !== 'translate' ) {
            startValues['translate3d'] = currentStyle['translate3d'] || defaultPropsValues[tweenProperty];
          } else if ( r2d ) { // 2d transforms
            startValues[tweenProperty] = currentStyle[tweenProperty] || defaultPropsValues[tweenProperty];
          } else if ( !r2d && /rotate|skew/.test(tweenProperty) ) { // all angles
            for (var degIndex=0; degIndex<2; degIndex++) {
              for (var axisIndex = 0; axisIndex<3; axisIndex++) {
                var s = degreeProps[degIndex]+startAxis[axisIndex];
                if (transformFunctions[indexOf](s) !== -1 && (s in this[valuesStart]) ) { startValues[s] = currentStyle[s] || defaultPropsValues[s]; }
              }
            }
          }
        } else {
          if ( tweenProperty !== 'scroll' ) {
            if (tweenProperty === 'opacity' && isIE8 ) { // handle IE8 opacity
              var currentOpacity = getCurrentStyle(this[element],'filter');
              startValues['opacity'] = typeof currentOpacity === 'number' ? currentOpacity : defaultPropsValues['opacity'];
            } else {
              if ( coreProps[indexOf](tweenProperty) !== -1 ) {
                startValues[tweenProperty] = getCurrentStyle(this[element],tweenProperty) || d[tweenProperty];
              } else { // plugins register here
                startValues[tweenProperty] = tweenProperty in prepareStart ? prepareStart[tweenProperty].call(this,tweenProperty,this[valuesStart][tweenProperty]) : 0;
              }
            }
          } else {
            startValues[tweenProperty] = this[element] === scrollContainer ? (g.pageYOffset || scrollContainer.scrollTop) : this[element].scrollTop;
          }
        }
      }
      for ( var currentProperty in currentStyle ){ // also add to startValues values from previous tweens
        if ( transformFunctions[indexOf](currentProperty) !== -1 && (!( currentProperty in this[valuesStart] )) ) {
          startValues[currentProperty] = currentStyle[currentProperty] || defaultPropsValues[currentProperty];
        }
      }

      this[valuesStart] = {};
      preparePropertiesObject.call(this,startValues,'start');

      if ( transformProperty in this[valuesEnd] ) { // let's stack transform
        for ( var sp in this[valuesStart][transformProperty]) { // sp is the object corresponding to the transform function objects translate / rotate / skew / scale
          if ( sp !== 'perspective') {
            if ( typeof this[valuesStart][transformProperty][sp] === 'object' ) {
              for ( var spp in this[valuesStart][transformProperty][sp] ) { // 3rd level
                if ( typeof this[valuesEnd][transformProperty][sp] === 'undefined' ) { this[valuesEnd][transformProperty][sp] = {}; }
                if ( typeof this[valuesStart][transformProperty][sp][spp] === 'number' && typeof this[valuesEnd][transformProperty][sp][spp] === 'undefined' ) {
                  this[valuesEnd][transformProperty][sp][spp] = this[valuesStart][transformProperty][sp][spp];
                }
              }
            } else if ( typeof this[valuesStart][transformProperty][sp] === 'number' ) {
              if ( typeof this[valuesEnd][transformProperty][sp] === 'undefined' ) { // scale
                this[valuesEnd][transformProperty][sp] = this[valuesStart][transformProperty][sp];
              }
            }
          }
        }
      }
    };

  // core easing functions
  var easingFn = g.Easing = {};
  easingFn.linear = function (t) { return t; };
  easingFn.easingSinusoidalIn = function(t) { return -Math.cos(t * Math.PI / 2) + 1; };
  easingFn.easingSinusoidalOut = function(t) { return Math.sin(t * Math.PI / 2); };
  easingFn.easingSinusoidalInOut = function(t) { return -0.5 * (Math.cos(Math.PI * t) - 1); };
  easingFn.easingQuadraticIn = function (t) { return t*t; };
  easingFn.easingQuadraticOut = function (t) { return t*(2-t); };
  easingFn.easingQuadraticInOut = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; };
  easingFn.easingCubicIn = function (t) { return t*t*t; };
  easingFn.easingCubicOut = function (t) { return (--t)*t*t+1; };
  easingFn.easingCubicInOut = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; };
  easingFn.easingQuarticIn = function (t) { return t*t*t*t; };
  easingFn.easingQuarticOut = function (t) { return 1-(--t)*t*t*t; };
  easingFn.easingQuarticInOut = function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; };
  easingFn.easingQuinticIn = function (t) { return t*t*t*t*t; };
  easingFn.easingQuinticOut = function (t) { return 1+(--t)*t*t*t*t; };
  easingFn.easingQuinticInOut = function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; };
  easingFn.easingCircularIn = function(t) { return -(Math.sqrt(1 - (t * t)) - 1); };
  easingFn.easingCircularOut = function(t) { return Math.sqrt(1 - (t = t - 1) * t); };
  easingFn.easingCircularInOut = function(t) {  return ((t*=2) < 1) ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1); };
  easingFn.easingExponentialIn = function(t) { return Math.pow(2, 10 * (t - 1)) - 0.001; };
  easingFn.easingExponentialOut = function(t) { return 1 - Math.pow(2, -10 * t); };
  easingFn.easingExponentialInOut = function(t) { return (t *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))); };
  easingFn.easingBackIn = function(t) { var s = 1.70158; return t * t * ((s + 1) * t - s); };
  easingFn.easingBackOut = function(t) { var s = 1.70158; return --t * t * ((s + 1) * t + s) + 1; };
  easingFn.easingBackInOut = function(t) { var s = 1.70158 * 1.525;  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2); };
  easingFn.easingElasticIn = function(t) {
    var s, _kea = 0.1, _kep = 0.4;
    if ( t === 0 ) return 0; if ( t === 1 ) return 1;
    if ( !_kea || _kea < 1 ) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin( 1 / _kea ) / Math.PI * 2;
    return - ( _kea * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t - s ) * Math.PI * 2 / _kep ) );
  };
  easingFn.easingElasticOut = function(t) {
    var s, _kea = 0.1, _kep = 0.4;
    if ( t === 0 ) return 0; if ( t === 1 ) return 1;
    if ( !_kea || _kea < 1 ) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin( 1 / _kea ) / Math.PI * 2 ;
    return ( _kea * Math.pow( 2, - 10 * t) * Math.sin( ( t - s ) * Math.PI * 2  / _kep ) + 1 );
  };
  easingFn.easingElasticInOut = function(t) {
    var s, _kea = 0.1, _kep = 0.4;
    if ( t === 0 ) return 0; if ( t === 1 ) return 1;
    if ( !_kea || _kea < 1 ) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin( 1 / _kea ) / Math.PI * 2 ;
    if ( ( t *= 2 ) < 1 ) return - 0.5 * ( _kea * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t - s ) * Math.PI * 2  / _kep ) );
    return _kea * Math.pow( 2, -10 * ( t -= 1 ) ) * Math.sin( ( t - s ) * Math.PI * 2  / _kep ) * 0.5 + 1;
  };
  easingFn.easingBounceIn = function(t) { return 1 - easingFn.easingBounceOut( 1 - t ); };
  easingFn.easingBounceOut = function(t) {
    if ( t < ( 1 / 2.75 ) ) { return 7.5625 * t * t; }
    else if ( t < ( 2 / 2.75 ) ) { return 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75; }
    else if ( t < ( 2.5 / 2.75 ) ) { return 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375; }
    else {return 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375; }
  };
  easingFn.easingBounceInOut = function(t) { if ( t < 0.5 ) return easingFn.easingBounceIn( t * 2 ) * 0.5; return easingFn.easingBounceOut( t * 2 - 1 ) * 0.5 + 0.5;};

  // single Tween object construct
  var Tween = function (targetElement, startObject, endObject, optionsObj) {
      this[element] = 'scroll' in endObject && (targetElement === undefined || targetElement === null) ? scrollContainer : targetElement; // element animation is applied to

      this[playing] = false;
      this.reversed = false;
      this.paused = false;

      this._startTime = null;
      this._pauseTime = null;

      this._startFired = false;
      this[options] = {}; for (var o in optionsObj) { this[options][o] = optionsObj[o]; }
      this[options].rpr = optionsObj.rpr || false; // internal option to process inline/computed style at start instead of init true/false

      this[valuesRepeat] = {}; // internal valuesRepeat
      this[valuesEnd] = {}; // valuesEnd
      this[valuesStart] = {}; // valuesStart

      preparePropertiesObject.call(this,endObject,'end'); // valuesEnd
      if ( this[options].rpr ) { this[valuesStart] = startObject; } else { preparePropertiesObject.call(this,startObject,'start'); } // valuesStart

      if ( this[options].perspective !== undefined && transformProperty in this[valuesEnd] ) { // element transform perspective
        var perspectiveString = 'perspective('+parseInt(this[options].perspective)+'px)';
        this[valuesEnd][transformProperty].perspective = perspectiveString;
      }

      for ( var repeatProp in this[valuesEnd] ) {
        if (repeatProp in crossCheck && !this[options].rpr) crossCheck[repeatProp].call(this); // this is where we do the valuesStart and valuesEnd check for fromTo() method
      }

      this[options][chain] = []; // chained Tweens
      this[options][easing] = processEasing(optionsObj[easing]) || easingFn[defaultOptions[easing]] || easingFn['linear']; // you can only set a core easing function as default
      this[options][repeat] = optionsObj[repeat] || defaultOptions[repeat];
      this[options][repeatDelay] = optionsObj[repeatDelay] || defaultOptions[repeatDelay];
      this[options][yoyo] = optionsObj[yoyo] || defaultOptions[yoyo];
      this[options][duration] = optionsObj[duration] || defaultOptions[duration]; // duration option | default
      this[options][delay] = optionsObj[delay] || defaultOptions[delay]; // delay option | default

      this[repeat] = this[options][repeat]; // we cache the number of repeats to be able to put it back after all cycles finish
    },
    // tween control and chain
    TweenProto = Tween.prototype = {
      // queue tween object to main frame update
      start : function (t) { // move functions that use the ticker outside the prototype to be in the same scope with it
        scrollIn.call(this);

        if ( this[options].rpr ) { getStartValues.apply(this); } // on start we reprocess the valuesStart for TO() method
        perspective.apply(this); // apply the perspective and transform origin

        for ( var endProp in this[valuesEnd] ) {
          if (endProp in crossCheck && this[options].rpr) crossCheck[endProp].call(this); // this is where we do the valuesStart and valuesEnd check for to() method
          this[valuesRepeat][endProp] = this[valuesStart][endProp];
        }

        // now it's a good time to start
        tweens.push(this);
        this[playing] = true;
        this.paused = false;
        this._startFired = false;
        this._startTime = t || time.now();
        this._startTime += this[options][delay];

        if (!this._startFired) {
          if (this[options].start) { this[options].start.call(); }
          this._startFired = true;
        }
        !tick && ticker();
        return this;
      },
      play : function () {
        if (this.paused && this[playing]) {
          this.paused = false;
          if (this[options].resume) { this[options].resume.call(); }
          this._startTime += time.now()  - this._pauseTime;
          add(this);
          !tick && ticker();  // restart ticking if stopped
        }
        return this;
      },
      resume : function () { return this.play(); },
      pause : function() {
        if (!this.paused && this[playing]) {
          remove(this);
          this.paused = true;
          this._pauseTime = time.now();
          if (this[options].pause) { this[options].pause.call(); }
        }
        return this;
      },
      stop : function () {
        if (!this.paused && this[playing]) {
          remove(this);
          this[playing] = false;
          this.paused = false;
          scrollOut.call(this);

          if (this[options].stop) { this[options].stop.call(); }
          this.stopChainedTweens();
          close.call(this);
        }
        return this;
      },
      chain : function() { this[options][chain] = arguments; return this; },
      stopChainedTweens : function () {
        for (var i = 0, ctl = this[options][chain][length]; i < ctl; i++) {
          this[options][chain][i].stop();
        }
      }
    },

    // the multi elements Tween constructs
    TweensTO = function (els, vE, o) { // .to
      this.tweens = []; var optionsObj = [];
      for ( var i = 0, tl = els[length]; i < tl; i++ ) {
        optionsObj[i] = o || {}; o[delay] = o[delay] || defaultOptions[delay];
        optionsObj[i][delay] = i>0 ? o[delay] + (o[offset]||defaultOptions[offset]) : o[delay];
        this.tweens.push( to(els[i], vE, optionsObj[i]) );
      }
    },
    TweensFT = function (els, vS, vE, o) { // .fromTo
      this.tweens = []; var optionsObj = [];
      for ( var i = 0, l = els[length]; i < l; i++ ) {
        optionsObj[i] = o || {}; o[delay] = o[delay] || defaultOptions[delay];
        optionsObj[i][delay] = i>0 ? o[delay] + (o[offset]||defaultOptions[offset]) : o[delay];
        this.tweens.push( fromTo(els[i], vS, vE, optionsObj[i]) );
      }
    },
    ws = TweensTO.prototype = TweensFT.prototype = {
      start : function(t){
        t = t || time.now();
        for ( var i = 0, tl = this.tweens[length]; i < tl; i++ ) {
          this.tweens[i].start(t);
        }
        return this;
      },
      stop : function(){ for ( var i = 0, tl = this.tweens[length]; i < tl; i++ ) { this.tweens[i].stop(); } return this; },
      pause : function(){ for ( var i = 0, tl = this.tweens[length]; i < tl; i++ ) { this.tweens[i].pause(); } return this; },
      chain : function(){ this.tweens[this.tweens[length]-1][options][chain] = arguments; return this; },
      play : function(){ for ( var i = 0, tl = this.tweens[length]; i < tl; i++ ) { this.tweens[i].play(); } return this; },
      resume : function() {return this.play()}
    },

    // main methods
    to = function (element, endObject, optionsObj) {
      optionsObj = optionsObj || {}; optionsObj.rpr = true;
      return new Tween(selector(element), endObject, endObject, optionsObj);
    },
    fromTo = function (element, startObject, endObject, optionsObj) {
      optionsObj = optionsObj || {};
      return new Tween(selector(element), startObject, endObject, optionsObj);
    },

    // multiple elements tweening
    allTo = function (elements, endObject, optionsObj) {
      return new TweensTO(selector(elements,true), endObject, optionsObj);
    },
    allFromTo = function (elements, startObject, endObject, optionsObj) {
      return new TweensFT(selector(elements,true), startObject, endObject, optionsObj);
    };

  document[addEventListener](touchOrWheel, preventScroll, false);
  document[addEventListener](mouseEnter, preventScroll, false);

  return { // export core methods to public for plugins
    property: property, getPrefix: getPrefix, selector: selector, processEasing : processEasing, // utils
    defaultOptions : defaultOptions, // default tween options since 1.6.1
    to: to, fromTo: fromTo, allTo: allTo, allFromTo: allFromTo, // main methods
    ticker : ticker, tick : tick, tweens : tweens, update: update, dom : DOM, // update
    parseProperty: parseProperty, prepareStart: prepareStart, crossCheck : crossCheck, Tween : Tween, // property parsing & preparation | Tween | crossCheck
    truD: trueDimension, truC: trueColor, rth: rgbToHex, htr: hexToRGB, getCurrentStyle: getCurrentStyle, // property parsing
  };
}));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_fn_object_entries__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_fn_object_entries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_fn_object_entries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kute_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kute_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kute_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_kute_js_kute_svg__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_kute_js_kute_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_kute_js_kute_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_style_css__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__css_style_css__);






/*
// polyfills for IE
if (!Object.entries) {
  Object.entries = function( obj ){
    let ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
// polyfills for IE end
*/

var gameModel = {
  grid: ['', '', '', '', '', '', '', '', ''],
  turn: 'player',
  gameInProgress: false,
  verdict: '',
  player_data: {
    shape: 'X',
    moveHistory: [],
    moves: 0
  },
  CPU_data: {
    shape: 'O',
    moveHistory: [],
    moves: 0
  },
  CPU_makeMove: function CPU_makeMove() {
    if (this.player_data.shape === 'X') {
      return this.CPU_counter();
    } else {
      return this.CPU_attack();
    }
  },
  CPU_counter: function CPU_counter() {
    switch (this.player_data.moves) {
      case 1:
        return this.counter_1();
      case 2:
      case 3:
      case 4:
        return this.counter_2();
    }
  },
  counter_1: function counter_1() {
    var playerMoves = this.player_data.moveHistory;
    switch (playerMoves[playerMoves.length - 1]) {
      case 3:
        return 5;
      case 5:
        return 3;
      case 1:
        return 7;
      case 7:
        return 1;
      case 0:
      case 2:
      case 6:
      case 8:
        return 4;
      case 4:
        return 0;
    }
  },
  counter_2: function counter_2() {
    switch (true) {
      case gameController.pursueVerticalWin().score > 1:
        return this.CPU_attack();
      case gameController.pursueHorizontalWin().score > 1:
        return this.CPU_attack();
      case gameController.pursueDiagonalWin().score > 1:
        return this.CPU_attack();
      case typeof gameController.checkDiagonalThreat() === 'number':
        return gameController.checkDiagonalThreat();
      case typeof gameController.checkVerticalThreat() === 'number':
        return gameController.checkVerticalThreat();
      case typeof gameController.checkHorizontalThreat() === 'number':
        return gameController.checkHorizontalThreat();
      default:
        return this.CPU_attack();
    }
  },
  counterBeforeAttack: function counterBeforeAttack() {
    switch (true) {
      case gameController.pursueVerticalWin().score > 1:
        return this.attack_2();
      case gameController.pursueHorizontalWin().score > 1:
        return this.attack_2();
      case gameController.pursueDiagonalWin().score > 1:
        return this.attack_2();
      case typeof gameController.checkDiagonalThreat() === 'number':
        return gameController.checkDiagonalThreat();
      case typeof gameController.checkVerticalThreat() === 'number':
        return gameController.checkVerticalThreat();
      case typeof gameController.checkHorizontalThreat() === 'number':
        return gameController.checkHorizontalThreat();
    }
  },
  CPU_attack: function CPU_attack() {
    switch (this.CPU_data.moves) {
      case 0:
        return 4;
      case 1:
      case 2:
      case 3:
      case 4:
        if (typeof this.counterBeforeAttack() === 'number') {
          return this.counterBeforeAttack();
        } else {
          return this.attack_2();
        }
    }
  },
  attack_1: function attack_1() {
    return gameController.getRandomEmptySquare();
  },
  attack_2: function attack_2() {
    var gridAnalysis = {
      vertical: gameController.pursueVerticalWin().score,
      horizontal: gameController.pursueHorizontalWin().score,
      diagonal: gameController.pursueDiagonalWin().score
    },
        attackDirection = Object.entries(gridAnalysis).sort(function (a, b) {
      return b[1] - a[1];
    })[0][0];
    if (gridAnalysis.vertical === gridAnalysis.horizontal && gridAnalysis.vertical === gridAnalysis.diagonal) {
      attackDirection = 'none';
    }
    switch (attackDirection) {
      case 'vertical':
        return gameController.pursueVerticalWin().move;
      case 'horizontal':
        return gameController.pursueHorizontalWin().move;
      case 'diagonal':
        return gameController.pursueDiagonalWin().move;
      default:
        return this.attack_1();
    }
  }
};

var gameController = {
  init: function init() {
    gameView.init();
    gameStartPrompt.init();
    gameStartPrompt.slideIn();
    gameEndPrompt.init();
    idlePrompt.init();
    chooseAnotherPrompt.init();
  },
  startGame: function startGame(e) {
    gameView.reset();
    gameStartPrompt.slideOut();
    this.toggleGameInProgress();
    var playerShape = e.currentTarget.textContent;
    gameModel.player_data.shape = playerShape;
    gameModel.CPU_data.shape = playerShape === 'X' ? 'O' : 'X';
    if (gameModel.CPU_data.shape === 'X') {
      gameModel.turn = "CPU";
      this.processCPUMove();
    } else {
      this.processPlayerIdle();
    }
  },
  processPlayerIdle: function processPlayerIdle() {
    gameController.idleTimeout = setTimeout(gameController.showIdleMessage, 5000);
  },
  processPlayerActive: function processPlayerActive() {
    clearTimeout(gameController.idleTimeout);
  },
  showIdleMessage: function showIdleMessage() {
    idlePrompt.slideIn();
    gameModel.gameInProgress = false;
  },
  hideIdleMessage: function hideIdleMessage() {
    idlePrompt.slideOut();
    gameModel.gameInProgress = true;
  },
  showChooseMessage: function showChooseMessage() {
    chooseAnotherPrompt.slideIn();
    gameModel.gameInProgress = false;
  },
  hideChooseMessage: function hideChooseMessage() {
    chooseAnotherPrompt.slideOut();
    gameModel.gameInProgress = true;
  },
  toggleGameInProgress: function toggleGameInProgress() {
    gameModel.gameInProgress = gameModel.gameInProgress ? false : true;
  },
  processPlayerMove: function processPlayerMove(e) {
    this.processPlayerActive();
    if (gameModel.gameInProgress && gameModel.turn === 'player') {
      var squareId = e.currentTarget.id;
      if (gameModel.grid[squareId]) {
        gameController.showChooseMessage();
      } else {
        this.registerPlayerMove(squareId);
        this.processCPUMove();
      }
    }
  },
  registerPlayerMove: function registerPlayerMove(squareId) {
    gameModel.player_data.moves++;
    gameModel.player_data.moveHistory.push(parseInt(squareId));
    gameModel.grid[squareId] = gameModel.player_data.shape;
    gameView.render();
    if (this.checkGameOver()) {
      this.endGame();
    }
    gameModel.turn = 'CPU';
  },
  processCPUMove: function processCPUMove() {
    setTimeout(function () {
      if (gameModel.gameInProgress) {
        var CPU_move = gameModel.CPU_makeMove();
        gameModel.CPU_data.moves++;
        gameModel.CPU_data.moveHistory.push(parseInt(CPU_move));
        gameModel.grid[CPU_move] = gameModel.CPU_data.shape;
        gameView.render();
        if (gameController.checkGameOver()) {
          gameController.endGame();
        } else {
          gameModel.turn = 'player';
          gameController.processPlayerIdle();
        }
      }
    }, 700);
  },
  getMoveData: function getMoveData() {
    if (gameModel.turn === 'player') {
      return gameModel.player_data;
    } else {
      return gameModel.CPU_data;
    }
  },
  getGameInProgress: function getGameInProgress() {
    return gameModel.gameInProgress;
  },
  getSquareData: function getSquareData(e) {
    var squareId = e.currentTarget.id;
    return gameModel.grid[squareId];
  },
  getCurrentTurn: function getCurrentTurn() {
    return gameModel.turn;
  },
  checkGameOver: function checkGameOver() {
    var gridAnalysis = {
      vertical: gameController.pursueVerticalWin().score,
      horizontal: gameController.pursueHorizontalWin().score,
      diagonal: gameController.pursueDiagonalWin().score
    },
        highestScoreKey = Object.keys(gridAnalysis).reduce(function (a, b) {
      return gridAnalysis[a] > gridAnalysis[b] ? a : b;
    }),
        isBoardFull = gameModel.grid.indexOf('') < 0 ? true : false;
    switch (true) {
      case gridAnalysis[highestScoreKey] === 3:
        this.setVerdict(gameModel.turn);
        return true;
      case isBoardFull:
        return true;
      default:
        return false;
    }
  },
  endGame: function endGame() {
    this.toggleGameInProgress();
    gameEndPrompt.setMessage();
    gameEndPrompt.slideIn();
  },
  setVerdict: function setVerdict(turn) {
    gameModel.verdict = turn;
  },
  getVerdict: function getVerdict() {
    return gameModel.verdict;
  },
  resetGame: function resetGame() {
    gameModel.grid = ['', '', '', '', '', '', '', '', ''];
    gameModel.verdict = '';
    gameModel.turn = 'player';
    gameModel.gameInProgress = false, gameModel.player_data = {
      shape: 'X',
      moveHistory: [],
      moves: 0
    };
    gameModel.CPU_data = {
      shape: 'O',
      moveHistory: [],
      moves: 0
    };
    gameView.reset();
    gameEndPrompt.slideOut();
    gameStartPrompt.slideIn();
  },
  checkVerticalThreat: function checkVerticalThreat() {
    var lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    var diffsAgainstLastMove = gameModel.player_data.moveHistory.map(function (item) {
      if (item !== lastMove) {
        return lastMove - item;
      } else {
        return undefined;
      }
    });
    var verticalThreatDiff = diffsAgainstLastMove.filter(function (diff) {
      if (Math.abs(diff) === 3 || Math.abs(diff) === 6) {
        return diff;
      }
    });
    if (typeof verticalThreatDiff[0] === 'number' && !gameModel.grid[this.nullifyVerticalThreat(lastMove, verticalThreatDiff[0])]) {
      return this.nullifyVerticalThreat(lastMove, verticalThreatDiff[0]);
    } else {
      return false;
    }
  },
  nullifyVerticalThreat: function nullifyVerticalThreat(lastMove, diff) {
    var threateningMoves = [lastMove, lastMove - diff];
    var movesLtoG = threateningMoves.sort(function (a, b) {
      return a - b;
    });
    switch (true) {
      case (movesLtoG[0] === 0 || movesLtoG[0] === 1 || movesLtoG[0] === 2) && Math.abs(diff) === 3:
        return movesLtoG[0] + 6;
      case (movesLtoG[0] === 0 || movesLtoG[0] === 1 || movesLtoG[0] === 2) && Math.abs(diff) === 6:
        return movesLtoG[0] + 3;
      case (movesLtoG[0] === 3 || movesLtoG[0] === 4 || movesLtoG[0] === 5) && Math.abs(diff) === 3:
        return movesLtoG[0] - 3;
    }
  },
  checkHorizontalThreat: function checkHorizontalThreat() {
    var lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    var sameRowMoves = gameModel.player_data.moveHistory.filter(function (item) {
      if (item !== lastMove) {
        switch (lastMove) {
          case 0:
          case 1:
          case 2:
            return item <= 2 && item >= 0;
          case 3:
          case 4:
          case 5:
            return item <= 5 && item >= 3;
          case 6:
          case 7:
          case 8:
            return item <= 8 && item >= 6;
        }
      }
    });
    var horizontalThreatDiff = typeof sameRowMoves[0] === 'number' ? sameRowMoves.map(function (item) {
      return lastMove - item;
    }) : false;
    if (typeof horizontalThreatDiff[0] === 'number' && !gameModel.grid[this.nullifyHorizontalThreat(lastMove, horizontalThreatDiff[0])]) {
      return this.nullifyHorizontalThreat(lastMove, horizontalThreatDiff[0]);
    } else {
      return false;
    }
  },
  nullifyHorizontalThreat: function nullifyHorizontalThreat(lastMove, diff) {
    var threateningMoves = [lastMove, lastMove - diff];
    var movesLtoG = threateningMoves.sort(function (a, b) {
      return a - b;
    });
    switch (true) {
      case (movesLtoG[0] === 0 || movesLtoG[0] === 3 || movesLtoG[0] === 6) && Math.abs(diff) === 1:
        return movesLtoG[0] + 2;
      case (movesLtoG[0] === 0 || movesLtoG[0] === 3 || movesLtoG[0] === 6) && Math.abs(diff) === 2:
        return movesLtoG[0] + 1;
      case (movesLtoG[0] === 1 || movesLtoG[0] === 4 || movesLtoG[0] === 7) && Math.abs(diff) === 1:
        return movesLtoG[0] - 1;
    }
  },
  checkDiagonalThreat: function checkDiagonalThreat() {
    var lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    var diagonalThreats = gameModel.player_data.moveHistory.filter(function (item) {
      if (item !== lastMove) {
        switch (lastMove) {
          case 4:
            return item === 2 || item === 6;
          case 0:
          case 8:
            return item === 4 || item === 0 || item === 8;
          case 2:
          case 6:
            return item === 4 || item === 2 || item === 6;
        }
      }
    });
    var diagonalThreatDiff = typeof diagonalThreats[0] === 'number' ? diagonalThreats.map(function (item) {
      return lastMove - item;
    }) : false;
    if (typeof diagonalThreatDiff[0] === 'number' && !gameModel.grid[this.nullifyDiagonalThreat(lastMove, diagonalThreatDiff[0])]) {
      return this.nullifyDiagonalThreat(lastMove, diagonalThreatDiff);
    } else {
      return false;
    }
  },
  nullifyDiagonalThreat: function nullifyDiagonalThreat(lastMove, diff) {
    var threateningMoves = [lastMove, lastMove - diff];
    var movesLtoG = threateningMoves.sort(function (a, b) {
      return a - b;
    });
    switch (true) {
      case movesLtoG[0] === 4 && Math.abs(diff) === 2:
        return 2;
      case movesLtoG[0] === 4 && Math.abs(diff) === 4:
        return 0;
      case movesLtoG[0] === 0 && Math.abs(diff) === 4:
        return 8;
      case movesLtoG[0] === 0 && Math.abs(diff) === 8:
        return 4;
      case movesLtoG[0] === 2 && Math.abs(diff) === 2:
        return 6;
      case movesLtoG[0] === 4 && Math.abs(diff) === 6:
        return 4;
    }
  },
  getRandomEmptySquare: function getRandomEmptySquare() {
    var emptySpots = [];
    gameModel.grid.forEach(function (square, index) {
      if (!square) {
        emptySpots.push(index);
      }
    });
    return emptySpots[this.randomIndexPicker(emptySpots.length)];
  },
  randomIndexPicker: function randomIndexPicker(lengthOfArray) {
    return Math.floor(Math.random() * lengthOfArray);
  },
  pursueVerticalWin: function pursueVerticalWin() {
    var columnData = this.analyzeColumns(),
        potentialNextMoves = [];
    if (columnData) {
      columnData.column.forEach(function (gridIndex) {
        if (!gameModel.grid[gridIndex]) {
          potentialNextMoves.push(gridIndex);
        }
      });
      if (columnData.score > 1) {
        return { move: potentialNextMoves[0], score: columnData.score };
      } else {
        return { move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: columnData.score };
      }
    } else {
      return { score: -99 };
    }
  },
  analyzeColumns: function analyzeColumns() {
    var _this = this;

    var columnScores = {
      1: 0, 2: 0, 3: 0 },
        col1 = [0, 3, 6],
        col2 = [1, 4, 7],
        col3 = [2, 5, 8];
    col1.forEach(function (square) {
      columnScores['1'] += _this.scoreSquare(gameModel.grid[square]);
    });
    col2.forEach(function (square) {
      columnScores['2'] += _this.scoreSquare(gameModel.grid[square]);
    });
    col3.forEach(function (square) {
      columnScores['3'] += _this.scoreSquare(gameModel.grid[square]);
    });
    var targetColumn = Object.entries(columnScores).sort(function (a, b) {
      return b[1] - a[1];
    })[0][0];
    if (columnScores[targetColumn] > 1) {
      switch (targetColumn) {
        case '1':
          return { column: col1, score: columnScores[targetColumn] };
        case '2':
          return { column: col2, score: columnScores[targetColumn] };
        case '3':
          return { column: col3, score: columnScores[targetColumn] };
      }
    } else {
      return false;
    }
  },
  pursueHorizontalWin: function pursueHorizontalWin() {
    var rowData = this.analyzeRows(),
        potentialNextMoves = [];
    if (rowData) {
      rowData.row.forEach(function (gridIndex) {
        if (!gameModel.grid[gridIndex]) {
          potentialNextMoves.push(gridIndex);
        }
      });
      if (rowData.score > 1) {
        return { move: potentialNextMoves[0], score: rowData.score };
      } else {
        return { move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: rowData.score };
      }
    } else {
      return { score: -99 };
    }
  },
  analyzeRows: function analyzeRows() {
    var _this2 = this;

    var rowScores = {
      1: 0, 2: 0, 3: 0 },
        row1 = [0, 1, 2],
        row2 = [3, 4, 5],
        row3 = [6, 7, 8];
    row1.forEach(function (square) {
      rowScores['1'] += _this2.scoreSquare(gameModel.grid[square]);
    });
    row2.forEach(function (square) {
      rowScores['2'] += _this2.scoreSquare(gameModel.grid[square]);
    });
    row3.forEach(function (square) {
      rowScores['3'] += _this2.scoreSquare(gameModel.grid[square]);
    });
    var targetRow = Object.entries(rowScores).sort(function (a, b) {
      return b[1] - a[1];
    })[0][0];
    if (rowScores[targetRow] > 1) {
      switch (targetRow) {
        case '1':
          return { row: row1, score: rowScores[targetRow] };
        case '2':
          return { row: row2, score: rowScores[targetRow] };
        case '3':
          return { row: row3, score: rowScores[targetRow] };
      }
    } else {
      return false;
    }
  },
  pursueDiagonalWin: function pursueDiagonalWin() {
    var diagData = this.analyzeDiagonals(),
        potentialNextMoves = [];
    if (diagData) {
      diagData.diagonal.forEach(function (gridIndex) {
        if (!gameModel.grid[gridIndex]) {
          potentialNextMoves.push(gridIndex);
        }
      });
      if (diagData.score > 1) {
        return { move: potentialNextMoves[0], score: diagData.score };
      } else {
        return { move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: diagData.score };
      }
    } else {
      return { score: -99 };
    }
  },
  analyzeDiagonals: function analyzeDiagonals() {
    var _this3 = this;

    var diagScores = {
      1: 0, 2: 0 },
        diag1 = [0, 4, 8],
        diag2 = [2, 4, 6];
    diag1.forEach(function (square) {
      diagScores['1'] += _this3.scoreSquare(gameModel.grid[square]);
    });
    diag2.forEach(function (square) {
      diagScores['2'] += _this3.scoreSquare(gameModel.grid[square]);
    });
    var targetDiag = Object.entries(diagScores).sort(function (a, b) {
      return b[1] - a[1];
    })[0][0];
    if (diagScores[targetDiag] > 1) {
      switch (targetDiag) {
        case '1':
          return { diagonal: diag1, score: diagScores[targetDiag] };
        case '2':
          return { diagonal: diag2, score: diagScores[targetDiag] };
      }
    } else {
      return false;
    }
  },
  scoreSquare: function scoreSquare(squareContent) {
    var score = 0;
    switch (squareContent) {
      case gameModel.player_data.shape:
        score -= 99;
        break;
      case gameModel.CPU_data.shape:
        score++;
        break;
      default:
        score = 0;
        break;
    }
    return score;
  }
};

var gameView = {
  init: function init() {
    this.cacheDome();
    this.bindEvents();
    this.drawBoardGrid();
  },
  cacheDome: function cacheDome() {
    this.board = document.querySelector(".board");
    this.board_grid = document.querySelector(".board-grid");
    this.squares = this.board.getElementsByClassName("board__square");
  },
  bindEvents: function bindEvents() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].addEventListener('click', gameController.processPlayerMove.bind(gameController));
    }
  },
  drawBoardGrid: function drawBoardGrid() {
    __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#vertical1', { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500, delay: 200 }).start();
    __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#vertical2', { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500, delay: 400 }).start();
    __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#horizontal1', { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500, delay: 600 }).start();
    __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#horizontal2', { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500, delay: 800 }).start();
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      var startTime = 200 * i;
      __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.to(square.firstChild, { opacity: 1 }, { duration: 1000, delay: startTime }).start();
    }
    this.loadBoard();
  },
  loadBoard: function loadBoard() {
    this.board.classList.remove("hide-before-load");
    // IE does not support classlist on SVG
    this.board_grid.style.visibility = 'visible';
  },
  getCurrentSquare: function getCurrentSquare(id) {
    // ARRAY.FROM NOT SUPPORTED IN IE
    // let squaresArray = Array.from(this.squares),
    //     targetIndex = squaresArray.findIndex((item) => {
    //   return item.id == id;
    // });
    var targetIndex = void 0;
    for (var i = 0, keys = Object.keys(this.squares); i < keys.length; i++) {
      if (this.squares[keys[i]].id == id) {
        targetIndex = i;
        break;
      }
    }
    return this.squares[targetIndex];
  },
  render: function render() {
    var moveData = gameController.getMoveData();
    var square = this.getCurrentSquare(moveData.moveHistory[moveData.moveHistory.length - 1]);
    square.firstChild.innerHTML = this.insertShape(square.id, moveData.shape);
    this.drawShape(square.id, moveData.shape);
  },
  insertShape: function insertShape(id, shape) {
    if (shape === 'X') {
      return '<svg class="svg-X" style="stroke-dasharray: 110; stroke-dashoffset: 110;" width="75" height="75" viewBox="0 0 75 75">\n                <path id="diag_right' + id + '" d="m 0 0 75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>\n                <path id="diag_left' + id + '" d="m 75 0 -75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>\n              </svg>';
    } else {
      return '<svg class="svg-O" style="stroke-dasharray: 110; stroke-dashoffset: 110;" width="90" height="90" viewBox="3 0 21 21">\n                  <path id="circle' + id + '" d="m 13.455845,1.0098512 c -5.4054596,0.019625 -9.7717564,4.3583082 -9.7523971,9.6907208 0.019359,5.332414 4.4170437,9.63928 9.8225031,9.619655 5.40546,-0.01962 9.771757,-4.358308 9.752397,-9.690721 -0.01936,-5.3324135 -4.417044,-9.63927948 -9.822503,-9.6196548 z" fill="transparent" stroke="hsla(42, 100%, 76%, 1)" stroke-width="0.65"/>\n               </svg>';
    }
  },
  drawShape: function drawShape(id, shape) {
    if (shape === 'X') {
      __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#diag_right' + id, { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500 }).start();
      __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#diag_left' + id, { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 500, delay: 300 }).start();
    } else {
      __WEBPACK_IMPORTED_MODULE_2_kute_js___default.a.fromTo('#circle' + id, { draw: '0% 0%' }, { draw: '0% 100%' }, { duration: 1500 }).start();
    }
  },
  reset: function reset() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].firstChild.textContent = '';
    }
  }
};

var coreViewProps = function coreViewProps(state) {
  var rootEl = state.root,
      buttonEl = void 0,
      bindEvents = void 0;
  if (state.buttons === 1) {
    buttonEl = rootEl.querySelector("button"), bindEvents = function bindEvents() {
      buttonEl.addEventListener('click', state.handler);
    };
  } else if (state.buttons === 2) {
    buttonEl = rootEl.querySelectorAll("button"), bindEvents = function bindEvents() {
      // ARRAY.FROM NOT SUPPORT IN IE
      // let buttons = Array.from(this.gameStartButtons);
      // buttons.forEach((button) => {
      //   button.addEventListener('click', gameController.startGame.bind(gameController));
      // });
      for (var i = 0, keys = Object.keys(buttonEl); i < keys.length; i++) {
        buttonEl[keys[i]].addEventListener('click', state.handler);
      }
    };
  }
  var slideIn = function slideIn() {
    setTimeout(function () {
      rootEl.classList.add("message--slide-in");
    }, 100);
  },
      slideOut = function slideOut() {
    setTimeout(function () {
      rootEl.classList.remove("message--slide-in");
    }, 100);
  };
  return {
    init: function init() {
      bindEvents();
    },
    slideIn: slideIn,
    slideOut: slideOut
  };
};

var specialMessageProps = function specialMessageProps(state) {
  var messageEl = state.root.querySelector(state.messageEl);
  return {
    setMessage: function setMessage() {
      var message = gameController.getVerdict() ? gameController.getVerdict() + ' wins!' : 'draw!';
      messageEl.textContent = message;
    }
  };
};

var gameStartPrompt = function () {
  var state = {
    root: document.getElementById('game-start'),
    buttons: 2,
    handler: gameController.startGame.bind(gameController)
  };
  return Object.assign({}, coreViewProps(state));
}();

var idlePrompt = function () {
  var state = {
    root: document.getElementById("idle-message"),
    buttons: 1,
    handler: function handler() {
      gameController.processPlayerActive();
      gameController.hideIdleMessage();
    }
  };
  return Object.assign({}, coreViewProps(state));
}();

var chooseAnotherPrompt = function () {
  var state = {
    root: document.getElementById('choose-message'),
    buttons: 1,
    handler: gameController.hideChooseMessage
  };
  return Object.assign({}, coreViewProps(state));
}();

var gameEndPrompt = function () {
  var state = {
    root: document.getElementById('game-end'),
    buttons: 1,
    messageEl: '.message__verdict',
    handler: gameController.resetGame
  };
  return Object.assign({}, coreViewProps(state), specialMessageProps(state));
}();

gameController.init();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(29) });


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var IE8_DOM_DEFINE = __webpack_require__(22);
var toPrimitive = __webpack_require__(24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(23)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(7);
var has = __webpack_require__(8);
var SRC = __webpack_require__(9)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(1).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(10);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(14);
var toObject = __webpack_require__(39);
var IObject = __webpack_require__(11);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(32)(false);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(33);
var toAbsoluteIndex = __webpack_require__(34);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys');
var uid = __webpack_require__(9);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
module.exports = __webpack_require__(1).Object.entries;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(6);
var $entries = __webpack_require__(42)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(10);
var toIObject = __webpack_require__(5);
var isEnum = __webpack_require__(14).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* KUTE.js - The Light Tweening Engine
 * package - SVG Plugin
 * desc - draw SVG strokes, morph SVG and SVG transforms
 * by dnp_theme
 * Licensed under MIT-License
 */

(function (root,factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if(typeof module == 'object' && typeof require == 'function') {
    module.exports = factory(require('./kute.js'));
  } else if ( typeof root.KUTE !== 'undefined' ) {
    factory(root.KUTE);
  } else {
    throw new Error("SVG Plugin require KUTE.js.");
  }
}(this, function(KUTE) {
  'use strict';

  var g = typeof global !== 'undefined' ? global : window, K = KUTE, // connect plugin to KUTE object and global
    DOM = K.dom, parseProperty = K.parseProperty, prepareStart = K.prepareStart, getCurrentStyle = K.getCurrentStyle,
    trueColor = K.truC, trueDimension = K.truD, crossCheck = K.crossCheck,
    number = g.Interpolate.number, unit = g.Interpolate.unit, color = g.Interpolate.color, // interpolate functions
    defaultOptions = K.defaultOptions, // default tween options since 1.6.1

    // browser detection
    isIE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null ? parseFloat( RegExp.$1 ) : false;

  if (isIE&&isIE<9) {return;} // return if SVG API is not supported

  // here we go with the plugin
  var pathReg = /(m[^(h|v|l)]*|[vhl][^(v|h|l|z)]*)/gmi, ns = 'http://www.w3.org/2000/svg',
    // function(array1, array2, length, progress) for SVG morph
    coords = g.Interpolate.coords = function(a,b,l,v) {
      var points = [];
      for(var i=0;i<l;i++) { // for each point
        points[i] = [];
        for(var j=0;j<2;j++) { // each point coordinate
          points[i].push( ((a[i][j]+(b[i][j]-a[i][j])*v) * 1000 >> 0)/1000 );
        }
      }
      return points;
    };


  // SVG MORPH
  var getSegments = function(s,e,r){ // getSegments returns an array of points based on a sample size morphPrecision
      var s1 = [], e1 = [], le1 = s.getTotalLength(), le2 = e.getTotalLength(), ml = Math.max(le1,le2),
        d = r, ar = ml / r, j = 0, sl = ar*r; // sl = sample length

      while ( (j += r) < sl ) { // populate the points arrays based on morphPrecision as sample size
        s1.push( [s.getPointAtLength(j).x, s.getPointAtLength(j).y]);
        e1.push( [e.getPointAtLength(j).x, e.getPointAtLength(j).y]);
      }
      return [s1,e1];
    },
    getClosestPoint = function(p,t,s){ // utility for polygon paths, returns a close point from the original path (length,pointAtLength,smallest); // intervalLength
      var x, y, a = [], l = s.length, dx, nx, pr;
      for (var i=0; i<l; i++){
        x = Math.abs(s[i][0] - t.x);
        y = Math.abs(s[i][1] - t.y);
        a.push( Math.sqrt( x * x + y * y ) );
      }
      dx = a.indexOf(Math.min.apply(null,a));
      pr = !!s[dx-1] ? dx-1 : l-1;
      nx = !!s[dx+1] ? dx+1 : 0;
      return Math.abs(s[pr][0] - t.x) < p && Math.abs(s[pr][1] - t.y) < p ? s[pr]
      : Math.abs(s[nx][0] - t.x) < p && Math.abs(s[nx][1] - t.y) < p ? s[nx]
      : Math.abs(s[dx][0] - t.x) < p && Math.abs(s[dx][1] - t.y) < p ? s[dx]
      : [t.x,t.y];
    },
    pathToAbsolute = function(p) { // simple utility for polygons | this is still BETA / a work in progress
      var np = p.match(pathReg), wp = [], l = np.length, s, c, r, x = 0, y = 0;
      for (var i = 0; i<l; i++){
        np[i] = np[i]; c = np[i][0]; r = new RegExp(c+'[^\\d|\\-]*','i');
        np[i] = np[i].replace(/(^|[^,])\s*-/g, '$1,-').replace(/(\s+\,|\s|\,)/g,',').replace(r,'').split(',');
        np[i][0] = parseFloat(np[i][0]);
        np[i][1] = parseFloat(np[i][1]);
        if (i === 0) { x+=np[i][0]; y +=np[i][1]; }
        else {
          x = np[i-1][0];
          y = np[i-1][1];
          if (/l/i.test(c)) {
            np[i][0] = c === 'l' ? np[i][0] + x : np[i][0];
            np[i][1] = c === 'l' ? np[i][1] + y : np[i][1];
          } else if (/h/i.test(c)) {
            np[i][0] = c === 'h' ? np[i][0] + x : np[i][0];
            np[i][1] = y;
          } else if (/v/i.test(c)) {
            np[i][0] = x;
            np[i][1] = c === 'v' ? np[i][0] + y : np[i][0];
          }
        }
      }
      return np;
    },
    getOnePath = function(p){ return p.split(/z/i).shift() + 'z'; }, // we only tween first path only
    createPath = function (p){ // create a <path> when glyph
      var createdPath = document.createElementNS(ns,'path'), d = typeof p === 'object' ? p.getAttribute('d') : p;
      createdPath.setAttribute('d',d); return createdPath;
    },
    forcePath = function(p){ // forcePath for glyph elements
      if (p.tagName === 'glyph') { // perhaps we can also change other SVG tags in the future
        var c = createPath(p); p.parentNode.appendChild(c); return c;
      }
      return p;
    },
    clone = function(a) {
      var copy;
      if (a instanceof Array) {
        copy = [];
        for (var i = 0, len = a.length; i < len; i++) {
          copy[i] = clone(a[i]);
        }
        return copy;
      }
      return a;
    },
    getPath = function(e){ // get path d attribute or create a path from string value
      var p = {}, el = typeof e === 'object' ? e : /^\.|^\#/.test(e) ? document.querySelector(e) : null;
      if ( el && /path|glyph/.test(el.tagName) ) {
        p.e = forcePath(el);
        p.o = el.getAttribute('d');

      } else if (!el && /[a-z][^a-z]*/ig.test(e)) { // maybe it's a string path already
        p.e = createPath(e.trim());
        p.o = e;
      }
      return p;
    },
    computePathCross = function(s,e){ // pathCross
      var s1, e1, pointsArray, largerPathLength, smallerPath, largerPath, simulatedSmallerPath, nsm = [], sml, cl = [], len, tl, cs,
        index = this.options.morphIndex;

      if (!this._isPolygon) {
        s = createPath(s); e = createPath(e);
        pointsArray = getSegments(s,e,this.options.morphPrecision);
        s1 = pointsArray[0]; e1 = pointsArray[1]; largerPathLength = e1.length;
      } else {
        s = pathToAbsolute(s); e = pathToAbsolute(e);

        if ( s.length !== e.length ){
          largerPathLength = Math.max(s.length,e.length);
          if ( largerPathLength === e.length) { smallerPath = s; largerPath = e; } else { smallerPath = e; largerPath = s; }
          sml = smallerPath.length;

          simulatedSmallerPath = createPath('M'+smallerPath.join('L')+'z'); len = simulatedSmallerPath.getTotalLength() / largerPathLength;
          for (var i=0; i<largerPathLength; i++){
            tl = simulatedSmallerPath.getPointAtLength(len*i);
            cs = getClosestPoint(len,tl,smallerPath);
            nsm.push( [ cs[0], cs[1] ] );
          }

          if (largerPathLength === e.length) { e1 = largerPath; s1 = nsm; } else { s1 = largerPath; e1 = nsm; }
        } else {
          s1 = s; e1 = e;
        }
      }

      // reverse arrays
      if (this.options.reverseFirstPath) { s1.reverse(); }
      if (this.options.reverseSecondPath) { e1.reverse(); }

      // shift second array to for smallest tween distance
      if (index) {
        var e11 = e1.splice(index,largerPathLength-index);
        e1 = e11.concat(e1);
      }

      s = e = null;
      return [s1,e1]
    };

  // set default morphPrecision since 1.6.1
  defaultOptions.morphPrecision = 15;

  // process path object and also register the render function
  parseProperty.path = function(o,v) {
    if (!('path' in DOM)) {
      DOM.path = function(l,p,a,b,v){
        l.setAttribute("d", v === 1 ? b.o : 'M' + coords( a['d'],b['d'],b['d'].length,v ) + 'Z' );
      }
    }
    return getPath(v);
  };

  prepareStart.path = function(p){
    return this.element.getAttribute('d');
  };

  crossCheck.path = function() { // unlike other cases, the crossCheck apply to both to() and fromTo() methods
    var p1 = getOnePath(this.valuesStart.path.o), p2 = getOnePath(this.valuesEnd.path.o), paths;

    // path tween options
    this.options.morphPrecision = this.options && 'morphPrecision' in this.options ? parseInt(this.options.morphPrecision) : defaultOptions.morphPrecision;
    this._isPolygon = !/[CSQTA]/i.test(p1) && !/[CSQTA]/i.test(p2); // check if both shapes are polygons

    // begin processing paths
    paths = computePathCross.apply(this,[p1,p2]);

    this.valuesStart.path.d = paths[0];
    this.valuesEnd.path.d = paths[1];
  };


  // SVG DRAW
  var percent = function(v,l){ return parseFloat(v) / 100 * l; },
    // SVG DRAW UTILITITES
    // http://stackoverflow.com/a/30376660
    getRectLength = function(el){ // returns the length of a Rect
      var w = el.getAttribute('width');
      var h = el.getAttribute('height');
      return (w*2)+(h*2);
    },
    getPolyLength = function(el){ // getPolygonLength / getPolylineLength - return the length of the Polygon / Polyline
      var points = el.getAttribute('points').split(' '), len = 0;
      if (points.length > 1) {
        var coord = function (p) {
          var c = p.split(',');
          if (c.length != 2) { return; } // return undefined
          if (isNaN(c[0]) || isNaN(c[1])) { return; }
          return [parseFloat(c[0]), parseFloat(c[1])];
        };

        var dist = function (c1, c2) {
          if (c1 != undefined && c2 != undefined) {
            return Math.sqrt(Math.pow((c2[0]-c1[0]), 2) + Math.pow((c2[1]-c1[1]), 2));
          }
          return 0;
        };

        if (points.length > 2) {
          for (var i=0; i<points.length-1; i++) {
            len += dist(coord(points[i]), coord(points[i+1]));
          }
        }
        len += dist(coord(points[0]), coord(points[points.length-1]));
      }
      return len;
    },
    getLineLength = function(el){ // return the length of the line
      var x1 = el.getAttribute('x1');
      var x2 = el.getAttribute('x2');
      var y1 = el.getAttribute('y1');
      var y2 = el.getAttribute('y2');
      return Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));
    },
    getCircleLength = function(el){ // return the length of the circle
      var r = el.getAttribute('r');
      return 2 * Math.PI * r;
    },
    getEllipseLength = function(el) { // returns the length of an ellipse
      var rx = el.getAttribute('rx'), ry = el.getAttribute('ry'),
          len = 2*rx, wid = 2*ry;
      return ((Math.sqrt(.5 * ((len * len) + (wid * wid)))) * (Math.PI * 2)) / 2;
    },
    getTotalLength = function(el){ // returns the result of any of the below functions
      if (/rect/.test(el.tagName)) {
        return getRectLength(el);
      } else if (/circle/.test(el.tagName)) {
        return getCircleLength(el);
      } else if (/ellipse/.test(el.tagName)) {
        return getEllipseLength(el);
      } else if (/polygon|polyline/.test(el.tagName)) {
        return getPolyLength(el);
      } else if (/line/.test(el.tagName)) {
        return getLineLength(el);
      }
    },
    getDraw = function(e,v){
      var l = /path|glyph/.test(e.tagName) ? e.getTotalLength() : getTotalLength(e), start, end, d, o;
      if ( v instanceof Object ) {
        return v;
      } else if (typeof v === 'string') {
        v = v.split(/\,|\s/);
        start = /%/.test(v[0]) ? percent(v[0].trim(),l) : parseFloat(v[0]);
        end = /%/.test(v[1]) ? percent(v[1].trim(),l) : parseFloat(v[1]);
      } else if (typeof v === 'undefined') {
        o = parseFloat(getCurrentStyle(e,'stroke-dashoffset'));
        d = getCurrentStyle(e,'stroke-dasharray').split(/\,/);

        start = 0-o;
        end = parseFloat(d[0]) + start || l;
      }
      return { s: start, e: end, l: l }
    };

  parseProperty.draw = function(a,o){ // register the draw property
    if (!('draw' in DOM)) {
      DOM.draw = function(l,p,a,b,v){
        var pathLength = (a.l*100>>0)/100, start = (number(a.s,b.s,v)*100>>0)/100, end = (number(a.e,b.e,v)*100>>0)/100,
        offset = 0 - start, dashOne = end+offset;
        l.style.strokeDashoffset = offset +'px';
        l.style.strokeDasharray = (((dashOne <1 ? 0 : dashOne)*100>>0)/100) + 'px, ' + pathLength + 'px';
      }
    }
    return getDraw(this.element,o);
  }

  prepareStart.draw = function(){
    return getDraw(this.element);
  }


  // SVG Transform
  var parseStringOrigin = function(origin,box){
      return /[a-zA-Z]/.test(origin) && !/px/.test(origin) ? origin.replace(/top|left/,0).replace(/right|bottom/,100).replace(/center|middle/,50)
                                     : /%/.test(origin) ? (box.x + parseFloat(origin) * box.width / 100) : parseFloat(origin);
    },
    parseTransformString = function (a){ // helper function that turns transform value from string to object
      var d = a && /\)/.test(a) ? a.substring(0, a.length-1).split(/\)\s|\)/) : 'none', c = {};

      if (d instanceof Array) {
        for (var j=0, jl = d.length; j<jl; j++){
          var p = d[j].trim().split('('); c[p[0]] = p[1];
        }
      }
      return c;
    },
    parseTransformObject = function(v){
      var svgTransformObject = {}, bb = this.element.getBBox(),
        cx = bb.x + bb.width/2, cy = bb.y + bb.height/2, // by default the transformOrigin is "50% 50%" of the shape box
        origin = this.options.transformOrigin, translation;

      origin = !!origin ? (origin instanceof Array ? origin : origin.split(/\s/)) : [cx,cy];

      origin[0] = typeof origin[0] === 'number' ? origin[0] : parseStringOrigin(origin[0],bb);
      origin[1] = typeof origin[1] === 'number' ? origin[1] : parseStringOrigin(origin[1],bb);

      svgTransformObject.origin = origin;

      for ( var i in v ) { // populate the valuesStart and / or valuesEnd
        if (i === 'rotate'){
          svgTransformObject[i] = typeof v[i] === 'number' ? v[i] : v[i] instanceof Array ? v[i][0] : v[i].split(/\s/)[0]*1;
        } else if (i === 'translate'){
          translation = v[i] instanceof Array ? v[i] : /\,|\s/.test(v[i]) ? v[i].split(',') : [v[i],0];
          svgTransformObject[i] = [translation[0]*1||0, translation[1]*1||0];
        } else if (/skew/.test(i)) {
          svgTransformObject[i] = v[i]*1||0;
        } else if (i === 'scale'){
          svgTransformObject[i] = parseFloat(v[i])||1;
        }
      }

      return svgTransformObject;
    };

  parseProperty.svgTransform = function(p,v){
    // register the render function
    if (!('svgTransform' in DOM)) {
      DOM.svgTransform = function(l,p,a,b,v){
        var x = 0, y = 0, tmp, deg = Math.PI/180,
          scale = 'scale' in b ? number(a.scale,b.scale,v) : 1,
          rotate = 'rotate' in b ? number(a.rotate,b.rotate,v) : 0,
          sin = Math.sin(rotate*deg), cos = Math.cos(rotate*deg),
          skewX = 'skewX' in b ? number(a.skewX,b.skewX,v) : 0,
          skewY = 'skewY' in b ? number(a.skewY,b.skewY,v) : 0,
          complex = rotate||skewX||skewY||scale!==1 || 0;

        // start normalizing the translation, we start from last to first (from last chained translation)
        // the normalized translation will handle the transformOrigin tween option and makes sure to have a consistent transformation
        x -= complex ? b.origin[0] : 0; y -= complex ? b.origin[1] : 0; // we start with removing transformOrigin from translation
        x *= scale; y *= scale; // we now apply the scale
        y += skewY ? x*Math.tan(skewY*deg) : 0; x += skewX ? y*Math.tan(skewX*deg) : 0; // now we apply skews
        tmp = cos*x - sin*y; // apply rotation as well
        y = rotate ? sin*x + cos*y : y; x = rotate ? tmp : x;
        x += 'translate' in b ? number(a.translate[0],b.translate[0],v) : 0; // now we apply the actual translation
        y += 'translate' in b ? number(a.translate[1],b.translate[1],v) : 0;
        x += complex ? b.origin[0] : 0; y += complex ? b.origin[1] : 0; // normalizing ends with the addition of the transformOrigin to the translation

        // finally we apply the transform attribute value
        l.setAttribute('transform', ( x||y ? ('translate(' + (x*1000>>0)/1000 + ( y ? (',' + ((y*1000>>0)/1000)) : '') + ')') : '' )
                                    +( rotate ? 'rotate(' + (rotate*1000>>0)/1000 + ')' : '' )
                                    +( skewX ? 'skewX(' + (skewX*1000>>0)/1000 + ')' : '' )
                                    +( skewY ? 'skewY(' + (skewY*1000>>0)/1000 + ')' : '' )
                                    +( scale !== 1 ? 'scale(' + (scale*1000>>0)/1000 +')' : '' ) );
      }
    }

    // now prepare transform
    return parseTransformObject.call(this,v);
  }

  // returns an obect with current transform attribute value
  prepareStart.svgTransform = function(p,t) {
    var transformObject = {}, currentTransform = parseTransformString(this.element.getAttribute('transform'));
    for (var i in t) { transformObject[i] = i in currentTransform ? currentTransform[i] : (i==='scale'?1:0); } // find a value in current attribute value or add a default value
    return transformObject;
  }

  crossCheck.svgTransform = function() { // helper function that helps preserve current transform properties into the objects
    if (!this.options.rpr) return; // fix since 1.6.1 for fromTo() method
    var valuesStart = this.valuesStart.svgTransform, valuesEnd = this.valuesEnd.svgTransform,
      currentTransform = parseTransformObject.call(this, parseTransformString(this.element.getAttribute('transform')) );

    for ( var i in currentTransform ) { valuesStart[i] = currentTransform[i]; } // populate the valuesStart first

    // now try to determine the REAL translation
    var parentSVG = this.element.ownerSVGElement,
      newTransform = parentSVG.createSVGTransformFromMatrix(
        parentSVG.createSVGMatrix()
        .translate(-valuesStart.origin[0],-valuesStart.origin[1]) // - origin
        .translate('translate' in valuesStart ? valuesStart.translate[0] : 0,'translate' in valuesStart ? valuesStart.translate[1] : 0) // the current translate
        .rotate(valuesStart.rotate||0).skewX(valuesStart.skewX||0).skewY(valuesStart.skewY||0).scale(valuesStart.scale||1)// the other functions
        .translate(+valuesStart.origin[0],+valuesStart.origin[1]) // + origin
      );

    valuesStart.translate = [newTransform.matrix.e,newTransform.matrix.f]; // finally the translate we're looking for

    // copy existing and unused properties to the valuesEnd
    for ( var i in valuesStart) { if ( !(i in valuesEnd)) { valuesEnd[i] = valuesStart[i]; } }
  }

  return this;
}));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "style.css";

/***/ })
/******/ ]);