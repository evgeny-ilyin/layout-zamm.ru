/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 18:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function() {
  "use strict";

  var FormatOptions = [
    "decimals",
    "thousand",
    "mark",
    "prefix",
    "suffix",
    "encoder",
    "decoder",
    "negativeBefore",
    "negative",
    "edit",
    "undo"
  ];

  // General

  // Reverse a string
  function strReverse(a) {
    return a
      .split("")
      .reverse()
      .join("");
  }

  // Check if a string starts with a specified prefix.
  function strStartsWith(input, match) {
    return input.substring(0, match.length) === match;
  }

  // Check is a string ends in a specified suffix.
  function strEndsWith(input, match) {
    return input.slice(-1 * match.length) === match;
  }

  // Throw an error if formatting options are incompatible.
  function throwEqualError(F, a, b) {
    if ((F[a] || F[b]) && F[a] === F[b]) {
      throw new Error(a);
    }
  }

  // Check if a number is finite and not NaN
  function isValidNumber(input) {
    return typeof input === "number" && isFinite(input);
  }

  // Provide rounding-accurate toFixed method.
  // Borrowed: http://stackoverflow.com/a/21323330/775265
  function toFixed(value, exp) {
    value = value.toString().split("e");
    value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));
    value = value.toString().split("e");
    return (+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp))).toFixed(exp);
  }

  // Formatting

  // Accept a number as input, output formatted string.
  function formatTo(
    decimals,
    thousand,
    mark,
    prefix,
    suffix,
    encoder,
    decoder,
    negativeBefore,
    negative,
    edit,
    undo,
    input
  ) {
    var originalInput = input,
      inputIsNegative,
      inputPieces,
      inputBase,
      inputDecimals = "",
      output = "";

    // Apply user encoder to the input.
    // Expected outcome: number.
    if (encoder) {
      input = encoder(input);
    }

    // Stop if no valid number was provided, the number is infinite or NaN.
    if (!isValidNumber(input)) {
      return false;
    }

    // Rounding away decimals might cause a value of -0
    // when using very small ranges. Remove those cases.
    if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
      input = 0;
    }

    // Formatting is done on absolute numbers,
    // decorated by an optional negative symbol.
    if (input < 0) {
      inputIsNegative = true;
      input = Math.abs(input);
    }

    // Reduce the number of decimals to the specified option.
    if (decimals !== false) {
      input = toFixed(input, decimals);
    }

    // Transform the number into a string, so it can be split.
    input = input.toString();

    // Break the number on the decimal separator.
    if (input.indexOf(".") !== -1) {
      inputPieces = input.split(".");

      inputBase = inputPieces[0];

      if (mark) {
        inputDecimals = mark + inputPieces[1];
      }
    } else {
      // If it isn't split, the entire number will do.
      inputBase = input;
    }

    // Group numbers in sets of three.
    if (thousand) {
      inputBase = strReverse(inputBase).match(/.{1,3}/g);
      inputBase = strReverse(inputBase.join(strReverse(thousand)));
    }

    // If the number is negative, prefix with negation symbol.
    if (inputIsNegative && negativeBefore) {
      output += negativeBefore;
    }

    // Prefix the number
    if (prefix) {
      output += prefix;
    }

    // Normal negative option comes after the prefix. Defaults to '-'.
    if (inputIsNegative && negative) {
      output += negative;
    }

    // Append the actual number.
    output += inputBase;
    output += inputDecimals;

    // Apply the suffix.
    if (suffix) {
      output += suffix;
    }

    // Run the output through a user-specified post-formatter.
    if (edit) {
      output = edit(output, originalInput);
    }

    // All done.
    return output;
  }

  // Accept a sting as input, output decoded number.
  function formatFrom(
    decimals,
    thousand,
    mark,
    prefix,
    suffix,
    encoder,
    decoder,
    negativeBefore,
    negative,
    edit,
    undo,
    input
  ) {
    var originalInput = input,
      inputIsNegative,
      output = "";

    // User defined pre-decoder. Result must be a non empty string.
    if (undo) {
      input = undo(input);
    }

    // Test the input. Can't be empty.
    if (!input || typeof input !== "string") {
      return false;
    }

    // If the string starts with the negativeBefore value: remove it.
    // Remember is was there, the number is negative.
    if (negativeBefore && strStartsWith(input, negativeBefore)) {
      input = input.replace(negativeBefore, "");
      inputIsNegative = true;
    }

    // Repeat the same procedure for the prefix.
    if (prefix && strStartsWith(input, prefix)) {
      input = input.replace(prefix, "");
    }

    // And again for negative.
    if (negative && strStartsWith(input, negative)) {
      input = input.replace(negative, "");
      inputIsNegative = true;
    }

    // Remove the suffix.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
    if (suffix && strEndsWith(input, suffix)) {
      input = input.slice(0, -1 * suffix.length);
    }

    // Remove the thousand grouping.
    if (thousand) {
      input = input.split(thousand).join("");
    }

    // Set the decimal separator back to period.
    if (mark) {
      input = input.replace(mark, ".");
    }

    // Prepend the negative symbol.
    if (inputIsNegative) {
      output += "-";
    }

    // Add the number
    output += input;

    // Trim all non-numeric characters (allow '.' and '-');
    output = output.replace(/[^0-9\.\-.]/g, "");

    // The value contains no parse-able number.
    if (output === "") {
      return false;
    }

    // Covert to number.
    output = Number(output);

    // Run the user-specified post-decoder.
    if (decoder) {
      output = decoder(output);
    }

    // Check is the output is valid, otherwise: return false.
    if (!isValidNumber(output)) {
      return false;
    }

    return output;
  }

  // Framework

  // Validate formatting options
  function validate(inputOptions) {
    var i,
      optionName,
      optionValue,
      filteredOptions = {};

    if (inputOptions["suffix"] === undefined) {
      inputOptions["suffix"] = inputOptions["postfix"];
    }

    for (i = 0; i < FormatOptions.length; i += 1) {
      optionName = FormatOptions[i];
      optionValue = inputOptions[optionName];

      if (optionValue === undefined) {
        // Only default if negativeBefore isn't set.
        if (optionName === "negative" && !filteredOptions.negativeBefore) {
          filteredOptions[optionName] = "-";
          // Don't set a default for mark when 'thousand' is set.
        } else if (optionName === "mark" && filteredOptions.thousand !== ".") {
          filteredOptions[optionName] = ".";
        } else {
          filteredOptions[optionName] = false;
        }

        // Floating points in JS are stable up to 7 decimals.
      } else if (optionName === "decimals") {
        if (optionValue >= 0 && optionValue < 8) {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }

        // These options, when provided, must be functions.
      } else if (
        optionName === "encoder" ||
        optionName === "decoder" ||
        optionName === "edit" ||
        optionName === "undo"
      ) {
        if (typeof optionValue === "function") {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }

        // Other options are strings.
      } else {
        if (typeof optionValue === "string") {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }
      }
    }

    // Some values can't be extracted from a
    // string if certain combinations are present.
    throwEqualError(filteredOptions, "mark", "thousand");
    throwEqualError(filteredOptions, "prefix", "negative");
    throwEqualError(filteredOptions, "prefix", "negativeBefore");

    return filteredOptions;
  }

  // Pass all options as function arguments
  function passAll(options, method, input) {
    var i,
      args = [];

    // Add all options in order of FormatOptions
    for (i = 0; i < FormatOptions.length; i += 1) {
      args.push(options[FormatOptions[i]]);
    }

    // Append the input, then call the method, presenting all
    // options as arguments.
    args.push(input);
    return method.apply("", args);
  }

  function wNumb(options) {
    if (!(this instanceof wNumb)) {
      return new wNumb(options);
    }

    if (typeof options !== "object") {
      return;
    }

    options = validate(options);

    // Call 'formatTo' with proper arguments.
    this.to = function(input) {
      return passAll(options, formatTo, input);
    };

    // Call 'formatFrom' with proper arguments.
    this.from = function(input) {
      return passAll(options, formatFrom, input);
    };
  }

  return wNumb;
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/@fancyapps/ui/dist/carousel/carousel.esm.js
const t=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),e=function(t,i=void 0){return!(!t||t===document.body||i&&t===i)&&(function(t){if(!(t&&t instanceof Element&&t.offsetParent))return!1;const e=t.scrollHeight>t.clientHeight,i=window.getComputedStyle(t).overflowY,n=-1!==i.indexOf("hidden"),s=-1!==i.indexOf("visible");return e&&!n&&!s}(t)?t:e(t.parentElement,i))},i=function(t){var e=(new DOMParser).parseFromString(t,"text/html").body;if(e.childElementCount>1){for(var i=document.createElement("div");e.firstChild;)i.appendChild(e.firstChild);return i}return e.firstChild},n=t=>`${t||""}`.split(" ").filter((t=>!!t)),s=(t,e,i)=>{n(e).forEach((e=>{t&&t.classList.toggle(e,i||!1)}))};class o{constructor(t){Object.defineProperty(this,"pageX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pageY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"time",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"nativePointer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.nativePointer=t,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.time=Date.now()}}const a={passive:!1};class r{constructor(t,{start:e=(()=>!0),move:i=(()=>{}),end:n=(()=>{})}){Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"startCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"moveCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"endCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"currentPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"startPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.element=t,this.startCallback=e,this.moveCallback=i,this.endCallback=n;for(const t of["onPointerStart","onTouchStart","onMove","onTouchEnd","onPointerEnd","onWindowBlur"])this[t]=this[t].bind(this);this.element.addEventListener("mousedown",this.onPointerStart,a),this.element.addEventListener("touchstart",this.onTouchStart,a),this.element.addEventListener("touchmove",this.onMove,a),this.element.addEventListener("touchend",this.onTouchEnd),this.element.addEventListener("touchcancel",this.onTouchEnd)}onPointerStart(t){if(!t.buttons||0!==t.button)return;const e=new o(t);this.currentPointers.some((t=>t.id===e.id))||this.triggerPointerStart(e,t)&&(window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseup",this.onPointerEnd),window.addEventListener("blur",this.onWindowBlur))}onTouchStart(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerStart(new o(e),t);window.addEventListener("blur",this.onWindowBlur)}onMove(t){const e=this.currentPointers.slice(),i="changedTouches"in t?Array.from(t.changedTouches||[]).map((t=>new o(t))):[new o(t)],n=[];for(const t of i){const e=this.currentPointers.findIndex((e=>e.id===t.id));e<0||(n.push(t),this.currentPointers[e]=t)}n.length&&this.moveCallback(t,this.currentPointers.slice(),e)}onPointerEnd(t){t.buttons>0&&0!==t.button||(this.triggerPointerEnd(t,new o(t)),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur))}onTouchEnd(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerEnd(t,new o(e))}triggerPointerStart(t,e){return!!this.startCallback(e,t,this.currentPointers.slice())&&(this.currentPointers.push(t),this.startPointers.push(t),!0)}triggerPointerEnd(t,e){const i=this.currentPointers.findIndex((t=>t.id===e.id));i<0||(this.currentPointers.splice(i,1),this.startPointers.splice(i,1),this.endCallback(t,e,this.currentPointers.slice()))}onWindowBlur(){this.clear()}clear(){for(;this.currentPointers.length;){const t=this.currentPointers[this.currentPointers.length-1];this.currentPointers.splice(this.currentPointers.length-1,1),this.startPointers.splice(this.currentPointers.length-1,1),this.endCallback(new Event("touchend",{bubbles:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY}),t,this.currentPointers.slice())}}stop(){this.element.removeEventListener("mousedown",this.onPointerStart,a),this.element.removeEventListener("touchstart",this.onTouchStart,a),this.element.removeEventListener("touchmove",this.onMove,a),this.element.removeEventListener("touchend",this.onTouchEnd),this.element.removeEventListener("touchcancel",this.onTouchEnd),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur)}}function l(t,e){return e?Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2)):0}function h(t,e){return e?{clientX:(t.clientX+e.clientX)/2,clientY:(t.clientY+e.clientY)/2}:t}const c=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),d=(t,...e)=>{const i=e.length;for(let n=0;n<i;n++){const i=e[n]||{};Object.entries(i).forEach((([e,i])=>{const n=Array.isArray(i)?[]:{};t[e]||Object.assign(t,{[e]:n}),c(i)?Object.assign(t[e],d(n,i)):Array.isArray(i)?Object.assign(t,{[e]:[...i]}):Object.assign(t,{[e]:i})}))}return t},u=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class g{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(t){this.options=t?d({},this.constructor.defaults,t):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...e){let i=u(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...n){let s=u(e,t);var o;"string"!=typeof(o=s)||isNaN(o)||isNaN(parseFloat(o))||(s=parseFloat(s)),"true"===s&&(s=!0),"false"===s&&(s=!1),s&&"function"==typeof s&&(s=s.call(this,this,t,...n));let a=u(e,this.options);return a&&"function"==typeof a?s=a.call(this,this,t,...n,s):void 0===s&&(s=a),void 0===s?i:s}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let n="";return i?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t),n}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i)}))}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(g,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.24"}),Object.defineProperty(g,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class p extends g{constructor(t={}){super(t),Object.defineProperty(this,"plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}})}attachPlugins(t={}){const e=new Map;for(const[i,n]of Object.entries(t)){const t=this.option(i),s=this.plugins[i];s||!1===t?s&&!1===t&&(s.detach(),delete this.plugins[i]):e.set(i,new n(this,t||{}))}for(const[t,i]of e)this.plugins[t]=i,i.attach()}detachPlugins(t){t=t||Object.keys(this.plugins);for(const e of t){const t=this.plugins[e];t&&t.detach(),delete this.plugins[e]}return this.emit("detachPlugins"),this}}var f;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy"}(f||(f={}));const m=["a","b","c","d","e","f"],b={content:null,width:"auto",height:"auto",panMode:"drag",touch:!0,dragMinThreshold:3,lockAxis:!1,mouseMoveFactor:1,mouseMoveFriction:.12,zoom:!0,pinchToZoom:!0,panOnlyZoomed:"auto",minScale:1,maxScale:2,friction:.25,dragFriction:.35,decelFriction:.05,click:"toggleZoom",dblClick:!1,wheel:"zoom",wheelLimit:7,spinner:!0,bounds:"auto",infinite:!1,rubberband:!0,bounce:!0,maxVelocity:75,transformParent:!1,classes:{content:"f-panzoom__content",isLoading:"is-loading",canZoomIn:"can-zoom_in",canZoomOut:"can-zoom_out",isDraggable:"is-draggable",isDragging:"is-dragging",inFullscreen:"in-fullscreen",htmlHasFullscreen:"with-panzoom-in-fullscreen"},l10n:{PANUP:"Move up",PANDOWN:"Move down",PANLEFT:"Move left",PANRIGHT:"Move right",ZOOMIN:"Zoom in",ZOOMOUT:"Zoom out",TOGGLEZOOM:"Toggle zoom level",TOGGLE1TO1:"Toggle zoom level",ITERATEZOOM:"Toggle zoom level",ROTATECCW:"Rotate counterclockwise",ROTATECW:"Rotate clockwise",FLIPX:"Flip horizontally",FLIPY:"Flip vertically",FITX:"Fit horizontally",FITY:"Fit vertically",RESET:"Reset",TOGGLEFS:"Toggle fullscreen"}},v='<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',y=t=>t&&null!==t&&t instanceof Element&&"nodeType"in t,w=(t,e)=>{t&&n(e).forEach((e=>{t.classList.remove(e)}))},x=(t,e)=>{t&&n(e).forEach((e=>{t.classList.add(e)}))},P={a:1,b:0,c:0,d:1,e:0,f:0},T=1e5,S=1e3,M="mousemove",O="drag",E="content";let z=null,k=null;class L extends p{get isTouchDevice(){return null===k&&(k=window.matchMedia("(hover: none)").matches),k}get isMobile(){return null===z&&(z=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),z}get panMode(){return this.options.panMode!==M||this.isTouchDevice?O:M}get panOnlyZoomed(){const t=this.options.panOnlyZoomed;return"auto"===t?this.isTouchDevice:t}get isInfinite(){return this.option("infinite")}get angle(){return 180*Math.atan2(this.current.b,this.current.a)/Math.PI||0}get targetAngle(){return 180*Math.atan2(this.target.b,this.target.a)/Math.PI||0}get scale(){const{a:t,b:e}=this.current;return Math.sqrt(t*t+e*e)||1}get targetScale(){const{a:t,b:e}=this.target;return Math.sqrt(t*t+e*e)||1}get minScale(){return this.option("minScale")||1}get fullScale(){const{contentRect:t}=this;return t.fullWidth/t.fitWidth||1}get maxScale(){return this.fullScale*(this.option("maxScale")||1)||1}get coverScale(){const{containerRect:t,contentRect:e}=this,i=Math.max(t.height/e.fitHeight,t.width/e.fitWidth)||1;return Math.min(this.fullScale,i)}get isScaling(){return Math.abs(this.targetScale-this.scale)>1e-5&&!this.isResting}get isContentLoading(){const t=this.content;return!!(t&&t instanceof HTMLImageElement)&&!t.complete}get isResting(){if(this.isBouncingX||this.isBouncingY)return!1;for(const t of m){const e="e"==t||"f"===t?.001:1e-5;if(Math.abs(this.target[t]-this.current[t])>e)return!1}return!(!this.ignoreBounds&&!this.checkBounds().inBounds)}constructor(t,e={},n={}){var s;if(super(e),Object.defineProperty(this,"pointerTracker",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"resizeObserver",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"updateTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"clickTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"rAF",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"isTicking",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"friction",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"ignoreBounds",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingX",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingY",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"clicks",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"trackingPoints",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"pwt",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"cwd",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"pmme",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:f.Init}),Object.defineProperty(this,"isDragging",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"content",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"spinner",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"containerRect",{enumerable:!0,configurable:!0,writable:!0,value:{width:0,height:0,innerWidth:0,innerHeight:0}}),Object.defineProperty(this,"contentRect",{enumerable:!0,configurable:!0,writable:!0,value:{top:0,right:0,bottom:0,left:0,fullWidth:0,fullHeight:0,fitWidth:0,fitHeight:0,width:0,height:0}}),Object.defineProperty(this,"dragStart",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,top:0,left:0,time:0}}),Object.defineProperty(this,"dragOffset",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,time:0}}),Object.defineProperty(this,"current",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},P)}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},P)}),Object.defineProperty(this,"velocity",{enumerable:!0,configurable:!0,writable:!0,value:{a:0,b:0,c:0,d:0,e:0,f:0}}),Object.defineProperty(this,"lockedAxis",{enumerable:!0,configurable:!0,writable:!0,value:!1}),!t)throw new Error("Container Element Not Found");this.container=t,this.initContent(),this.attachPlugins(Object.assign(Object.assign({},L.Plugins),n)),this.emit("attachPlugins"),this.emit("init");const o=this.content;if(o.addEventListener("load",this.onLoad),o.addEventListener("error",this.onError),this.isContentLoading){if(this.option("spinner")){t.classList.add(this.cn("isLoading"));const e=i(v);!t.contains(o)||o.parentElement instanceof HTMLPictureElement?this.spinner=t.appendChild(e):this.spinner=(null===(s=o.parentElement)||void 0===s?void 0:s.insertBefore(e,o))||null}this.emit("beforeLoad")}else queueMicrotask((()=>{this.enable()}))}initContent(){const{container:t}=this,e=this.cn(E);let i=this.option(E)||t.querySelector(`.${e}`);if(i||(i=t.querySelector("img,picture")||t.firstElementChild,i&&x(i,e)),i instanceof HTMLPictureElement&&(i=i.querySelector("img")),!i)throw new Error("No content found");this.content=i}onLoad(){const{spinner:t,container:e,state:i}=this;t&&(t.remove(),this.spinner=null),this.option("spinner")&&e.classList.remove(this.cn("isLoading")),this.emit("afterLoad"),i===f.Init?this.enable():this.updateMetrics()}onError(){this.state!==f.Destroy&&(this.spinner&&(this.spinner.remove(),this.spinner=null),this.stop(),this.detachEvents(),this.state=f.Error,this.emit("error"))}attachObserver(){var t;const e=()=>{const{container:t,containerRect:e}=this;return Math.abs(e.width-t.getBoundingClientRect().width)>.1||Math.abs(e.height-t.getBoundingClientRect().height)>.1};this.resizeObserver||void 0===window.ResizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.updateTimer||(e()?(this.onResize(),this.isMobile&&(this.updateTimer=setTimeout((()=>{e()&&this.onResize(),this.updateTimer=null}),500))):this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null))}))),null===(t=this.resizeObserver)||void 0===t||t.observe(this.container)}detachObserver(){var t;null===(t=this.resizeObserver)||void 0===t||t.disconnect()}attachEvents(){const{container:t}=this;t.addEventListener("click",this.onClick,{passive:!1,capture:!1}),t.addEventListener("wheel",this.onWheel,{passive:!1}),this.pointerTracker=new r(t,{start:this.onPointerDown,move:this.onPointerMove,end:this.onPointerUp}),document.addEventListener(M,this.onMouseMove)}detachEvents(){var t;const{container:e}=this;e.removeEventListener("click",this.onClick,{passive:!1,capture:!1}),e.removeEventListener("wheel",this.onWheel,{passive:!1}),null===(t=this.pointerTracker)||void 0===t||t.stop(),this.pointerTracker=null,document.removeEventListener(M,this.onMouseMove),document.removeEventListener("keydown",this.onKeydown,!0),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null)}animate(){const t=this.friction;this.setTargetForce();const e=this.option("maxVelocity");for(const i of m)t?(this.velocity[i]*=1-t,e&&!this.isScaling&&(this.velocity[i]=Math.max(Math.min(this.velocity[i],e),-1*e)),this.current[i]+=this.velocity[i]):this.current[i]=this.target[i];this.setTransform(),this.setEdgeForce(),!this.isResting||this.isDragging?this.rAF=requestAnimationFrame((()=>this.animate())):this.stop("current")}setTargetForce(){for(const t of m)"e"===t&&this.isBouncingX||"f"===t&&this.isBouncingY||(this.velocity[t]=(1/(1-this.friction)-1)*(this.target[t]-this.current[t]))}checkBounds(t=0,e=0){const{current:i}=this,n=i.e+t,s=i.f+e,o=this.getBounds(),{x:a,y:r}=o,l=a.min,h=a.max,c=r.min,d=r.max;let u=0,g=0;return l!==1/0&&n<l?u=l-n:h!==1/0&&n>h&&(u=h-n),c!==1/0&&s<c?g=c-s:d!==1/0&&s>d&&(g=d-s),Math.abs(u)<.001&&(u=0),Math.abs(g)<.001&&(g=0),Object.assign(Object.assign({},o),{xDiff:u,yDiff:g,inBounds:!u&&!g})}clampTargetBounds(){const{target:t}=this,{x:e,y:i}=this.getBounds();e.min!==1/0&&(t.e=Math.max(t.e,e.min)),e.max!==1/0&&(t.e=Math.min(t.e,e.max)),i.min!==1/0&&(t.f=Math.max(t.f,i.min)),i.max!==1/0&&(t.f=Math.min(t.f,i.max))}calculateContentDim(t=this.current){const{content:e,contentRect:i}=this,{fitWidth:n,fitHeight:s,fullWidth:o,fullHeight:a}=i;let r=o,l=a;if(this.option("zoom")||0!==this.angle){const i=!(e instanceof HTMLImageElement)&&("none"===window.getComputedStyle(e).maxWidth||"none"===window.getComputedStyle(e).maxHeight),h=i?o:n,c=i?a:s,d=this.getMatrix(t),u=new DOMPoint(0,0).matrixTransform(d),g=new DOMPoint(0+h,0).matrixTransform(d),p=new DOMPoint(0+h,0+c).matrixTransform(d),f=new DOMPoint(0,0+c).matrixTransform(d),m=Math.abs(p.x-u.x),b=Math.abs(p.y-u.y),v=Math.abs(f.x-g.x),y=Math.abs(f.y-g.y);r=Math.max(m,v),l=Math.max(b,y)}return{contentWidth:r,contentHeight:l}}setEdgeForce(){if(this.ignoreBounds||this.isDragging||this.panMode===M||this.targetScale<this.scale)return this.isBouncingX=!1,void(this.isBouncingY=!1);const{target:t}=this,{x:e,y:i,xDiff:n,yDiff:s}=this.checkBounds();const o=this.option("maxVelocity");let a=this.velocity.e,r=this.velocity.f;0!==n?(this.isBouncingX=!0,n*a<=0?a+=.14*n:(a=.14*n,e.min!==1/0&&(this.target.e=Math.max(t.e,e.min)),e.max!==1/0&&(this.target.e=Math.min(t.e,e.max))),o&&(a=Math.max(Math.min(a,o),-1*o))):this.isBouncingX=!1,0!==s?(this.isBouncingY=!0,s*r<=0?r+=.14*s:(r=.14*s,i.min!==1/0&&(this.target.f=Math.max(t.f,i.min)),i.max!==1/0&&(this.target.f=Math.min(t.f,i.max))),o&&(r=Math.max(Math.min(r,o),-1*o))):this.isBouncingY=!1,this.isBouncingX&&(this.velocity.e=a),this.isBouncingY&&(this.velocity.f=r)}enable(){const{content:t}=this,e=new DOMMatrixReadOnly(window.getComputedStyle(t).transform);for(const t of m)this.current[t]=this.target[t]=e[t];this.updateMetrics(),this.attachObserver(),this.attachEvents(),this.state=f.Ready,this.emit("ready")}onClick(t){var e;this.isDragging&&(null===(e=this.pointerTracker)||void 0===e||e.clear(),this.trackingPoints=[],this.startDecelAnim());const i=t.target;if(!i||t.defaultPrevented)return;if(i.hasAttribute("disabled"))return t.preventDefault(),void t.stopPropagation();if((()=>{const t=window.getSelection();return t&&"Range"===t.type})()&&!i.closest("button"))return;const n=i.closest("[data-panzoom-action]"),s=i.closest("[data-panzoom-change]"),o=n||s,a=o&&y(o)?o.dataset:null;if(a){const e=a.panzoomChange,i=a.panzoomAction;if((e||i)&&t.preventDefault(),e){let t={};try{t=JSON.parse(e)}catch(t){console&&console.warn("The given data was not valid JSON")}return void this.applyChange(t)}if(i)return void(this[i]&&this[i]())}if(Math.abs(this.dragOffset.x)>3||Math.abs(this.dragOffset.y)>3)return t.preventDefault(),void t.stopPropagation();if(i.closest("[data-fancybox]"))return;const r=this.content.getBoundingClientRect(),l=this.dragStart;if(l.time&&!this.canZoomOut()&&(Math.abs(r.x-l.x)>2||Math.abs(r.y-l.y)>2))return;this.dragStart.time=0;const h=e=>{this.option("zoom",t)&&e&&"string"==typeof e&&/(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e)&&"function"==typeof this[e]&&(t.preventDefault(),this[e]({event:t}))},c=this.option("click",t),d=this.option("dblClick",t);d?(this.clicks++,1==this.clicks&&(this.clickTimer=setTimeout((()=>{1===this.clicks?(this.emit("click",t),!t.defaultPrevented&&c&&h(c)):(this.emit("dblClick",t),t.defaultPrevented||h(d)),this.clicks=0,this.clickTimer=null}),350))):(this.emit("click",t),!t.defaultPrevented&&c&&h(c))}addTrackingPoint(t){const e=this.trackingPoints.filter((t=>t.time>Date.now()-100));e.push(t),this.trackingPoints=e}onPointerDown(t,e,i){var n;if(!1===this.option("touch",t))return!1;this.pwt=0,this.dragOffset={x:0,y:0,time:0},this.trackingPoints=[];const s=this.content.getBoundingClientRect();if(this.dragStart={x:s.x,y:s.y,top:s.top,left:s.left,time:Date.now()},this.clickTimer)return!1;if(this.panMode===M&&this.targetScale>1)return t.preventDefault(),t.stopPropagation(),!1;const o=t.composedPath()[0];if(!i.length){if(["TEXTAREA","OPTION","INPUT","SELECT","VIDEO","IFRAME"].includes(o.nodeName)||o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"))return!1;null===(n=window.getSelection())||void 0===n||n.removeAllRanges()}if("mousedown"===t.type)["A","BUTTON"].includes(o.nodeName)||t.preventDefault();else if(Math.abs(this.velocity.a)>.3)return!1;return this.target.e=this.current.e,this.target.f=this.current.f,this.stop(),this.isDragging||(this.isDragging=!0,this.addTrackingPoint(e),this.emit("touchStart",t)),!0}onPointerMove(i,n,s){if(!1===this.option("touch",i))return;if(!this.isDragging)return;if(n.length<2&&this.panOnlyZoomed&&t(this.targetScale)<=t(this.minScale))return;if(this.emit("touchMove",i),i.defaultPrevented)return;this.addTrackingPoint(n[0]);const{content:o}=this,a=h(s[0],s[1]),r=h(n[0],n[1]);let c=0,d=0;if(n.length>1){const t=o.getBoundingClientRect();c=a.clientX-t.left-.5*t.width,d=a.clientY-t.top-.5*t.height}const u=l(s[0],s[1]),g=l(n[0],n[1]);let p=u?g/u:1,f=r.clientX-a.clientX,m=r.clientY-a.clientY;this.dragOffset.x+=f,this.dragOffset.y+=m,this.dragOffset.time=Date.now()-this.dragStart.time;let b=t(this.targetScale)===t(this.minScale)&&this.option("lockAxis");if(b&&!this.lockedAxis)if("xy"===b||"y"===b||"touchmove"===i.type){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void i.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockedAxis=t>45&&t<135?"y":"x",this.dragOffset.x=0,this.dragOffset.y=0,f=0,m=0}else this.lockedAxis=b;if(e(i.target,this.content)&&(b="x",this.dragOffset.y=0),b&&"xy"!==b&&this.lockedAxis!==b&&t(this.targetScale)===t(this.minScale))return;i.cancelable&&i.preventDefault(),this.container.classList.add(this.cn("isDragging"));const v=this.checkBounds(f,m);this.option("rubberband")?("x"!==this.isInfinite&&(v.xDiff>0&&f<0||v.xDiff<0&&f>0)&&(f*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitWidth*v.xDiff))),"y"!==this.isInfinite&&(v.yDiff>0&&m<0||v.yDiff<0&&m>0)&&(m*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitHeight*v.yDiff)))):(v.xDiff&&(f=0),v.yDiff&&(m=0));const y=this.targetScale,w=this.minScale,x=this.maxScale;y<.5*w&&(p=Math.max(p,w)),y>1.5*x&&(p=Math.min(p,x)),"y"===this.lockedAxis&&t(y)===t(w)&&(f=0),"x"===this.lockedAxis&&t(y)===t(w)&&(m=0),this.applyChange({originX:c,originY:d,panX:f,panY:m,scale:p,friction:this.option("dragFriction"),ignoreBounds:!0})}onPointerUp(t,i,n){if(n.length)return this.dragOffset.x=0,this.dragOffset.y=0,void(this.trackingPoints=[]);this.container.classList.remove(this.cn("isDragging")),this.isDragging&&(this.addTrackingPoint(i),this.panOnlyZoomed&&this.contentRect.width-this.contentRect.fitWidth<1&&this.contentRect.height-this.contentRect.fitHeight<1&&(this.trackingPoints=[]),e(t.target,this.content)&&"y"===this.lockedAxis&&(this.trackingPoints=[]),this.emit("touchEnd",t),this.isDragging=!1,this.lockedAxis=!1,this.state!==f.Destroy&&(t.defaultPrevented||this.startDecelAnim()))}startDecelAnim(){var e;const i=this.isScaling;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const t of m)this.velocity[t]=0;this.target.e=this.current.e,this.target.f=this.current.f,w(this.container,"is-scaling"),w(this.container,"is-animating"),this.isTicking=!1;const{trackingPoints:n}=this,s=n[0],o=n[n.length-1];let a=0,r=0,l=0;o&&s&&(a=o.clientX-s.clientX,r=o.clientY-s.clientY,l=o.time-s.time);const h=(null===(e=window.visualViewport)||void 0===e?void 0:e.scale)||1;1!==h&&(a*=h,r*=h);let c=0,d=0,u=0,g=0,p=this.option("decelFriction");const f=this.targetScale;if(l>0){u=Math.abs(a)>3?a/(l/30):0,g=Math.abs(r)>3?r/(l/30):0;const t=this.option("maxVelocity");t&&(u=Math.max(Math.min(u,t),-1*t),g=Math.max(Math.min(g,t),-1*t))}u&&(c=u/(1/(1-p)-1)),g&&(d=g/(1/(1-p)-1)),("y"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"y"===this.lockedAxis&&t(f)===this.minScale)&&(c=u=0),("x"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"x"===this.lockedAxis&&t(f)===this.minScale)&&(d=g=0);const b=this.dragOffset.x,v=this.dragOffset.y,y=this.option("dragMinThreshold")||0;Math.abs(b)<y&&Math.abs(v)<y&&(c=d=0,u=g=0),(f<this.minScale-1e-5||f>this.maxScale+1e-5||i&&!c&&!d)&&(p=.35),this.applyChange({panX:c,panY:d,friction:p}),this.emit("decel",u,g,b,v)}onWheel(t){var e=[-t.deltaX||0,-t.deltaY||0,-t.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const i=Math.max(-1,Math.min(1,e));if(this.emit("wheel",t,i),this.panMode===M)return;if(t.defaultPrevented)return;const n=this.option("wheel");"pan"===n?(t.preventDefault(),this.panOnlyZoomed&&!this.canZoomOut()||this.applyChange({panX:2*-t.deltaX,panY:2*-t.deltaY,bounce:!1})):"zoom"===n&&!1!==this.option("zoom")&&this.zoomWithWheel(t)}onMouseMove(t){this.panWithMouse(t)}onKeydown(t){"Escape"===t.key&&this.toggleFS()}onResize(){this.updateMetrics(),this.checkBounds().inBounds||this.requestTick()}setTransform(){this.emit("beforeTransform");const{current:e,target:i,content:n,contentRect:s}=this,o=Object.assign({},P);for(const n of m){const s="e"==n||"f"===n?S:T;o[n]=t(e[n],s),Math.abs(i[n]-e[n])<("e"==n||"f"===n?.51:.001)&&(e[n]=i[n])}let{a:a,b:r,c:l,d:h,e:c,f:d}=o,u=`matrix(${a}, ${r}, ${l}, ${h}, ${c}, ${d})`,g=n.parentElement instanceof HTMLPictureElement?n.parentElement:n;if(this.option("transformParent")&&(g=g.parentElement||g),g.style.transform===u)return;g.style.transform=u;const{contentWidth:p,contentHeight:f}=this.calculateContentDim();s.width=p,s.height=f,this.emit("afterTransform")}updateMetrics(e=!1){var i;if(!this||this.state===f.Destroy)return;if(this.isContentLoading)return;const n=Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1),{container:s,content:o}=this,a=o instanceof HTMLImageElement,r=s.getBoundingClientRect(),l=getComputedStyle(this.container);let h=r.width*n,c=r.height*n;const d=parseFloat(l.paddingTop)+parseFloat(l.paddingBottom),u=h-(parseFloat(l.paddingLeft)+parseFloat(l.paddingRight)),g=c-d;this.containerRect={width:h,height:c,innerWidth:u,innerHeight:g};let p=this.option("width")||"auto",m=this.option("height")||"auto";"auto"===p&&(p=parseFloat(o.dataset.width||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalWidth:t instanceof SVGElement?t.width.baseVal.value:Math.max(t.offsetWidth,t.scrollWidth),e||0})(o)),"auto"===m&&(m=parseFloat(o.dataset.height||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalHeight:t instanceof SVGElement?t.height.baseVal.value:Math.max(t.offsetHeight,t.scrollHeight),e||0})(o));let b=o.parentElement instanceof HTMLPictureElement?o.parentElement:o;this.option("transformParent")&&(b=b.parentElement||b);const v=b.getAttribute("style")||"";b.style.setProperty("transform","none","important"),a&&(b.style.width="",b.style.height=""),b.offsetHeight;const y=o.getBoundingClientRect();let w=y.width*n,x=y.height*n,P=0,T=0;a&&(Math.abs(p-w)>1||Math.abs(m-x)>1)&&({width:w,height:x,top:P,left:T}=((t,e,i,n)=>{const s=i/n;return s>t/e?(i=t,n=t/s):(i=e*s,n=e),{width:i,height:n,top:.5*(e-n),left:.5*(t-i)}})(w,x,p,m)),this.contentRect=Object.assign(Object.assign({},this.contentRect),{top:y.top-r.top+P,bottom:r.bottom-y.bottom+P,left:y.left-r.left+T,right:r.right-y.right+T,fitWidth:w,fitHeight:x,width:w,height:x,fullWidth:p,fullHeight:m}),b.style.cssText=v,a&&(b.style.width=`${w}px`,b.style.height=`${x}px`),this.setTransform(),!0!==e&&this.emit("refresh"),this.ignoreBounds||(t(this.targetScale)<t(this.minScale)?this.zoomTo(this.minScale,{friction:0}):this.targetScale>this.maxScale?this.zoomTo(this.maxScale,{friction:0}):this.state===f.Init||this.checkBounds().inBounds||this.requestTick()),this.updateControls()}getBounds(){const e=this.option("bounds");if("auto"!==e)return e;const{contentWidth:i,contentHeight:n}=this.calculateContentDim(this.target);let s=0,o=0,a=0,r=0;const l=this.option("infinite");if(!0===l||this.lockedAxis&&l===this.lockedAxis)s=-1/0,a=1/0,o=-1/0,r=1/0;else{let{containerRect:e,contentRect:l}=this,h=t(this.contentRect.fitWidth*this.targetScale,S),c=t(this.contentRect.fitHeight*this.targetScale,S),{innerWidth:d,innerHeight:u}=e;if(this.containerRect.width===h&&(d=e.width),this.containerRect.width===c&&(u=e.height),i>d){a=.5*(i-d),s=-1*a;let t=.5*(l.right-l.left);s+=t,a+=t}if(this.contentRect.fitWidth>d&&i<d&&(s-=.5*(this.contentRect.fitWidth-d),a-=.5*(this.contentRect.fitWidth-d)),n>u){r=.5*(n-u),o=-1*r;let t=.5*(l.bottom-l.top);o+=t,r+=t}this.contentRect.fitHeight>u&&n<u&&(s-=.5*(this.contentRect.fitHeight-u),a-=.5*(this.contentRect.fitHeight-u))}return{x:{min:s,max:a},y:{min:o,max:r}}}updateControls(){const e=this,i=e.container,{panMode:n,contentRect:o,fullScale:a,targetScale:r,coverScale:l,maxScale:h,minScale:c}=e;let d={toggleMax:r-c<.5*(h-c)?h:c,toggleCover:r-c<.5*(l-c)?l:c,toggleZoom:r-c<.5*(a-c)?a:c}[e.option("click")||""]||c,u=e.canZoomIn(),g=e.canZoomOut(),p=n===O&&!!this.option("touch"),f=g&&p;if(p&&(t(r)<t(c)&&!this.panOnlyZoomed&&(f=!0),(t(o.width,1)>t(o.fitWidth,1)||t(o.height,1)>t(o.fitHeight,1))&&(f=!0)),t(o.width*r,1)<t(o.fitWidth,1)&&(f=!1),n===M&&(f=!1),s(i,this.cn("isDraggable"),f),!this.option("zoom"))return;let m=u&&t(d)>t(r),b=!m&&!f&&g&&t(d)<t(r);s(i,this.cn("canZoomIn"),m),s(i,this.cn("canZoomOut"),b);for(const t of i.querySelectorAll('[data-panzoom-action="zoomIn"]'))u?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="zoomOut"]'))g?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')){u||g?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));const e=t.querySelector("g");e&&(e.style.display=u?"":"none")}}panTo({x:t=this.target.e,y:e=this.target.f,scale:i=this.targetScale,friction:n=this.option("friction"),angle:s=0,originX:o=0,originY:a=0,flipX:r=!1,flipY:l=!1,ignoreBounds:h=!1}){this.state!==f.Destroy&&this.applyChange({panX:t-this.target.e,panY:e-this.target.f,scale:i/this.targetScale,angle:s,originX:o,originY:a,friction:n,flipX:r,flipY:l,ignoreBounds:h})}applyChange({panX:e=0,panY:i=0,scale:n=1,angle:s=0,originX:o=-this.current.e,originY:a=-this.current.f,friction:r=this.option("friction"),flipX:l=!1,flipY:h=!1,ignoreBounds:c=!1,bounce:d=this.option("bounce")}){const u=this.state;if(u===f.Destroy)return;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.friction=r||0,this.ignoreBounds=c;const{current:g}=this,p=g.e,b=g.f,v=this.getMatrix(this.target);let y=(new DOMMatrix).translate(p,b).translate(o,a).translate(e,i);if(this.option("zoom")){if(!c){const t=this.targetScale,e=this.minScale,i=this.maxScale;t*n<e&&(n=e/t),t*n>i&&(n=i/t)}y=y.scale(n)}y=y.translate(-o,-a).translate(-p,-b).multiply(v),s&&(y=y.rotate(s)),l&&(y=y.scale(-1,1)),h&&(y=y.scale(1,-1));for(const e of m)"e"!==e&&"f"!==e&&(y[e]>this.minScale+1e-5||y[e]<this.minScale-1e-5)?this.target[e]=y[e]:this.target[e]=t(y[e],S);(this.targetScale<this.scale||Math.abs(n-1)>.1||this.panMode===M||!1===d)&&!c&&this.clampTargetBounds(),u===f.Init?this.animate():this.isResting||(this.state=f.Panning,this.requestTick())}stop(t=!1){if(this.state===f.Init||this.state===f.Destroy)return;const e=this.isTicking;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const e of m)this.velocity[e]=0,"current"===t?this.current[e]=this.target[e]:"target"===t&&(this.target[e]=this.current[e]);this.setTransform(),w(this.container,"is-scaling"),w(this.container,"is-animating"),this.isTicking=!1,this.state=f.Ready,e&&(this.emit("endAnimation"),this.updateControls())}requestTick(){this.isTicking||(this.emit("startAnimation"),this.updateControls(),x(this.container,"is-animating"),this.isScaling&&x(this.container,"is-scaling")),this.isTicking=!0,this.rAF||(this.rAF=requestAnimationFrame((()=>this.animate())))}panWithMouse(e,i=this.option("mouseMoveFriction")){if(this.pmme=e,this.panMode!==M||!e)return;if(t(this.targetScale)<=t(this.minScale))return;this.emit("mouseMove",e);const{container:n,containerRect:s,contentRect:o}=this,a=s.width,r=s.height,l=n.getBoundingClientRect(),h=(e.clientX||0)-l.left,c=(e.clientY||0)-l.top;let{contentWidth:d,contentHeight:u}=this.calculateContentDim(this.target);const g=this.option("mouseMoveFactor");g>1&&(d!==a&&(d*=g),u!==r&&(u*=g));let p=.5*(d-a)-h/a*100/100*(d-a);p+=.5*(o.right-o.left);let f=.5*(u-r)-c/r*100/100*(u-r);f+=.5*(o.bottom-o.top),this.applyChange({panX:p-this.target.e,panY:f-this.target.f,friction:i})}zoomWithWheel(e){if(this.state===f.Destroy||this.state===f.Init)return;const i=Date.now();if(i-this.pwt<45)return void e.preventDefault();this.pwt=i;var n=[-e.deltaX||0,-e.deltaY||0,-e.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const s=Math.max(-1,Math.min(1,n)),{targetScale:o,maxScale:a,minScale:r}=this;let l=o*(100+45*s)/100;t(l)<t(r)&&t(o)<=t(r)?(this.cwd+=Math.abs(s),l=r):t(l)>t(a)&&t(o)>=t(a)?(this.cwd+=Math.abs(s),l=a):(this.cwd=0,l=Math.max(Math.min(l,a),r)),this.cwd>this.option("wheelLimit")||(e.preventDefault(),t(l)!==t(o)&&this.zoomTo(l,{event:e}))}canZoomIn(){return this.option("zoom")&&(t(this.contentRect.width,1)<t(this.contentRect.fitWidth,1)||t(this.targetScale)<t(this.maxScale))}canZoomOut(){return this.option("zoom")&&t(this.targetScale)>t(this.minScale)}zoomIn(t=1.25,e){this.zoomTo(this.targetScale*t,e)}zoomOut(t=.8,e){this.zoomTo(this.targetScale*t,e)}zoomToFit(t){this.zoomTo("fit",t)}zoomToCover(t){this.zoomTo("cover",t)}zoomToFull(t){this.zoomTo("full",t)}zoomToMax(t){this.zoomTo("max",t)}toggleZoom(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.fullScale-this.minScale)?"full":"fit",t)}toggleMax(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.maxScale-this.minScale)?"max":"fit",t)}toggleCover(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.coverScale-this.minScale)?"cover":"fit",t)}iterateZoom(t){this.zoomTo("next",t)}zoomTo(t=1,{friction:e="auto",originX:i="auto",originY:n="auto",event:s}={}){if(this.isContentLoading||this.state===f.Destroy)return;const{targetScale:o}=this;this.stop();let a=1;if(this.panMode===M&&(s=this.pmme||s),s||"auto"===i||"auto"===n){const t=this.content.getBoundingClientRect(),e=this.container.getBoundingClientRect(),o=s?s.clientX:e.left+.5*e.width,a=s?s.clientY:e.top+.5*e.height;i=o-t.left-.5*t.width,n=a-t.top-.5*t.height}const r=this.fullScale,l=this.maxScale;let h=this.coverScale;"number"==typeof t?a=t/o:("next"===t&&(r-h<.2&&(h=r),t=o<r-1e-5?"full":o<l-1e-5?"max":"fit"),a="full"===t?r/o||1:"cover"===t?h/o||1:"max"===t?l/o||1:1/o||1),e="auto"===e?a>1?.15:.25:e,this.applyChange({scale:a,originX:i,originY:n,friction:e}),s&&this.panMode===M&&this.panWithMouse(s,e)}rotateCCW(){this.applyChange({angle:-90})}rotateCW(){this.applyChange({angle:90})}flipX(){this.applyChange({flipX:!0})}flipY(){this.applyChange({flipY:!0})}fitX(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.height-(e.top+.5*e.fitHeight)-i.f,scale:t.width/e.fitWidth/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}fitY(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.innerHeight-(e.top+.5*e.fitHeight)-i.f,scale:t.height/e.fitHeight/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}toggleFS(){const{container:t}=this,e=this.cn("inFullscreen"),i=this.cn("htmlHasFullscreen");t.classList.toggle(e);const n=t.classList.contains(e);n?(document.documentElement.classList.add(i),document.addEventListener("keydown",this.onKeydown,!0)):(document.documentElement.classList.remove(i),document.removeEventListener("keydown",this.onKeydown,!0)),this.updateMetrics(),this.emit(n?"enterFS":"exitFS")}getMatrix(t=this.current){const{a:e,b:i,c:n,d:s,e:o,f:a}=t;return new DOMMatrix([e,i,n,s,o,a])}reset(t){if(this.state!==f.Init&&this.state!==f.Destroy){this.stop("current");for(const t of m)this.target[t]=P[t];this.target.a=this.minScale,this.target.d=this.minScale,this.clampTargetBounds(),this.isResting||(this.friction=void 0===t?this.option("friction"):t,this.state=f.Panning,this.requestTick())}}destroy(){this.stop(),this.state=f.Destroy,this.detachEvents(),this.detachObserver();const{container:t,content:e}=this,i=this.option("classes")||{};for(const e of Object.values(i))t.classList.remove(e+"");e&&(e.removeEventListener("load",this.onLoad),e.removeEventListener("error",this.onError)),this.detachPlugins()}}Object.defineProperty(L,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:b}),Object.defineProperty(L,"Plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}});const R=function(t,e){let i=!0;return(...n)=>{i&&(i=!1,t(...n),setTimeout((()=>{i=!0}),e))}},C=(t,e)=>{let i=[];return t.childNodes.forEach((t=>{t.nodeType!==Node.ELEMENT_NODE||e&&!t.matches(e)||i.push(t)})),i},A={viewport:null,track:null,enabled:!0,slides:[],axis:"x",transition:"fade",preload:1,slidesPerPage:"auto",initialPage:0,friction:.12,Panzoom:{decelFriction:.12},center:!0,infinite:!0,fill:!0,dragFree:!1,adaptiveHeight:!1,direction:"ltr",classes:{container:"f-carousel",viewport:"f-carousel__viewport",track:"f-carousel__track",slide:"f-carousel__slide",isLTR:"is-ltr",isRTL:"is-rtl",isHorizontal:"is-horizontal",isVertical:"is-vertical",inTransition:"in-transition",isSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide #%d"}};var D;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Destroy=2]="Destroy"}(D||(D={}));const j=t=>{if("string"==typeof t||t instanceof HTMLElement)t={html:t};else{const e=t.thumb;void 0!==e&&("string"==typeof e&&(t.thumbSrc=e),e instanceof HTMLImageElement&&(t.thumbEl=e,t.thumbElSrc=e.src,t.thumbSrc=e.src),delete t.thumb)}return Object.assign({html:"",el:null,isDom:!1,class:"",customClass:"",index:-1,dim:0,gap:0,pos:0,transition:!1},t)},F=(t={})=>Object.assign({index:-1,slides:[],dim:0,pos:-1},t);class I extends g{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:t})}attach(){}detach(){}}const H={classes:{list:"f-carousel__dots",isDynamic:"is-dynamic",hasDots:"has-dots",dot:"f-carousel__dot",isBeforePrev:"is-before-prev",isPrev:"is-prev",isCurrent:"is-current",isNext:"is-next",isAfterNext:"is-after-next"},dotTpl:'<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',dynamicFrom:11,maxCount:1/0,minCount:2};class B extends I{constructor(){super(...arguments),Object.defineProperty(this,"isDynamic",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"list",{enumerable:!0,configurable:!0,writable:!0,value:null})}onRefresh(){this.refresh()}build(){let t=this.list;return t||(t=document.createElement("ul"),x(t,this.cn("list")),t.setAttribute("role","tablist"),this.instance.container.appendChild(t),x(this.instance.container,this.cn("hasDots")),this.list=t),t}refresh(){var t;const e=this.instance.pages.length,i=Math.min(2,this.option("minCount")),n=Math.max(2e3,this.option("maxCount")),o=this.option("dynamicFrom");if(e<i||e>n)return void this.cleanup();const a="number"==typeof o&&e>5&&e>=o,r=!this.list||this.isDynamic!==a||this.list.children.length!==e;r&&this.cleanup();const l=this.build();if(s(l,this.cn("isDynamic"),!!a),r)for(let t=0;t<e;t++)l.append(this.createItem(t));let h,c=0;for(const e of[...l.children]){const i=c===this.instance.page;i&&(h=e),s(e,this.cn("isCurrent"),i),null===(t=e.children[0])||void 0===t||t.setAttribute("aria-selected",i?"true":"false");for(const t of["isBeforePrev","isPrev","isNext","isAfterNext"])w(e,this.cn(t));c++}if(h=h||l.firstChild,a&&h){const t=h.previousElementSibling,e=t&&t.previousElementSibling;x(t,this.cn("isPrev")),x(e,this.cn("isBeforePrev"));const i=h.nextElementSibling,n=i&&i.nextElementSibling;x(i,this.cn("isNext")),x(n,this.cn("isAfterNext"))}this.isDynamic=a}createItem(t=0){var e;const n=document.createElement("li");n.setAttribute("role","presentation");const s=i(this.instance.localize(this.option("dotTpl"),[["%d",t+1]]).replace(/\%i/g,t+""));return n.appendChild(s),null===(e=n.children[0])||void 0===e||e.setAttribute("role","tab"),n}cleanup(){this.list&&(this.list.remove(),this.list=null),this.isDynamic=!1,w(this.instance.container,this.cn("hasDots"))}attach(){this.instance.on(["refresh","change"],this.onRefresh)}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup()}}Object.defineProperty(B,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:H});const N="disabled",W="next",X="prev";class Y extends I{constructor(){super(...arguments),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"prev",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"next",{enumerable:!0,configurable:!0,writable:!0,value:null})}onRefresh(){const t=this.instance,e=t.pages.length,i=t.page;if(e<2)return void this.cleanup();this.build();let n=this.prev,s=this.next;n&&s&&(n.removeAttribute(N),s.removeAttribute(N),t.isInfinite||(i<=0&&n.setAttribute(N,""),i>=e-1&&s.setAttribute(N,"")))}createButton(t){const e=this.instance,i=document.createElement("button");i.setAttribute("tabindex","0"),i.setAttribute("title",e.localize(`{{${t.toUpperCase()}}}`)),x(i,this.cn("button")+" "+this.cn(t===W?"isNext":"isPrev"));const n=e.isRTL?t===W?X:W:t;var s;return i.innerHTML=e.localize(this.option(`${n}Tpl`)),i.dataset[`carousel${s=t,s?s.match("^[a-z]")?s.charAt(0).toUpperCase()+s.substring(1):s:""}`]="true",i}build(){let t=this.container;t||(this.container=t=document.createElement("div"),x(t,this.cn("container")),this.instance.container.appendChild(t)),this.next||(this.next=t.appendChild(this.createButton(W))),this.prev||(this.prev=t.appendChild(this.createButton(X)))}cleanup(){this.prev&&this.prev.remove(),this.next&&this.next.remove(),this.container&&this.container.remove(),this.prev=null,this.next=null,this.container=null}attach(){this.instance.on(["refresh","change"],this.onRefresh)}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup()}}Object.defineProperty(Y,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{classes:{container:"f-carousel__nav",button:"f-button",isNext:"is-next",isPrev:"is-prev"},nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'}});class $ extends I{constructor(){super(...arguments),Object.defineProperty(this,"selectedIndex",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"nav",{enumerable:!0,configurable:!0,writable:!0,value:null})}addAsTargetFor(t){this.target=this.instance,this.nav=t,this.attachEvents()}addAsNavFor(t){this.nav=this.instance,this.target=t,this.attachEvents()}attachEvents(){this.nav&&this.target&&(this.nav.options.initialSlide=this.target.options.initialPage,this.nav.state===D.Ready?this.onNavReady(this.nav):this.nav.on("ready",this.onNavReady),this.target.state===D.Ready?this.onTargetReady(this.target):this.target.on("ready",this.onTargetReady))}onNavReady(t){t.on("createSlide",this.onNavCreateSlide),t.on("Panzoom.click",this.onNavClick),t.on("Panzoom.touchEnd",this.onNavTouch),this.onTargetChange()}onTargetReady(t){t.on("change",this.onTargetChange),t.on("Panzoom.refresh",this.onTargetChange),this.onTargetChange()}onNavClick(t,e,i){this.onNavTouch(t,t.panzoom,i)}onNavTouch(t,e,i){var n,s;if(Math.abs(e.dragOffset.x)>3||Math.abs(e.dragOffset.y)>3)return;const o=i.target,{nav:a,target:r}=this;if(!a||!r||!o)return;const l=o.closest("[data-index]");if(i.stopPropagation(),i.preventDefault(),!l)return;const h=parseInt(l.dataset.index||"",10)||0,c=r.getPageForSlide(h),d=a.getPageForSlide(h);a.slideTo(d),r.slideTo(c,{friction:(null===(s=null===(n=this.nav)||void 0===n?void 0:n.plugins)||void 0===s?void 0:s.Sync.option("friction"))||0}),this.markSelectedSlide(h)}onNavCreateSlide(t,e){e.index===this.selectedIndex&&this.markSelectedSlide(e.index)}onTargetChange(){const{target:t,nav:e}=this;if(!t||!e)return;if(e.state!==D.Ready||t.state!==D.Ready)return;const i=t.pages[t.page].slides[0].index,n=e.getPageForSlide(i);this.markSelectedSlide(i),e.slideTo(n,null===e.prevPage?{friction:0}:void 0)}markSelectedSlide(t){const e=this.nav;e&&e.state===D.Ready&&(this.selectedIndex=t,[...e.slides].map((e=>{e.el&&e.el.classList[e.index===t?"add":"remove"]("is-nav-selected")})))}attach(){const t=this;let e=t.options.target,i=t.options.nav;e?t.addAsNavFor(e):i&&t.addAsTargetFor(i)}detach(){const t=this,e=t.nav,i=t.target;e&&(e.off("ready",t.onNavReady),e.off("createSlide",t.onNavCreateSlide),e.off("Panzoom.click",t.onNavClick),e.off("Panzoom.touchEnd",t.onNavTouch)),t.nav=null,i&&(i.off("ready",t.onTargetReady),i.off("refresh",t.onTargetChange),i.off("change",t.onTargetChange)),t.target=null}}Object.defineProperty($,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{friction:.35}});const Z={Navigation:Y,Dots:B,Sync:$};class V extends p{get axis(){return this.isHorizontal?"e":"f"}get isEnabled(){return this.state===D.Ready}get isInfinite(){let t=!1;const{contentDim:e,viewportDim:i,pages:n,slides:s}=this;return n.length>=2&&e+s[0].dim>=i&&(t=this.option("infinite")),t}get isRTL(){return"rtl"===this.option("direction")}get isHorizontal(){return"x"===this.option("axis")}constructor(t,e={},i={}){if(super(),Object.defineProperty(this,"bp",{enumerable:!0,configurable:!0,writable:!0,value:""}),Object.defineProperty(this,"lp",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"userOptions",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"userPlugins",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:D.Init}),Object.defineProperty(this,"page",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"prevPage",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"viewport",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"track",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"slides",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"pages",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"panzoom",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"inTransition",{enumerable:!0,configurable:!0,writable:!0,value:new Set}),Object.defineProperty(this,"contentDim",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"viewportDim",{enumerable:!0,configurable:!0,writable:!0,value:0}),"string"==typeof t&&(t=document.querySelector(t)),!t||!y(t))throw new Error("No Element found");this.container=t,this.slideNext=R(this.slideNext.bind(this),150),this.slidePrev=R(this.slidePrev.bind(this),150),this.userOptions=e,this.userPlugins=i,queueMicrotask((()=>{this.processOptions()}))}processOptions(){const t=d({},V.defaults,this.userOptions);let e="";const i=t.breakpoints;if(i&&c(i))for(const[n,s]of Object.entries(i))window.matchMedia(n).matches&&c(s)&&(e+=n,d(t,s));e===this.bp&&this.state!==D.Init||(this.bp=e,this.state===D.Ready&&(t.initialSlide=this.pages[this.page].slides[0].index),this.state!==D.Init&&this.destroy(),super.setOptions(t),!1===this.option("enabled")?this.attachEvents():setTimeout((()=>{this.init()}),0))}init(){this.state=D.Init,this.emit("init"),this.attachPlugins(Object.assign(Object.assign({},V.Plugins),this.userPlugins)),this.emit("attachPlugins"),this.initLayout(),this.initSlides(),this.updateMetrics(),this.setInitialPosition(),this.initPanzoom(),this.attachEvents(),this.state=D.Ready,this.emit("ready")}initLayout(){const{container:t}=this,e=this.option("classes");x(t,this.cn("container")),s(t,e.isLTR,!this.isRTL),s(t,e.isRTL,this.isRTL),s(t,e.isVertical,!this.isHorizontal),s(t,e.isHorizontal,this.isHorizontal);let i=this.option("viewport")||t.querySelector(`.${e.viewport}`);i||(i=document.createElement("div"),x(i,e.viewport),i.append(...C(t,`.${e.slide}`)),t.prepend(i));let n=this.option("track")||t.querySelector(`.${e.track}`);n||(n=document.createElement("div"),x(n,e.track),n.append(...Array.from(i.childNodes))),n.setAttribute("aria-live","polite"),i.contains(n)||i.prepend(n),this.viewport=i,this.track=n,this.emit("initLayout")}initSlides(){const{track:t}=this;if(t){this.slides=[],[...C(t,`.${this.cn("slide")}`)].forEach((t=>{if(y(t)){const e=j({el:t,isDom:!0,index:this.slides.length});this.slides.push(e),this.emit("initSlide",e,this.slides.length)}}));for(let t of this.option("slides",[])){const e=j(t);e.index=this.slides.length,this.slides.push(e),this.emit("initSlide",e,this.slides.length)}this.emit("initSlides")}}setInitialPage(){let t=0;const e=this.option("initialSlide");t="number"==typeof e?this.getPageForSlide(e):parseInt(this.option("initialPage",0)+"",10)||0,this.page=t}setInitialPosition(){if(!this.track||!this.pages.length)return;const t=this.isHorizontal;let e=this.page;this.pages[e]||(this.page=e=0);const i=this.pages[e].pos*(this.isRTL&&t?1:-1),n=t?`${i}px`:"0",s=t?"0":`${i}px`;this.track.style.transform=`translate3d(${n}, ${s}, 0) scale(1)`,this.option("adaptiveHeight")&&this.setViewportHeight()}initPanzoom(){this.panzoom&&(this.panzoom.destroy(),this.panzoom=null);const t=this.option("Panzoom")||{};this.panzoom=new L(this.viewport,d({},{content:this.track,zoom:!1,panOnlyZoomed:!1,lockAxis:this.isHorizontal?"x":"y",infinite:this.isInfinite,click:!1,dblClick:!1,touch:t=>!(this.pages.length<2&&!t.options.infinite),bounds:()=>this.getBounds(),maxVelocity:t=>Math.abs(t.target[this.axis]-t.current[this.axis])<2*this.viewportDim?100:0},t)),this.panzoom.on("*",((t,e,...i)=>{this.emit(`Panzoom.${e}`,t,...i)})),this.panzoom.on("decel",this.onDecel),this.panzoom.on("refresh",this.onRefresh),this.panzoom.on("beforeTransform",this.onBeforeTransform),this.panzoom.on("endAnimation",this.onEndAnimation)}attachEvents(){const t=this.container;t&&(t.addEventListener("click",this.onClick,{passive:!1,capture:!1}),t.addEventListener("slideTo",this.onSlideTo)),window.addEventListener("resize",this.onResize)}createPages(){let t=[];const{contentDim:e,viewportDim:i}=this;let n=this.option("slidesPerPage");("number"!=typeof n||e<=i)&&(n=1/0);let s=0,o=0,a=0;for(const e of this.slides)(!t.length||o+e.dim-i>.05||a===n)&&(t.push(F()),s=t.length-1,o=0,a=0),t[s].slides.push(e),o+=e.dim+e.gap,a++;return t}processPages(){const e=this.pages,{contentDim:i,viewportDim:n}=this,s=this.option("center"),o=this.option("fill"),a=o&&s&&i>n&&!this.isInfinite;if(e.forEach(((t,e)=>{t.index=e,t.pos=t.slides[0].pos,t.dim=0;for(const[e,i]of t.slides.entries())t.dim+=i.dim,e<t.slides.length-1&&(t.dim+=i.gap);a&&t.pos+.5*t.dim<.5*n?t.pos=0:a&&t.pos+.5*t.dim>=i-.5*n?t.pos=i-n:s&&(t.pos+=-.5*(n-t.dim))})),e.forEach(((e,s)=>{o&&!this.isInfinite&&i>n&&(e.pos=Math.max(e.pos,0),e.pos=Math.min(e.pos,i-n)),e.pos=t(e.pos,1e3),e.dim=t(e.dim,1e3),Math.abs(e.pos)<=.1&&(e.pos=0)})),this.isInfinite)return e;const r=[];let l;return e.forEach((t=>{const e=Object.assign({},t);l&&e.pos===l.pos?(l.dim+=e.dim,l.slides=[...l.slides,...e.slides]):(e.index=r.length,l=e,r.push(e))})),r}getPageFromIndex(t=0){const e=this.pages.length;let i;return t=parseInt((t||0).toString())||0,i=this.isInfinite?(t%e+e)%e:Math.max(Math.min(t,e-1),0),i}getSlideMetrics(e){var i,n;const s=this.isHorizontal?"width":"height";let o=0,a=0,r=e.el;const l=r&&!r.parentNode;if(r?o=parseFloat(r.dataset[s]||"")||0:(r=document.createElement("div"),r.style.visibility="hidden",(this.track||document.body).prepend(r)),x(r,this.cn("slide")+" "+e.class+" "+e.customClass),o)r.style[s]=`${o}px`,r.style["width"===s?"height":"width"]="";else{l&&(this.track||document.body).prepend(r);const t=Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1);o=r.getBoundingClientRect()[s]*t}const h=getComputedStyle(r);return"content-box"===h.boxSizing&&(this.isHorizontal?(o+=parseFloat(h.paddingLeft)||0,o+=parseFloat(h.paddingRight)||0):(o+=parseFloat(h.paddingTop)||0,o+=parseFloat(h.paddingBottom)||0)),a=parseFloat(h[this.isHorizontal?"marginRight":"marginBottom"])||0,l?null===(n=r.parentElement)||void 0===n||n.removeChild(r):e.el||r.remove(),{dim:t(o,1e3),gap:t(a,1e3)}}getBounds(){const{isInfinite:t,isRTL:e,isHorizontal:i,pages:n}=this;let s={min:0,max:0};if(t)s={min:-1/0,max:1/0};else if(n.length){const t=n[0].pos,o=n[n.length-1].pos;s=e&&i?{min:t,max:o}:{min:-1*o,max:-1*t}}return{x:i?s:{min:0,max:0},y:i?{min:0,max:0}:s}}repositionSlides(){let e,{isHorizontal:i,isRTL:n,isInfinite:s,viewport:o,viewportDim:a,contentDim:r,page:l,pages:h,slides:c,panzoom:d}=this,u=0,g=0,p=0,f=0;d?f=-1*d.current[this.axis]:h[l]&&(f=h[l].pos||0),e=i?n?"right":"left":"top",n&&i&&(f*=-1);for(const i of c)i.el?("top"===e?(i.el.style.right="",i.el.style.left=""):i.el.style.top="",i.index!==u?i.el.style[e]=0===g?"":`${t(g,1e3)}px`:i.el.style[e]="",p+=i.dim+i.gap,u++):g+=i.dim+i.gap;if(s&&p&&o){let n=getComputedStyle(o),s="padding",l=i?"Right":"Bottom",h=parseFloat(n[s+(i?"Left":"Top")]);f-=h,a+=h,a+=parseFloat(n[s+l]);for(const i of c)i.el&&(t(i.pos)<t(a)&&t(i.pos+i.dim+i.gap)<t(f)&&t(f)>t(r-a)&&(i.el.style[e]=`${t(g+p,1e3)}px`),t(i.pos+i.gap)>=t(r-a)&&t(i.pos)>t(f+a)&&t(f)<t(a)&&(i.el.style[e]=`-${t(p,1e3)}px`))}let m,b,v=[...this.inTransition];if(v.length>1&&(m=h[v[0]],b=h[v[1]]),m&&b){let i=0;for(const n of c)n.el?this.inTransition.has(n.index)&&m.slides.indexOf(n)<0&&(n.el.style[e]=`${t(i+(m.pos-b.pos),1e3)}px`):i+=n.dim+n.gap}}createSlideEl(t){const{track:e,slides:i}=this;if(!e||!t)return;if(t.el&&t.el.parentNode)return;const n=t.el||document.createElement("div");x(n,this.cn("slide")),x(n,t.class),x(n,t.customClass);const s=t.html;s&&(s instanceof HTMLElement?n.appendChild(s):n.innerHTML=t.html+"");const o=[];i.forEach(((t,e)=>{t.el&&o.push(e)}));const a=t.index;let r=null;if(o.length){r=i[o.reduce(((t,e)=>Math.abs(e-a)<Math.abs(t-a)?e:t))]}const l=r&&r.el&&r.el.parentNode?r.index<t.index?r.el.nextSibling:r.el:null;e.insertBefore(n,e.contains(l)?l:null),t.el=n,this.emit("createSlide",t)}removeSlideEl(t,e=!1){const i=t.el;if(!i||!i.parentNode)return;const n=this.cn("isSelected");if(i.classList.contains(n)&&(w(i,n),this.emit("unselectSlide",t)),t.isDom&&!e)return i.removeAttribute("aria-hidden"),i.removeAttribute("data-index"),void(i.style.left="");this.emit("removeSlide",t);const s=new CustomEvent("animationend");i.dispatchEvent(s),t.el&&(t.el.remove(),t.el=null)}transitionTo(t=0,e=this.option("transition")){if(!e)return!1;const{pages:i,panzoom:n}=this;t=parseInt((t||0).toString())||0;const s=this.getPageFromIndex(t);if(!n||!i[s]||i.length<2||Math.abs(i[this.page].slides[0].dim-this.viewportDim)>1)return!1;const o=t>this.page?1:-1,a=this.pages[s].pos*(this.isRTL?1:-1);if(this.page===s&&Math.abs(a-n.target[this.axis])<1)return!1;this.clearTransitions();const r=n.isResting;x(this.container,this.cn("inTransition"));const l=this.pages[this.page].slides[0],h=this.pages[s].slides[0];this.inTransition.add(h.index),this.createSlideEl(h);let c=l.el,d=h.el;r||"slide"===e||(e="fadeFast",c=null);const u=this.isRTL?"next":"prev",g=this.isRTL?"prev":"next";return c&&(this.inTransition.add(l.index),l.transition=e,c.addEventListener("animationend",this.onAnimationEnd),c.classList.add(`f-${e}Out`,`to-${o>0?g:u}`)),d&&(h.transition=e,d.addEventListener("animationend",this.onAnimationEnd),d.classList.add(`f-${e}In`,`from-${o>0?u:g}`)),n.panTo({x:this.isHorizontal?a:0,y:this.isHorizontal?0:a,friction:0}),this.onChange(s),!0}manageSlideVisiblity(){const t=new Set,e=new Set,i=this.getVisibleSlides(parseFloat(this.option("preload",0)+"")||0);for(const n of this.slides)i.has(n)?t.add(n):e.add(n);for(const e of this.inTransition)t.add(this.slides[e]);for(const e of t)this.createSlideEl(e),this.lazyLoadSlide(e);for(const i of e)t.has(i)||this.removeSlideEl(i);this.markSelectedSlides(),this.repositionSlides()}markSelectedSlides(){if(!this.pages[this.page]||!this.pages[this.page].slides)return;const t="aria-hidden";let e=this.cn("isSelected");if(e)for(const i of this.slides){const n=i.el;n&&(n.dataset.index=`${i.index}`,this.pages[this.page].slides.includes(i)?(n.classList.contains(e)||(x(n,e),this.emit("selectSlide",i)),n.removeAttribute(t)):(n.classList.contains(e)&&(w(n,e),this.emit("unselectSlide",i)),n.setAttribute(t,"true")))}}flipInfiniteTrack(){const t=this.panzoom;if(!t||!this.isInfinite)return;const e="x"===this.option("axis")?"e":"f",{viewportDim:i,contentDim:n}=this;let s=t.current[e],o=t.target[e]-s,a=0,r=.5*i,l=n;this.isRTL&&this.isHorizontal?(s<-r&&(a=-1,s+=l),s>l-r&&(a=1,s-=l)):(s>r&&(a=1,s-=l),s<-l+r&&(a=-1,s+=l)),a&&(t.current[e]=s,t.target[e]=s+o)}lazyLoadSlide(t){const e=this,n=t&&t.el;if(!n)return;const s=new Set,o="f-fadeIn";n.querySelectorAll("[data-lazy-srcset]").forEach((t=>{t instanceof HTMLImageElement&&s.add(t)}));let a=Array.from(n.querySelectorAll("[data-lazy-src]"));n.dataset.lazySrc&&a.push(n),a.map((t=>{t instanceof HTMLImageElement?s.add(t):y(t)&&(t.style.backgroundImage=`url('${t.dataset.lazySrc||""}')`,delete t.dataset.lazySrc)}));const r=(t,i,n)=>{n&&(n.remove(),n=null),i.complete&&(i.classList.add(o),setTimeout((()=>{i.classList.remove(o)}),350),i.style.visibility=""),this.option("adaptiveHeight")&&t.el&&this.pages[this.page].slides.indexOf(t)>-1&&(e.updateMetrics(),e.setViewportHeight()),this.emit("load",t)};for(const e of s){let n=null;e.src=e.dataset.lazySrcset||e.dataset.lazySrc||"",delete e.dataset.lazySrc,delete e.dataset.lazySrcset,e.style.visibility="hidden",e.addEventListener("error",(()=>{r(t,e,n)})),e.addEventListener("load",(()=>{r(t,e,n)})),setTimeout((()=>{e.parentNode&&t.el&&(e.complete?r(t,e,n):(n=i(v),e.parentNode.insertBefore(n,e)))}),300)}}onAnimationEnd(t){var e;const i=t.target,n=i?parseInt(i.dataset.index||"",10)||0:-1,s=this.slides[n],o=t.animationName;if(!i||!s||!o)return;const a=!!this.inTransition.has(n)&&s.transition;a&&o.substring(0,a.length+2)===`f-${a}`&&this.inTransition.delete(n),this.inTransition.size||this.clearTransitions(),n===this.page&&(null===(e=this.panzoom)||void 0===e?void 0:e.isResting)&&this.emit("settle")}onDecel(t,e=0,i=0,n=0,s=0){const{isRTL:o,isHorizontal:a,axis:r,pages:l}=this,h=l.length,c=Math.abs(Math.atan2(i,e)/(Math.PI/180));let d=0;if(d=c>45&&c<135?a?0:i:a?e:0,!h)return;const u=this.option("dragFree");let g=this.page,p=o&&a?1:-1;const f=t.target[r]*p,m=t.current[r]*p;let{pageIndex:b}=this.getPageFromPosition(f),{pageIndex:v}=this.getPageFromPosition(m);u?this.onChange(b):(Math.abs(d)>5?(l[g].dim<document.documentElement["client"+(this.isHorizontal?"Width":"Height")]-1&&(g=v),g=o&&a?d<0?g-1:g+1:d<0?g+1:g-1):g=0===n&&0===s?g:v,this.slideTo(g,{transition:!1,friction:t.option("decelFriction")}))}onClick(t){const e=t.target,i=e&&y(e)?e.dataset:null;let n,s;i&&(void 0!==i.carouselPage?(s="slideTo",n=i.carouselPage):void 0!==i.carouselNext?s="slideNext":void 0!==i.carouselPrev&&(s="slidePrev")),s?(t.preventDefault(),t.stopPropagation(),e&&!e.hasAttribute("disabled")&&this[s](n)):this.emit("click",t)}onSlideTo(t){const e=t.detail||0;this.slideTo(this.getPageForSlide(e),{friction:0})}onChange(t,e=0){const i=this.page;this.prevPage=i,this.page=t,this.option("adaptiveHeight")&&this.setViewportHeight(),t!==i&&(this.markSelectedSlides(),this.emit("change",t,i,e))}onRefresh(){let t=this.contentDim,e=this.viewportDim;this.updateMetrics(),this.contentDim===t&&this.viewportDim===e||this.slideTo(this.page,{friction:0,transition:!1})}onResize(){this.option("breakpoints")&&this.processOptions()}onBeforeTransform(t){this.lp!==t.current[this.axis]&&(this.flipInfiniteTrack(),this.manageSlideVisiblity()),this.lp=t.current.e}onEndAnimation(){this.inTransition.size||this.emit("settle")}reInit(t=null,e=null){this.destroy(),this.state=D.Init,this.userOptions=t||this.userOptions,this.userPlugins=e||this.userPlugins,this.processOptions()}slideTo(t=0,{friction:e=this.option("friction"),transition:i=this.option("transition")}={}){if(this.state===D.Destroy)return;t=parseInt((t||0).toString())||0;const n=this.getPageFromIndex(t);if(this.page!==n){const e=new Event("beforeChange",{bubbles:!0,cancelable:!0});if(this.emit("beforeChange",e,t),e.defaultPrevented)return}const{axis:s,isHorizontal:o,isRTL:a,pages:r,panzoom:l}=this,h=r.length,c=a&&o?1:-1;if(!l||!h)return;if(this.transitionTo(t,i))return;let d=r[n].pos;if(this.isInfinite){const e=this.contentDim,i=l.target[s]*c;if(2===h)d+=e*Math.floor(parseFloat(t+"")/2);else{const t=i;d=[d,d-e,d+e].reduce((function(e,i){return Math.abs(i-t)<Math.abs(e-t)?i:e}))}}d*=c,Math.abs(l.target[s]-d)<.1||(l.panTo({x:o?d:0,y:o?0:d,friction:e}),this.onChange(n))}slideToClosest(t){if(this.panzoom){const{pageIndex:e}=this.getPageFromPosition(this.panzoom.current[this.isHorizontal?"e":"f"]);this.slideTo(e,t)}}slideNext(){this.slideTo(this.page+1)}slidePrev(){this.slideTo(this.page-1)}clearTransitions(){this.inTransition.clear(),w(this.container,this.cn("inTransition"));const t=["to-prev","to-next","from-prev","from-next"];for(const e of this.slides){const i=e.el;if(i){i.removeEventListener("animationend",this.onAnimationEnd),i.classList.remove(...t);const n=e.transition;n&&i.classList.remove(`f-${n}Out`,`f-${n}In`)}}this.manageSlideVisiblity()}prependSlide(t){var e,i;let n=Array.isArray(t)?t:[t];for(const t of n.reverse())this.slides.unshift(j(t));for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;const s=(null===(e=this.pages[this.page])||void 0===e?void 0:e.pos)||0;this.page+=n.length,this.updateMetrics();const o=(null===(i=this.pages[this.page])||void 0===i?void 0:i.pos)||0;if(this.panzoom){const t=this.isRTL?s-o:o-s;this.panzoom.target.e-=t,this.panzoom.current.e-=t,this.panzoom.requestTick()}}appendSlide(t){let e=Array.isArray(t)?t:[t];for(const t of e){const e=j(t);e.index=this.slides.length,this.slides.push(e),this.emit("initSlide",e,this.slides.length)}this.updateMetrics()}removeSlide(t){const e=this.slides.length;t=(t%e+e)%e,this.removeSlideEl(this.slides[t],!0),this.slides.splice(t,1);for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;this.updateMetrics(),this.slideTo(this.page,{friction:0,transition:!1})}updateMetrics(){const{panzoom:e,viewport:i,track:n,isHorizontal:s}=this;if(!n)return;const o=s?"width":"height",a=s?"offsetWidth":"offsetHeight";if(i){let e=Math.max(i[a],t(i.getBoundingClientRect()[o],1e3)),n=getComputedStyle(i),r="padding",l=s?"Right":"Bottom";e-=parseFloat(n[r+(s?"Left":"Top")])+parseFloat(n[r+l]),this.viewportDim=e}let r,l=this.pages.length,h=0;for(const[e,i]of this.slides.entries()){let n=0,s=0;!i.el&&r?(n=r.dim,s=r.gap):(({dim:n,gap:s}=this.getSlideMetrics(i)),r=i),n=t(n,1e3),s=t(s,1e3),i.dim=n,i.gap=s,i.pos=h,h+=n,(this.isInfinite||e<this.slides.length-1)&&(h+=s)}const c=this.contentDim;h=t(h,1e3),this.contentDim=h,e&&(e.contentRect[o]=h,e.contentRect["e"===this.axis?"fullWidth":"fullHeight"]=h),this.pages=this.createPages(),this.pages=this.processPages(),this.state===D.Init&&this.setInitialPage(),this.page=Math.max(0,Math.min(this.page,this.pages.length-1)),e&&l===this.pages.length&&Math.abs(h-c)>.5&&(e.target[this.axis]=-1*this.pages[this.page].pos,e.current[this.axis]=-1*this.pages[this.page].pos,e.stop()),this.manageSlideVisiblity(),this.emit("refresh")}getProgress(e,i=!1){void 0===e&&(e=this.page);const n=this,s=n.panzoom,o=n.pages[e]||0;if(!o||!s)return 0;let a=-1*s.current.e,r=n.contentDim;var l=[t((a-o.pos)/(1*o.dim),1e3),t((a+r-o.pos)/(1*o.dim),1e3),t((a-r-o.pos)/(1*o.dim),1e3)].reduce((function(t,e){return Math.abs(e)<Math.abs(t)?e:t}));return i?l:Math.max(-1,Math.min(1,l))}setViewportHeight(){const{page:t,pages:e,viewport:i,isHorizontal:n}=this;if(!i||!e[t])return;let s=0;n&&this.track&&(this.track.style.height="auto",e[t].slides.forEach((t=>{t.el&&(s=Math.max(s,t.el.offsetHeight))}))),i.style.height=s?`${s}px`:""}getPageForSlide(t){for(const e of this.pages)for(const i of e.slides)if(i.index===t)return e.index;return-1}getVisibleSlides(t=0){var e;const i=new Set;let{contentDim:n,viewportDim:s,pages:o,page:a}=this;n=n+(null===(e=this.slides[this.slides.length-1])||void 0===e?void 0:e.gap)||0;let r=0;r=this.panzoom?-1*this.panzoom.current[this.axis]:o[a]&&o[a].pos||0,this.isInfinite&&(r-=Math.floor(r/n)*n),this.isRTL&&this.isHorizontal&&(r*=-1);const l=r-s*t,h=r+s*(t+1),c=this.isInfinite?[-1,0,1]:[0];for(const t of this.slides)for(const e of c){const s=t.pos+e*n,o=t.pos+t.dim+t.gap+e*n;s<h&&o>l&&i.add(t)}return i}getPageFromPosition(t){const{viewportDim:e,contentDim:i}=this,n=this.pages.length,s=this.slides.length,o=this.slides[s-1];let a=0,r=0,l=0;const h=this.option("center");h&&(t+=.5*e),this.isInfinite||(t=Math.max(this.slides[0].pos,Math.min(t,o.pos)));const c=i+o.gap;l=Math.floor(t/c)||0,t-=l*c;let d=o,u=this.slides.find((e=>{const i=t+(d&&!h?.5*d.dim:0);return d=e,e.pos<=i&&e.pos+e.dim+e.gap>i}));return u||(u=o),r=this.getPageForSlide(u.index),a=r+l*n,{page:a,pageIndex:r}}destroy(){if([D.Destroy].includes(this.state))return;this.state=D.Destroy;const{container:t,viewport:e,track:i,slides:n,panzoom:s}=this,o=this.option("classes");t.removeEventListener("click",this.onClick,{passive:!1,capture:!1}),t.removeEventListener("slideTo",this.onSlideTo),window.removeEventListener("resize",this.onResize),s&&(s.destroy(),this.panzoom=null),n&&n.forEach((t=>{this.removeSlideEl(t)})),this.detachPlugins(),e&&e.offsetParent&&i&&i.offsetParent&&e.replaceWith(...i.childNodes);for(const[e,i]of Object.entries(o))"container"!==e&&i&&t.classList.remove(i);this.track=null,this.viewport=null,this.page=0,this.slides=[];const a=this.events.get("ready");this.events=new Map,a&&this.events.set("ready",a)}}Object.defineProperty(V,"Panzoom",{enumerable:!0,configurable:!0,writable:!0,value:L}),Object.defineProperty(V,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:A}),Object.defineProperty(V,"Plugins",{enumerable:!0,configurable:!0,writable:!0,value:Z});

;// CONCATENATED MODULE: ./node_modules/@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js
const carousel_autoplay_esm_e=(t,...s)=>{const n=s.length;for(let i=0;i<n;i++){const n=s[i]||{};Object.entries(n).forEach((([s,n])=>{const i=Array.isArray(n)?[]:{};var o;t[s]||Object.assign(t,{[s]:i}),"object"==typeof(o=n)&&null!==o&&o.constructor===Object&&"[object Object]"===Object.prototype.toString.call(o)?Object.assign(t[s],carousel_autoplay_esm_e(i,n)):Array.isArray(n)?Object.assign(t,{[s]:[...n]}):Object.assign(t,{[s]:n})}))}return t},carousel_autoplay_esm_t=function(e,t){return e.split(".").reduce(((e,t)=>"object"==typeof e?e[t]:void 0),t)};class carousel_autoplay_esm_s{constructor(e={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(e);for(const e of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))e.startsWith("on")&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}setOptions(t){this.options=t?carousel_autoplay_esm_e({},this.constructor.defaults,t):{};for(const[e,t]of Object.entries(this.option("on")||{}))this.on(e,t)}option(e,...s){let n=carousel_autoplay_esm_t(e,this.options);return n&&"function"==typeof n&&(n=n.call(this,this,...s)),n}optionFor(e,s,n,...i){let o=carousel_autoplay_esm_t(s,e);var r;"string"!=typeof(r=o)||isNaN(r)||isNaN(parseFloat(r))||(o=parseFloat(o)),"true"===o&&(o=!0),"false"===o&&(o=!1),o&&"function"==typeof o&&(o=o.call(this,this,e,...i));let a=carousel_autoplay_esm_t(s,this.options);return a&&"function"==typeof a?o=a.call(this,this,e,...i,o):void 0===o&&(o=a),void 0===o?n:o}cn(e){const t=this.options.classes;return t&&t[e]||""}localize(e,t=[]){e=String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g,((e,t,s)=>{let n="";return s?n=this.option(`${t[0]+t.toLowerCase().substring(1)}.l10n.${s}`):t&&(n=this.option(`l10n.${t}`)),n||(n=e),n}));for(let s=0;s<t.length;s++)e=e.split(t[s][0]).join(t[s][1]);return e=e.replace(/\{\{(.*?)\}\}/g,((e,t)=>t))}on(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),this.events||(this.events=new Map),s.forEach((e=>{let s=this.events.get(e);s||(this.events.set(e,[]),s=[]),s.includes(t)||s.push(t),this.events.set(e,s)}))}off(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),s.forEach((e=>{const s=this.events.get(e);if(Array.isArray(s)){const e=s.indexOf(t);e>-1&&s.splice(e,1)}}))}emit(e,...t){[...this.events.get(e)||[]].forEach((e=>e(this,...t))),"*"!==e&&this.emit("*",e,...t)}}Object.defineProperty(carousel_autoplay_esm_s,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.24"}),Object.defineProperty(carousel_autoplay_esm_s,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class carousel_autoplay_esm_n extends carousel_autoplay_esm_s{constructor(e,t){super(t),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:e})}attach(){}detach(){}}const carousel_autoplay_esm_i=e=>`${e||""}`.split(" ").filter((e=>!!e)),carousel_autoplay_esm_o=(e,t)=>{e&&carousel_autoplay_esm_i(t).forEach((t=>{e.classList.add(t)}))},carousel_autoplay_esm_r="play",carousel_autoplay_esm_a="pause",carousel_autoplay_esm_l="ready";class carousel_autoplay_esm_c extends carousel_autoplay_esm_n{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:carousel_autoplay_esm_l}),Object.defineProperty(this,"inHover",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null})}get isActive(){return this.state!==carousel_autoplay_esm_l}onReady(e){this.option("autoStart")&&(e.isInfinite||e.page<e.pages.length-1)&&this.start()}onChange(){var e;(null===(e=this.instance.panzoom)||void 0===e?void 0:e.isResting)||(this.removeProgressBar(),this.pause())}onSettle(){this.resume()}onVisibilityChange(){"visible"===document.visibilityState?this.resume():this.pause()}onMouseEnter(){this.inHover=!0,this.pause()}onMouseLeave(){var e;this.inHover=!1,(null===(e=this.instance.panzoom)||void 0===e?void 0:e.isResting)&&this.resume()}onTimerEnd(){const e=this.instance;"play"===this.state&&(e.isInfinite||e.page!==e.pages.length-1?e.slideNext():e.slideTo(0))}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}createProgressBar(){var e;if(!this.option("showProgress"))return null;this.removeProgressBar();const t=this.instance,s=(null===(e=t.pages[t.page])||void 0===e?void 0:e.slides)||[];let n=this.option("progressParentEl");if(n||(n=(1===s.length?s[0].el:null)||t.viewport),!n)return null;const i=document.createElement("div");return carousel_autoplay_esm_o(i,"f-progress"),n.prepend(i),this.progressBar=i,i.offsetHeight,i}set(){const e=this,t=e.instance;if(t.pages.length<2)return;if(e.timer)return;const s=e.option("timeout");e.state=carousel_autoplay_esm_r,carousel_autoplay_esm_o(t.container,"has-autoplay");let n=e.createProgressBar();n&&(n.style.transitionDuration=`${s}ms`,n.style.transform="scaleX(1)"),e.timer=setTimeout((()=>{e.timer=null,e.inHover||e.onTimerEnd()}),s),e.emit("set")}clear(){const e=this;e.timer&&(clearTimeout(e.timer),e.timer=null),e.removeProgressBar()}start(){const e=this;if(e.set(),e.state!==carousel_autoplay_esm_l){if(e.option("pauseOnHover")){const t=e.instance.container;t.addEventListener("mouseenter",e.onMouseEnter,!1),t.addEventListener("mouseleave",e.onMouseLeave,!1)}document.addEventListener("visibilitychange",e.onVisibilityChange,!1),e.emit("start")}}stop(){const e=this,t=e.state,s=e.instance.container;var n,o;e.clear(),e.state=carousel_autoplay_esm_l,s.removeEventListener("mouseenter",e.onMouseEnter,!1),s.removeEventListener("mouseleave",e.onMouseLeave,!1),document.removeEventListener("visibilitychange",e.onVisibilityChange,!1),o="has-autoplay",(n=s)&&carousel_autoplay_esm_i(o).forEach((e=>{n.classList.remove(e)})),t!==carousel_autoplay_esm_l&&e.emit("stop")}pause(){const e=this;e.state===carousel_autoplay_esm_r&&(e.state=carousel_autoplay_esm_a,e.clear(),e.emit(carousel_autoplay_esm_a))}resume(){const e=this,t=e.instance;if(t.isInfinite||t.page!==t.pages.length-1)if(e.state!==carousel_autoplay_esm_r){if(e.state===carousel_autoplay_esm_a&&!e.inHover){const t=new Event("resume",{bubbles:!0,cancelable:!0});e.emit("resume",t),t.defaultPrevented||e.set()}}else e.set();else e.stop()}toggle(){this.state===carousel_autoplay_esm_r||this.state===carousel_autoplay_esm_a?this.stop():this.start()}attach(){const e=this,t=e.instance;t.on("ready",e.onReady),t.on("Panzoom.startAnimation",e.onChange),t.on("Panzoom.endAnimation",e.onSettle),t.on("Panzoom.touchMove",e.onChange)}detach(){const e=this,t=e.instance;t.off("ready",e.onReady),t.off("Panzoom.startAnimation",e.onChange),t.off("Panzoom.endAnimation",e.onSettle),t.off("Panzoom.touchMove",e.onChange),e.stop()}}Object.defineProperty(carousel_autoplay_esm_c,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{autoStart:!0,pauseOnHover:!0,progressParentEl:null,showProgress:!0,timeout:3e3}});

;// CONCATENATED MODULE: ./node_modules/@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js
const carousel_thumbs_esm_t=(e,...i)=>{const n=i.length;for(let s=0;s<n;s++){const n=i[s]||{};Object.entries(n).forEach((([i,n])=>{const s=Array.isArray(n)?[]:{};var r;e[i]||Object.assign(e,{[i]:s}),"object"==typeof(r=n)&&null!==r&&r.constructor===Object&&"[object Object]"===Object.prototype.toString.call(r)?Object.assign(e[i],carousel_thumbs_esm_t(s,n)):Array.isArray(n)?Object.assign(e,{[i]:[...n]}):Object.assign(e,{[i]:n})}))}return e},carousel_thumbs_esm_e=function(t){var e=(new DOMParser).parseFromString(t,"text/html").body;if(e.childElementCount>1){for(var i=document.createElement("div");e.firstChild;)i.appendChild(e.firstChild);return i}return e.firstChild},carousel_thumbs_esm_i=t=>`${t||""}`.split(" ").filter((t=>!!t)),carousel_thumbs_esm_n=(t,e)=>{t&&carousel_thumbs_esm_i(e).forEach((e=>{t.classList.add(e)}))},carousel_thumbs_esm_s=(t,e,n)=>{carousel_thumbs_esm_i(e).forEach((e=>{t&&t.classList.toggle(e,n||!1)}))},carousel_thumbs_esm_r=(t,e)=>{t&&carousel_thumbs_esm_i(e).forEach((e=>{t.classList.remove(e)}))},carousel_thumbs_esm_o=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class carousel_thumbs_esm_a{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(e){this.options=e?carousel_thumbs_esm_t({},this.constructor.defaults,e):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...e){let i=carousel_thumbs_esm_o(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...n){let s=carousel_thumbs_esm_o(e,t);var r;"string"!=typeof(r=s)||isNaN(r)||isNaN(parseFloat(r))||(s=parseFloat(s)),"true"===s&&(s=!0),"false"===s&&(s=!1),s&&"function"==typeof s&&(s=s.call(this,this,t,...n));let a=carousel_thumbs_esm_o(e,this.options);return a&&"function"==typeof a?s=a.call(this,this,t,...n,s):void 0===s&&(s=a),void 0===s?i:s}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let n="";return i?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t),n}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i)}))}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(carousel_thumbs_esm_a,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.24"}),Object.defineProperty(carousel_thumbs_esm_a,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class carousel_thumbs_esm_l extends carousel_thumbs_esm_a{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:t})}attach(){}detach(){}}var carousel_thumbs_esm_h,carousel_thumbs_esm_c;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy"}(carousel_thumbs_esm_h||(carousel_thumbs_esm_h={})),function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Destroy=2]="Destroy"}(carousel_thumbs_esm_c||(carousel_thumbs_esm_c={}));const carousel_thumbs_esm_u=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),carousel_thumbs_esm_d={classes:{container:"f-thumbs f-carousel__thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide",isResting:"is-resting",isSelected:"is-selected",isLoading:"is-loading",hasThumbs:"has-thumbs"},minCount:2,parentEl:null,thumbTpl:'<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',type:"modern"};var carousel_thumbs_esm_p;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Hidden=2]="Hidden"}(carousel_thumbs_esm_p||(carousel_thumbs_esm_p={}));class carousel_thumbs_esm_b extends carousel_thumbs_esm_l{constructor(){super(...arguments),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:"modern"}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"track",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"carousel",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"panzoom",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"thumbWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbClipWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbHeight",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbGap",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbExtraGap",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"shouldCenter",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:carousel_thumbs_esm_p.Init})}formatThumb(t,e){return this.instance.localize(e,[["%i",t.index],["%d",t.index+1],["%s",t.thumbSrc||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]])}getSlides(){const t=[],e=this.option("thumbTpl")||"";if(e)for(const i of this.instance.slides||[]){let n="";i.type&&(n=`for-${i.type}`,i.type&&["video","youtube","vimeo","html5video"].includes(i.type)&&(n+=" for-video")),t.push({html:this.formatThumb(i,e),customClass:n})}return t}onInitSlide(t,e){const i=e.el;i&&(e.thumbSrc=i.dataset.thumbSrc||e.thumbSrc||"",e.thumbClipWidth=parseFloat(i.dataset.thumbClipWidth||"")||e.thumbClipWidth||0,e.thumbHeight=parseFloat(i.dataset.thumbHeight||"")||e.thumbHeight||0)}onInitSlides(){this.build()}onRefreshM(){this.refreshModern()}onChangeM(){"modern"===this.type&&(this.shouldCenter=!0,this.centerModern())}onClickModern(t){t.preventDefault(),t.stopPropagation();const e=this.instance,i=e.page,n=t=>{if(t){const e=t.closest("[data-carousel-index]");if(e)return parseInt(e.dataset.carouselIndex||"",10)||0}return-1},s=(t,e)=>{const i=document.elementFromPoint(t,e);return i?n(i):-1};let r=n(t.target);r<0&&(r=s(t.clientX+this.thumbGap,t.clientY),r===i&&(r=i-1)),r<0&&(r=s(t.clientX-this.thumbGap,t.clientY),r===i&&(r=i+1)),r<0&&(r=(e=>{let n=s(t.clientX-e,t.clientY),o=s(t.clientX+e,t.clientY);return r<0&&n===i&&(r=i+1),r<0&&o===i&&(r=i-1),r})(this.thumbExtraGap)),r===i?this.centerModern():r>-1&&r<e.pages.length&&e.slideTo(r)}onTransformM(){if("modern"!==this.type)return;const{instance:t,container:e,track:i}=this,n=t.panzoom;if(!(e&&i&&n&&this.panzoom))return;carousel_thumbs_esm_s(e,this.cn("isResting"),n.state!==carousel_thumbs_esm_h.Init&&n.isResting);const r=this.thumbGap,o=this.thumbExtraGap,a=this.thumbClipWidth;let l=0,c=0,u=0;for(const e of t.slides){let i=e.index,n=e.thumbSlideEl;if(!n)continue;carousel_thumbs_esm_s(n,this.cn("isSelected"),i===t.page),c=1-Math.abs(t.getProgress(i)),n.style.setProperty("--progress",c?c+"":"");const h=.5*((e.thumbWidth||0)-a);l+=r,l+=h,c&&(l-=c*(h+o)),n.style.setProperty("--shift",l-r+""),l+=h,c&&(l-=c*(h+o)),l-=r,0===i&&(u=o*c)}i&&(i.style.setProperty("--left",u+""),i.style.setProperty("--width",l+u+r+o*c+"")),this.shouldCenter&&this.centerModern()}buildClassic(){const{container:e,track:i}=this,n=this.getSlides();if(!e||!i||!n)return;const s=new this.instance.constructor(e,carousel_thumbs_esm_t({track:i,infinite:!1,center:!0,fill:!0,dragFree:!0,slidesPerPage:1,transition:!1,Dots:!1,Navigation:!1,classes:{container:"f-thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide"}},this.option("Carousel")||{},{Sync:{target:this.instance},slides:n}));this.carousel=s,this.track=i,s.on("ready",(()=>{this.emit("ready")})),s.on("createSlide",((t,e)=>{this.emit("createSlide",e,e.el)}))}buildModern(){if("modern"!==this.type)return;const{container:t,track:i,instance:s}=this,o=this.option("thumbTpl")||"";if(!t||!i||!o)return;t.addEventListener("keydown",(()=>{carousel_thumbs_esm_r(t,"is-using-mouse")})),carousel_thumbs_esm_n(t,"is-horizontal"),this.updateModern();for(const t of s.slides||[]){const s=document.createElement("div");if(carousel_thumbs_esm_n(s,this.cn("slide")),t.type){let e=`for-${t.type}`;["video","youtube","vimeo","html5video"].includes(t.type)&&(e+=" for-video"),carousel_thumbs_esm_n(s,e)}s.appendChild(carousel_thumbs_esm_e(this.formatThumb(t,o))),this.emit("createSlide",t,s),t.thumbSlideEl=s,i.appendChild(s),this.resizeModernSlide(t)}const a=new s.constructor.Panzoom(t,{content:i,lockAxis:"x",zoom:!1,panOnlyZoomed:!1,bounds:()=>{let t=0,e=0,i=s.slides[0],n=s.slides[s.slides.length-1],r=s.slides[s.page];return i&&n&&r&&(e=-1*this.getModernThumbPos(0),0!==s.page&&(e+=.5*(i.thumbWidth||0)),t=-1*this.getModernThumbPos(s.slides.length-1),s.page!==s.slides.length-1&&(t+=(n.thumbWidth||0)-(r.thumbWidth||0)-.5*(n.thumbWidth||0))),{x:{min:t,max:e},y:{min:0,max:0}}}});a.on("touchStart",((t,e)=>{this.shouldCenter=!1,carousel_thumbs_esm_n(this.container,"is-using-mouse")})),a.on("click",((t,e)=>this.onClickModern(e))),a.on("ready",(()=>{this.centerModern(),this.emit("ready")})),a.on(["afterTransform","refresh"],(t=>{this.lazyLoadModern()})),this.panzoom=a,this.refreshModern()}updateModern(){if("modern"!==this.type)return;const{container:t}=this;t&&(this.thumbGap=parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-gap"))||0,this.thumbExtraGap=parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-extra-gap"))||0,this.thumbWidth=parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-width"))||40,this.thumbClipWidth=parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-clip-width"))||40,this.thumbHeight=parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-height"))||40)}refreshModern(){var t;if("modern"===this.type){this.updateModern();for(const t of this.instance.slides||[])this.resizeModernSlide(t);this.onTransformM(),null===(t=this.panzoom)||void 0===t||t.updateMetrics(!0),this.centerModern(0)}}centerModern(t){const e=this.instance,{container:i,panzoom:n}=this;if(!i||!n||n.state===carousel_thumbs_esm_h.Init)return;const s=e.page;let r=this.getModernThumbPos(s),o=r;for(let t=e.page-3;t<e.page+3;t++){if(t<0||t>e.pages.length-1||t===e.page)continue;const i=1-Math.abs(e.getProgress(t));i>0&&i<1&&(o+=i*(this.getModernThumbPos(t)-r))}let a=100;void 0===t&&(t=.2,e.inTransition.size>0&&(t=.12),Math.abs(-1*n.current.e-o)>n.containerRect.width&&(t=.5,a=0)),n.options.maxVelocity=a,n.applyChange({panX:carousel_thumbs_esm_u(-1*o-n.target.e,1e3),friction:null===e.prevPage?0:t})}lazyLoadModern(){const{instance:t,panzoom:i}=this;if(!i)return;const s=-1*i.current.e||0;let r=this.getModernThumbPos(t.page);if(i.state!==carousel_thumbs_esm_h.Init||0===r)for(const r of t.slides||[]){const t=r.thumbSlideEl;if(!t)continue;const o=t.querySelector("img[data-lazy-src]"),a=r.index,l=this.getModernThumbPos(a),h=s-.5*i.containerRect.innerWidth,c=h+i.containerRect.innerWidth;if(!o||l<h||l>c)continue;let u=o.dataset.lazySrc;if(!u||!u.length)continue;if(delete o.dataset.lazySrc,o.src=u,o.complete)continue;carousel_thumbs_esm_n(t,this.cn("isLoading"));const d=carousel_thumbs_esm_e('<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>');t.appendChild(d),o.addEventListener("load",(()=>{t.offsetParent&&(t.classList.remove(this.cn("isLoading")),d.remove())}),!1)}}resizeModernSlide(t){if("modern"!==this.type)return;if(!t.thumbSlideEl)return;const e=t.thumbClipWidth&&t.thumbHeight?Math.round(this.thumbHeight*(t.thumbClipWidth/t.thumbHeight)):this.thumbWidth;t.thumbWidth=e}getModernThumbPos(t){const e=this.instance.slides[t],i=this.panzoom;if(!i||!i.contentRect.fitWidth)return 0;let n=i.containerRect.innerWidth,s=i.contentRect.width;2===this.instance.slides.length&&(t-=1,s=2*this.thumbClipWidth);let r=t*(this.thumbClipWidth+this.thumbGap)+this.thumbExtraGap+.5*(e.thumbWidth||0);return r-=s>n?.5*n:.5*s,carousel_thumbs_esm_u(r||0,1)}isDisabled(){const t=this.option("minCount")||0;if(t){const e=this.instance;let i=0;for(const t of e.slides||[])t.thumbSrc&&i++;if(i<t)return!0}const e=this.option("type");return["modern","classic"].indexOf(e)<0}build(){if(this.state!==carousel_thumbs_esm_p.Init)return;if(this.isDisabled())return;const t=this.instance.container,e=this.option("type");this.type=e;const i=document.createElement("div");carousel_thumbs_esm_n(i,this.cn("container")),carousel_thumbs_esm_n(i,`is-${e}`);const s=this.option("parentEl");s?s.appendChild(i):t.after(i),this.container=i,carousel_thumbs_esm_n(t,this.cn("hasThumbs"));const r=document.createElement("div");carousel_thumbs_esm_n(r,this.cn("track")),i.appendChild(r),this.track=r,"classic"===e?this.buildClassic():this.buildModern(),this.state=carousel_thumbs_esm_p.Ready}cleanup(){this.carousel&&this.carousel.destroy(),this.carousel=null,this.panzoom&&this.panzoom.destroy(),this.panzoom=null,this.container&&this.container.remove(),this.container=null,this.track=null,this.state=carousel_thumbs_esm_p.Init,carousel_thumbs_esm_r(this.instance.container,this.cn("hasThumbs"))}attach(){const t=this,e=t.instance;e.on("initSlide",t.onInitSlide),e.state===carousel_thumbs_esm_c.Init?e.on("initSlides",t.onInitSlides):t.onInitSlides(),e.on("Panzoom.afterTransform",t.onTransformM),e.on("Panzoom.refresh",t.onRefreshM),e.on("change",t.onChangeM)}detach(){const t=this,e=t.instance;e.off("initSlide",t.onInitSlide),e.off("initSlides",t.onInitSlides),e.off("Panzoom.afterTransform",t.onTransformM),e.off("Panzoom.refresh",t.onRefreshM),e.off("change",t.onChangeM),t.cleanup()}}Object.defineProperty(carousel_thumbs_esm_b,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:carousel_thumbs_esm_d});

;// CONCATENATED MODULE: ./src/js/modules/fancyapps.js




const fRU = {
	NEXT: " ",
	PREV: " ",
	GOTO: "Перейти к слайду #%d",
};

V.defaults = {
	...V.defaults,
	infinite: false,
	center: false,
	slidesPerPage: 1,
	l10n: fRU,
	Thumbs: {
		type: "classic",
	},
};

function carouselsInit(el = false) {
	const next = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M10.452 1 18 9m0 0-7.548 8M18 9H0"/></svg>`,
		prev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M8.548 1 1 9m0 0 7.548 8M1 9h18"/></svg>`;

	const carousels = el ? el.querySelectorAll('[data-carousel="carousel"]') : document.querySelectorAll('[data-carousel="carousel"]');

	carousels.forEach((carousel) => {
		let options = {};
		let autoplay = {};
		let thumbs = {};
		let plugins = {};
		let navigation = {};
		let breakpoints = {};
		// console.log(Object.keys( carousel.dataset ));

		if (carousel.dataset.options) {
			options = JSON.parse(carousel.dataset.options);
		}

		if (carousel.dataset.autoplay) {
			Object.assign(autoplay, { Autoplay: { timeout: parseInt(carousel.dataset.autoplay) } });
			Object.assign(plugins, { Autoplay: carousel_autoplay_esm_c });
		}

		// thumbs only for breakpoint
		if (carousel.dataset.thumbs == "true" && carousel.dataset.thumbsOn) {
			Object.assign(options, { Thumbs: false });
			Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.thumbsOn})`]: { Thumbs: {} } } });
			Object.assign(plugins, { Thumbs: carousel_thumbs_esm_b });
		}

		// thumbs when data-thumbs="true"
		if (carousel.dataset.thumbs == "true" && !carousel.dataset.thumbsOn) {
			Object.assign(thumbs, { Thumbs: {} });
			Object.assign(plugins, { Thumbs: carousel_thumbs_esm_b });
		}

		if (carousel.dataset.disabled) {
			Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.disabled})`]: { enabled: false } } });
		}

		if (carousel.classList.contains("carousel-top-nav")) {
			Object.assign(navigation, { Navigation: { nextTpl: next, prevTpl: prev } });
		}

		Object.assign(options, autoplay, thumbs, navigation, breakpoints);

		if (Object.keys(plugins).length > 0 && plugins.constructor === Object) {
			new V(carousel, options, plugins);
		} else {
			new V(carousel, options);
		}
	});

	const productPhotos = document.getElementById("productPhotos");

	if (!productPhotos || productPhotos.classList.contains("is-ltr")) {
		// not exist or already initialized
		return;
	}

	new V(
		productPhotos,
		{
			transition: "classic",
			preload: 3,
			Navigation: false,
			Thumbs: false,
			breakpoints: {
				"(min-width: 1024px)": {
					Dots: false,
					Thumbs: {
						type: "classic",
						Carousel: {
							Navigation: {
								nextTpl: next,
								prevTpl: prev,
							},
							axis: "y",
						},
					},
				},
			},
		},
		{ Thumbs: carousel_thumbs_esm_b }
	);
}

;// CONCATENATED MODULE: ./node_modules/nouislider/dist/nouislider.mjs

var PipsMode;
(function (PipsMode) {
    PipsMode["Range"] = "range";
    PipsMode["Steps"] = "steps";
    PipsMode["Positions"] = "positions";
    PipsMode["Count"] = "count";
    PipsMode["Values"] = "values";
})(PipsMode || (PipsMode = {}));
var PipsType;
(function (PipsType) {
    PipsType[PipsType["None"] = -1] = "None";
    PipsType[PipsType["NoValue"] = 0] = "NoValue";
    PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
    PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
})(PipsType || (PipsType = {}));
//region Helper Methods
function isValidFormatter(entry) {
    return isValidPartialFormatter(entry) && typeof entry.from === "function";
}
function isValidPartialFormatter(entry) {
    // partial formatters only need a to function and not a from function
    return typeof entry === "object" && typeof entry.to === "function";
}
function removeElement(el) {
    el.parentElement.removeChild(el);
}
function isSet(value) {
    return value !== null && value !== undefined;
}
// Bindable version
function preventDefault(e) {
    e.preventDefault();
}
// Removes duplicates from an array.
function unique(array) {
    return array.filter(function (a) {
        return !this[a] ? (this[a] = true) : false;
    }, {});
}
// Round a value to the closest 'to'.
function closest(value, to) {
    return Math.round(value / to) * to;
}
// Current position of an element relative to the document.
function offset(elem, orientation) {
    var rect = elem.getBoundingClientRect();
    var doc = elem.ownerDocument;
    var docElem = doc.documentElement;
    var pageOffset = getPageOffset(doc);
    // getBoundingClientRect contains left scroll in Chrome on Android.
    // I haven't found a feature detection that proves this. Worst case
    // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
        pageOffset.x = 0;
    }
    return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
}
// Checks whether a value is numerical.
function isNumeric(a) {
    return typeof a === "number" && !isNaN(a) && isFinite(a);
}
// Sets a class and removes it after [duration] ms.
function addClassFor(element, className, duration) {
    if (duration > 0) {
        addClass(element, className);
        setTimeout(function () {
            removeClass(element, className);
        }, duration);
    }
}
// Limits a value to 0 - 100
function limit(a) {
    return Math.max(Math.min(a, 100), 0);
}
// Wraps a variable as an array, if it isn't one yet.
// Note that an input array is returned by reference!
function asArray(a) {
    return Array.isArray(a) ? a : [a];
}
// Counts decimals
function countDecimals(numStr) {
    numStr = String(numStr);
    var pieces = numStr.split(".");
    return pieces.length > 1 ? pieces[1].length : 0;
}
// http://youmightnotneedjquery.com/#add_class
function addClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
        el.classList.add(className);
    }
    else {
        el.className += " " + className;
    }
}
// http://youmightnotneedjquery.com/#remove_class
function removeClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
        el.classList.remove(className);
    }
    else {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
}
// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
}
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
function getPageOffset(doc) {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
    var x = supportPageOffset
        ? window.pageXOffset
        : isCSS1Compat
            ? doc.documentElement.scrollLeft
            : doc.body.scrollLeft;
    var y = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
            ? doc.documentElement.scrollTop
            : doc.body.scrollTop;
    return {
        x: x,
        y: y,
    };
}
// we provide a function to compute constants instead
// of accessing window.* as soon as the module needs it
// so that we do not compute anything if not needed
function getActions() {
    // Determine the events to bind. IE11 implements pointerEvents without
    // a prefix, which breaks compatibility with the IE10 implementation.
    return window.navigator.pointerEnabled
        ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup",
        }
        : window.navigator.msPointerEnabled
            ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp",
            }
            : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend",
            };
}
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
// Issue #785
function getSupportsPassive() {
    var supportsPassive = false;
    /* eslint-disable */
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        // @ts-ignore
        window.addEventListener("test", null, opts);
    }
    catch (e) { }
    /* eslint-enable */
    return supportsPassive;
}
function getSupportsTouchActionNone() {
    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
}
//endregion
//region Range Calculation
// Determine the size of a sub-range in relation to a full range.
function subRangeRatio(pa, pb) {
    return 100 / (pb - pa);
}
// (percentage) How many percent is this value of this range?
function fromPercentage(range, value, startRange) {
    return (value * 100) / (range[startRange + 1] - range[startRange]);
}
// (percentage) Where is this value on this range?
function toPercentage(range, value) {
    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
}
// (value) How much is this percentage on this range?
function isPercentage(range, value) {
    return (value * (range[1] - range[0])) / 100 + range[0];
}
function getJ(value, arr) {
    var j = 1;
    while (value >= arr[j]) {
        j += 1;
    }
    return j;
}
// (percentage) Input a value, find where, on a scale of 0-100, it applies.
function toStepping(xVal, xPct, value) {
    if (value >= xVal.slice(-1)[0]) {
        return 100;
    }
    var j = getJ(value, xVal);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
}
// (value) Input a percentage, find where it is on the specified range.
function fromStepping(xVal, xPct, value) {
    // There is no range group that fits 100
    if (value >= 100) {
        return xVal.slice(-1)[0];
    }
    var j = getJ(value, xPct);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
}
// (percentage) Get the step that applies at a certain value.
function getStep(xPct, xSteps, snap, value) {
    if (value === 100) {
        return value;
    }
    var j = getJ(value, xPct);
    var a = xPct[j - 1];
    var b = xPct[j];
    // If 'snap' is set, steps are used as fixed points on the slider.
    if (snap) {
        // Find the closest position, a or b.
        if (value - a > (b - a) / 2) {
            return b;
        }
        return a;
    }
    if (!xSteps[j - 1]) {
        return value;
    }
    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
}
//endregion
//region Spectrum
var Spectrum = /** @class */ (function () {
    function Spectrum(entry, snap, singleStep) {
        this.xPct = [];
        this.xVal = [];
        this.xSteps = [];
        this.xNumSteps = [];
        this.xHighestCompleteStep = [];
        this.xSteps = [singleStep || false];
        this.xNumSteps = [false];
        this.snap = snap;
        var index;
        var ordered = [];
        // Map the object keys to an array.
        Object.keys(entry).forEach(function (index) {
            ordered.push([asArray(entry[index]), index]);
        });
        // Sort all entries by value (numeric sort).
        ordered.sort(function (a, b) {
            return a[0][0] - b[0][0];
        });
        // Convert all entries to subranges.
        for (index = 0; index < ordered.length; index++) {
            this.handleEntryPoint(ordered[index][1], ordered[index][0]);
        }
        // Store the actual step values.
        // xSteps is sorted in the same order as xPct and xVal.
        this.xNumSteps = this.xSteps.slice(0);
        // Convert all numeric steps to the percentage of the subrange they represent.
        for (index = 0; index < this.xNumSteps.length; index++) {
            this.handleStepPoint(index, this.xNumSteps[index]);
        }
    }
    Spectrum.prototype.getDistance = function (value) {
        var distances = [];
        for (var index = 0; index < this.xNumSteps.length - 1; index++) {
            distances[index] = fromPercentage(this.xVal, value, index);
        }
        return distances;
    };
    // Calculate the percentual distance over the whole scale of ranges.
    // direction: 0 = backwards / 1 = forwards
    Spectrum.prototype.getAbsoluteDistance = function (value, distances, direction) {
        var xPct_index = 0;
        // Calculate range where to start calculation
        if (value < this.xPct[this.xPct.length - 1]) {
            while (value > this.xPct[xPct_index + 1]) {
                xPct_index++;
            }
        }
        else if (value === this.xPct[this.xPct.length - 1]) {
            xPct_index = this.xPct.length - 2;
        }
        // If looking backwards and the value is exactly at a range separator then look one range further
        if (!direction && value === this.xPct[xPct_index + 1]) {
            xPct_index++;
        }
        if (distances === null) {
            distances = [];
        }
        var start_factor;
        var rest_factor = 1;
        var rest_rel_distance = distances[xPct_index];
        var range_pct = 0;
        var rel_range_distance = 0;
        var abs_distance_counter = 0;
        var range_counter = 0;
        // Calculate what part of the start range the value is
        if (direction) {
            start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
        }
        else {
            start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
        }
        // Do until the complete distance across ranges is calculated
        while (rest_rel_distance > 0) {
            // Calculate the percentage of total range
            range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
            // Detect if the margin, padding or limit is larger then the current range and calculate
            if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                // If larger then take the percentual distance of the whole range
                rel_range_distance = range_pct * start_factor;
                // Rest factor of relative percentual distance still to be calculated
                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                // Set start factor to 1 as for next range it does not apply.
                start_factor = 1;
            }
            else {
                // If smaller or equal then take the percentual distance of the calculate percentual part of that range
                rel_range_distance = ((distances[xPct_index + range_counter] * range_pct) / 100) * rest_factor;
                // No rest left as the rest fits in current range
                rest_factor = 0;
            }
            if (direction) {
                abs_distance_counter = abs_distance_counter - rel_range_distance;
                // Limit range to first range when distance becomes outside of minimum range
                if (this.xPct.length + range_counter >= 1) {
                    range_counter--;
                }
            }
            else {
                abs_distance_counter = abs_distance_counter + rel_range_distance;
                // Limit range to last range when distance becomes outside of maximum range
                if (this.xPct.length - range_counter >= 1) {
                    range_counter++;
                }
            }
            // Rest of relative percentual distance still to be calculated
            rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
        }
        return value + abs_distance_counter;
    };
    Spectrum.prototype.toStepping = function (value) {
        value = toStepping(this.xVal, this.xPct, value);
        return value;
    };
    Spectrum.prototype.fromStepping = function (value) {
        return fromStepping(this.xVal, this.xPct, value);
    };
    Spectrum.prototype.getStep = function (value) {
        value = getStep(this.xPct, this.xSteps, this.snap, value);
        return value;
    };
    Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
        var j = getJ(value, this.xPct);
        // When at the top or stepping down, look at the previous sub-range
        if (value === 100 || (isDown && value === this.xPct[j - 1])) {
            j = Math.max(j - 1, 1);
        }
        return (this.xVal[j] - this.xVal[j - 1]) / size;
    };
    Spectrum.prototype.getNearbySteps = function (value) {
        var j = getJ(value, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[j - 2],
                step: this.xNumSteps[j - 2],
                highestStep: this.xHighestCompleteStep[j - 2],
            },
            thisStep: {
                startValue: this.xVal[j - 1],
                step: this.xNumSteps[j - 1],
                highestStep: this.xHighestCompleteStep[j - 1],
            },
            stepAfter: {
                startValue: this.xVal[j],
                step: this.xNumSteps[j],
                highestStep: this.xHighestCompleteStep[j],
            },
        };
    };
    Spectrum.prototype.countStepDecimals = function () {
        var stepDecimals = this.xNumSteps.map(countDecimals);
        return Math.max.apply(null, stepDecimals);
    };
    Spectrum.prototype.hasNoSize = function () {
        return this.xVal[0] === this.xVal[this.xVal.length - 1];
    };
    // Outside testing
    Spectrum.prototype.convert = function (value) {
        return this.getStep(this.toStepping(value));
    };
    Spectrum.prototype.handleEntryPoint = function (index, value) {
        var percentage;
        // Covert min/max syntax to 0 and 100.
        if (index === "min") {
            percentage = 0;
        }
        else if (index === "max") {
            percentage = 100;
        }
        else {
            percentage = parseFloat(index);
        }
        // Check for correct input.
        if (!isNumeric(percentage) || !isNumeric(value[0])) {
            throw new Error("noUiSlider: 'range' value isn't numeric.");
        }
        // Store values.
        this.xPct.push(percentage);
        this.xVal.push(value[0]);
        var value1 = Number(value[1]);
        // NaN will evaluate to false too, but to keep
        // logging clear, set step explicitly. Make sure
        // not to override the 'step' setting with false.
        if (!percentage) {
            if (!isNaN(value1)) {
                this.xSteps[0] = value1;
            }
        }
        else {
            this.xSteps.push(isNaN(value1) ? false : value1);
        }
        this.xHighestCompleteStep.push(0);
    };
    Spectrum.prototype.handleStepPoint = function (i, n) {
        // Ignore 'false' stepping.
        if (!n) {
            return;
        }
        // Step over zero-length ranges (#948);
        if (this.xVal[i] === this.xVal[i + 1]) {
            this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
            return;
        }
        // Factor to range ratio
        this.xSteps[i] =
            fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
        var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
        var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
        this.xHighestCompleteStep[i] = step;
    };
    return Spectrum;
}());
//endregion
//region Options
/*	Every input option is tested and parsed. This will prevent
    endless validation in internal methods. These tests are
    structured with an item for every option available. An
    option can be marked as required by setting the 'r' flag.
    The testing function is provided with three arguments:
        - The provided value for the option;
        - A reference to the options object;
        - The name for the option;

    The testing function returns false when an error is detected,
    or true when everything is OK. It can also modify the option
    object, to make sure all values can be correctly looped elsewhere. */
//region Defaults
var defaultFormatter = {
    to: function (value) {
        return value === undefined ? "" : value.toFixed(2);
    },
    from: Number,
};
var cssClasses = {
    target: "target",
    base: "base",
    origin: "origin",
    handle: "handle",
    handleLower: "handle-lower",
    handleUpper: "handle-upper",
    touchArea: "touch-area",
    horizontal: "horizontal",
    vertical: "vertical",
    background: "background",
    connect: "connect",
    connects: "connects",
    ltr: "ltr",
    rtl: "rtl",
    textDirectionLtr: "txt-dir-ltr",
    textDirectionRtl: "txt-dir-rtl",
    draggable: "draggable",
    drag: "state-drag",
    tap: "state-tap",
    active: "active",
    tooltip: "tooltip",
    pips: "pips",
    pipsHorizontal: "pips-horizontal",
    pipsVertical: "pips-vertical",
    marker: "marker",
    markerHorizontal: "marker-horizontal",
    markerVertical: "marker-vertical",
    markerNormal: "marker-normal",
    markerLarge: "marker-large",
    markerSub: "marker-sub",
    value: "value",
    valueHorizontal: "value-horizontal",
    valueVertical: "value-vertical",
    valueNormal: "value-normal",
    valueLarge: "value-large",
    valueSub: "value-sub",
};
// Namespaces of internal event listeners
var INTERNAL_EVENT_NS = {
    tooltips: ".__tooltips",
    aria: ".__aria",
};
//endregion
function testStep(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'step' is not numeric.");
    }
    // The step option can still be used to set stepping
    // for linear sliders. Overwritten if set in 'range'.
    parsed.singleStep = entry;
}
function testKeyboardPageMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    }
    parsed.keyboardPageMultiplier = entry;
}
function testKeyboardMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    }
    parsed.keyboardMultiplier = entry;
}
function testKeyboardDefaultStep(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    }
    parsed.keyboardDefaultStep = entry;
}
function testRange(parsed, entry) {
    // Filter incorrect input.
    if (typeof entry !== "object" || Array.isArray(entry)) {
        throw new Error("noUiSlider: 'range' is not an object.");
    }
    // Catch missing start or end.
    if (entry.min === undefined || entry.max === undefined) {
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    }
    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
}
function testStart(parsed, entry) {
    entry = asArray(entry);
    // Validate input. Values aren't tested, as the public .val method
    // will always provide a valid location.
    if (!Array.isArray(entry) || !entry.length) {
        throw new Error("noUiSlider: 'start' option is incorrect.");
    }
    // Store the number of handles.
    parsed.handles = entry.length;
    // When the slider is initialized, the .val method will
    // be called with the start options.
    parsed.start = entry;
}
function testSnap(parsed, entry) {
    if (typeof entry !== "boolean") {
        throw new Error("noUiSlider: 'snap' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.snap = entry;
}
function testAnimate(parsed, entry) {
    if (typeof entry !== "boolean") {
        throw new Error("noUiSlider: 'animate' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.animate = entry;
}
function testAnimationDuration(parsed, entry) {
    if (typeof entry !== "number") {
        throw new Error("noUiSlider: 'animationDuration' option must be a number.");
    }
    parsed.animationDuration = entry;
}
function testConnect(parsed, entry) {
    var connect = [false];
    var i;
    // Map legacy options
    if (entry === "lower") {
        entry = [true, false];
    }
    else if (entry === "upper") {
        entry = [false, true];
    }
    // Handle boolean options
    if (entry === true || entry === false) {
        for (i = 1; i < parsed.handles; i++) {
            connect.push(entry);
        }
        connect.push(false);
    }
    // Reject invalid input
    else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
        throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
    }
    else {
        connect = entry;
    }
    parsed.connect = connect;
}
function testOrientation(parsed, entry) {
    // Set orientation to an a numerical value for easy
    // array selection.
    switch (entry) {
        case "horizontal":
            parsed.ort = 0;
            break;
        case "vertical":
            parsed.ort = 1;
            break;
        default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
}
function testMargin(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'margin' option must be numeric.");
    }
    // Issue #582
    if (entry === 0) {
        return;
    }
    parsed.margin = parsed.spectrum.getDistance(entry);
}
function testLimit(parsed, entry) {
    if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'limit' option must be numeric.");
    }
    parsed.limit = parsed.spectrum.getDistance(entry);
    if (!parsed.limit || parsed.handles < 2) {
        throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
}
function testPadding(parsed, entry) {
    var index;
    if (!isNumeric(entry) && !Array.isArray(entry)) {
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    }
    if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    }
    if (entry === 0) {
        return;
    }
    if (!Array.isArray(entry)) {
        entry = [entry, entry];
    }
    // 'getDistance' returns false for invalid values.
    parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
        // last "range" can't contain step size as it is purely an endpoint.
        if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
            throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        }
    }
    var totalPadding = entry[0] + entry[1];
    var firstValue = parsed.spectrum.xVal[0];
    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
    if (totalPadding / (lastValue - firstValue) > 1) {
        throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
    }
}
function testDirection(parsed, entry) {
    // Set direction as a numerical value for easy parsing.
    // Invert connection for RTL sliders, so that the proper
    // handles get the connect/background classes.
    switch (entry) {
        case "ltr":
            parsed.dir = 0;
            break;
        case "rtl":
            parsed.dir = 1;
            break;
        default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
}
function testBehaviour(parsed, entry) {
    // Make sure the input is a string.
    if (typeof entry !== "string") {
        throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
    }
    // Check if the string contains any keywords.
    // None are required.
    var tap = entry.indexOf("tap") >= 0;
    var drag = entry.indexOf("drag") >= 0;
    var fixed = entry.indexOf("fixed") >= 0;
    var snap = entry.indexOf("snap") >= 0;
    var hover = entry.indexOf("hover") >= 0;
    var unconstrained = entry.indexOf("unconstrained") >= 0;
    var dragAll = entry.indexOf("drag-all") >= 0;
    var smoothSteps = entry.indexOf("smooth-steps") >= 0;
    if (fixed) {
        if (parsed.handles !== 2) {
            throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        }
        // Use margin to enforce fixed state
        testMargin(parsed, parsed.start[1] - parsed.start[0]);
    }
    if (unconstrained && (parsed.margin || parsed.limit)) {
        throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
    }
    parsed.events = {
        tap: tap || snap,
        drag: drag,
        dragAll: dragAll,
        smoothSteps: smoothSteps,
        fixed: fixed,
        snap: snap,
        hover: hover,
        unconstrained: unconstrained,
    };
}
function testTooltips(parsed, entry) {
    if (entry === false) {
        return;
    }
    if (entry === true || isValidPartialFormatter(entry)) {
        parsed.tooltips = [];
        for (var i = 0; i < parsed.handles; i++) {
            parsed.tooltips.push(entry);
        }
    }
    else {
        entry = asArray(entry);
        if (entry.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a formatter for all handles.");
        }
        entry.forEach(function (formatter) {
            if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
            }
        });
        parsed.tooltips = entry;
    }
}
function testHandleAttributes(parsed, entry) {
    if (entry.length !== parsed.handles) {
        throw new Error("noUiSlider: must pass a attributes for all handles.");
    }
    parsed.handleAttributes = entry;
}
function testAriaFormat(parsed, entry) {
    if (!isValidPartialFormatter(entry)) {
        throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    }
    parsed.ariaFormat = entry;
}
function testFormat(parsed, entry) {
    if (!isValidFormatter(entry)) {
        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    }
    parsed.format = entry;
}
function testKeyboardSupport(parsed, entry) {
    if (typeof entry !== "boolean") {
        throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
    }
    parsed.keyboardSupport = entry;
}
function testDocumentElement(parsed, entry) {
    // This is an advanced option. Passed values are used without validation.
    parsed.documentElement = entry;
}
function testCssPrefix(parsed, entry) {
    if (typeof entry !== "string" && entry !== false) {
        throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    }
    parsed.cssPrefix = entry;
}
function testCssClasses(parsed, entry) {
    if (typeof entry !== "object") {
        throw new Error("noUiSlider: 'cssClasses' must be an object.");
    }
    if (typeof parsed.cssPrefix === "string") {
        parsed.cssClasses = {};
        Object.keys(entry).forEach(function (key) {
            parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
        });
    }
    else {
        parsed.cssClasses = entry;
    }
}
// Test all developer settings and parse to assumption-safe values.
function testOptions(options) {
    // To prove a fix for #537, freeze options here.
    // If the object is modified, an error will be thrown.
    // Object.freeze(options);
    var parsed = {
        margin: null,
        limit: null,
        padding: null,
        animate: true,
        animationDuration: 300,
        ariaFormat: defaultFormatter,
        format: defaultFormatter,
    };
    // Tests are executed in the order they are presented here.
    var tests = {
        step: { r: false, t: testStep },
        keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
        keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
        keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
        start: { r: true, t: testStart },
        connect: { r: true, t: testConnect },
        direction: { r: true, t: testDirection },
        snap: { r: false, t: testSnap },
        animate: { r: false, t: testAnimate },
        animationDuration: { r: false, t: testAnimationDuration },
        range: { r: true, t: testRange },
        orientation: { r: false, t: testOrientation },
        margin: { r: false, t: testMargin },
        limit: { r: false, t: testLimit },
        padding: { r: false, t: testPadding },
        behaviour: { r: true, t: testBehaviour },
        ariaFormat: { r: false, t: testAriaFormat },
        format: { r: false, t: testFormat },
        tooltips: { r: false, t: testTooltips },
        keyboardSupport: { r: true, t: testKeyboardSupport },
        documentElement: { r: false, t: testDocumentElement },
        cssPrefix: { r: true, t: testCssPrefix },
        cssClasses: { r: true, t: testCssClasses },
        handleAttributes: { r: false, t: testHandleAttributes },
    };
    var defaults = {
        connect: false,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: true,
        cssPrefix: "noUi-",
        cssClasses: cssClasses,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10,
    };
    // AriaFormat defaults to regular format, if any.
    if (options.format && !options.ariaFormat) {
        options.ariaFormat = options.format;
    }
    // Run all options through a testing mechanism to ensure correct
    // input. It should be noted that options might get modified to
    // be handled properly. E.g. wrapping integers in arrays.
    Object.keys(tests).forEach(function (name) {
        // If the option isn't set, but it is required, throw an error.
        if (!isSet(options[name]) && defaults[name] === undefined) {
            if (tests[name].r) {
                throw new Error("noUiSlider: '" + name + "' is required.");
            }
            return;
        }
        tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
    });
    // Forward pips options
    parsed.pips = options.pips;
    // All recent browsers accept unprefixed transform.
    // We need -ms- for IE9 and -webkit- for older Android;
    // Assume use of -webkit- if unprefixed and -ms- are not supported.
    // https://caniuse.com/#feat=transforms2d
    var d = document.createElement("div");
    var msPrefix = d.style.msTransform !== undefined;
    var noPrefix = d.style.transform !== undefined;
    parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
    // Pips don't move, so we can place them using left/top.
    var styles = [
        ["left", "top"],
        ["right", "bottom"],
    ];
    parsed.style = styles[parsed.dir][parsed.ort];
    return parsed;
}
//endregion
function scope(target, options, originalOptions) {
    var actions = getActions();
    var supportsTouchActionNone = getSupportsTouchActionNone();
    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
    // All variables local to 'scope' are prefixed with 'scope_'
    // Slider DOM Nodes
    var scope_Target = target;
    var scope_Base;
    var scope_Handles;
    var scope_Connects;
    var scope_Pips;
    var scope_Tooltips;
    // Slider state values
    var scope_Spectrum = options.spectrum;
    var scope_Values = [];
    var scope_Locations = [];
    var scope_HandleNumbers = [];
    var scope_ActiveHandlesCount = 0;
    var scope_Events = {};
    // Document Nodes
    var scope_Document = target.ownerDocument;
    var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
    var scope_Body = scope_Document.body;
    // For horizontal sliders in standard ltr documents,
    // make .noUi-origin overflow to the left so the document doesn't scroll.
    var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
    // Creates a node, adds it to target, returns the new node.
    function addNodeTo(addTarget, className) {
        var div = scope_Document.createElement("div");
        if (className) {
            addClass(div, className);
        }
        addTarget.appendChild(div);
        return div;
    }
    // Append a origin to the base
    function addOrigin(base, handleNumber) {
        var origin = addNodeTo(base, options.cssClasses.origin);
        var handle = addNodeTo(origin, options.cssClasses.handle);
        addNodeTo(handle, options.cssClasses.touchArea);
        handle.setAttribute("data-handle", String(handleNumber));
        if (options.keyboardSupport) {
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
            // 0 = focusable and reachable
            handle.setAttribute("tabindex", "0");
            handle.addEventListener("keydown", function (event) {
                return eventKeydown(event, handleNumber);
            });
        }
        if (options.handleAttributes !== undefined) {
            var attributes_1 = options.handleAttributes[handleNumber];
            Object.keys(attributes_1).forEach(function (attribute) {
                handle.setAttribute(attribute, attributes_1[attribute]);
            });
        }
        handle.setAttribute("role", "slider");
        handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
        if (handleNumber === 0) {
            addClass(handle, options.cssClasses.handleLower);
        }
        else if (handleNumber === options.handles - 1) {
            addClass(handle, options.cssClasses.handleUpper);
        }
        origin.handle = handle;
        return origin;
    }
    // Insert nodes for connect elements
    function addConnect(base, add) {
        if (!add) {
            return false;
        }
        return addNodeTo(base, options.cssClasses.connect);
    }
    // Add handles to the slider base.
    function addElements(connectOptions, base) {
        var connectBase = addNodeTo(base, options.cssClasses.connects);
        scope_Handles = [];
        scope_Connects = [];
        scope_Connects.push(addConnect(connectBase, connectOptions[0]));
        // [::::O====O====O====]
        // connectOptions = [0, 1, 1, 1]
        for (var i = 0; i < options.handles; i++) {
            // Keep a list of all added handles.
            scope_Handles.push(addOrigin(base, i));
            scope_HandleNumbers[i] = i;
            scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
        }
    }
    // Initialize a single slider.
    function addSlider(addTarget) {
        // Apply classes and data to the target.
        addClass(addTarget, options.cssClasses.target);
        if (options.dir === 0) {
            addClass(addTarget, options.cssClasses.ltr);
        }
        else {
            addClass(addTarget, options.cssClasses.rtl);
        }
        if (options.ort === 0) {
            addClass(addTarget, options.cssClasses.horizontal);
        }
        else {
            addClass(addTarget, options.cssClasses.vertical);
        }
        var textDirection = getComputedStyle(addTarget).direction;
        if (textDirection === "rtl") {
            addClass(addTarget, options.cssClasses.textDirectionRtl);
        }
        else {
            addClass(addTarget, options.cssClasses.textDirectionLtr);
        }
        return addNodeTo(addTarget, options.cssClasses.base);
    }
    function addTooltip(handle, handleNumber) {
        if (!options.tooltips || !options.tooltips[handleNumber]) {
            return false;
        }
        return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
    }
    function isSliderDisabled() {
        return scope_Target.hasAttribute("disabled");
    }
    // Disable the slider dragging if any handle is disabled
    function isHandleDisabled(handleNumber) {
        var handleOrigin = scope_Handles[handleNumber];
        return handleOrigin.hasAttribute("disabled");
    }
    function disable(handleNumber) {
        if (handleNumber !== null && handleNumber !== undefined) {
            scope_Handles[handleNumber].setAttribute("disabled", "");
            scope_Handles[handleNumber].handle.removeAttribute("tabindex");
        }
        else {
            scope_Target.setAttribute("disabled", "");
            scope_Handles.forEach(function (handle) {
                handle.handle.removeAttribute("tabindex");
            });
        }
    }
    function enable(handleNumber) {
        if (handleNumber !== null && handleNumber !== undefined) {
            scope_Handles[handleNumber].removeAttribute("disabled");
            scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
        }
        else {
            scope_Target.removeAttribute("disabled");
            scope_Handles.forEach(function (handle) {
                handle.removeAttribute("disabled");
                handle.handle.setAttribute("tabindex", "0");
            });
        }
    }
    function removeTooltips() {
        if (scope_Tooltips) {
            removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
            scope_Tooltips.forEach(function (tooltip) {
                if (tooltip) {
                    removeElement(tooltip);
                }
            });
            scope_Tooltips = null;
        }
    }
    // The tooltips option is a shorthand for using the 'update' event.
    function tooltips() {
        removeTooltips();
        // Tooltips are added with options.tooltips in original order.
        scope_Tooltips = scope_Handles.map(addTooltip);
        bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function (values, handleNumber, unencoded) {
            if (!scope_Tooltips || !options.tooltips) {
                return;
            }
            if (scope_Tooltips[handleNumber] === false) {
                return;
            }
            var formattedValue = values[handleNumber];
            if (options.tooltips[handleNumber] !== true) {
                formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
            }
            scope_Tooltips[handleNumber].innerHTML = formattedValue;
        });
    }
    function aria() {
        removeEvent("update" + INTERNAL_EVENT_NS.aria);
        bindEvent("update" + INTERNAL_EVENT_NS.aria, function (values, handleNumber, unencoded, tap, positions) {
            // Update Aria Values for all handles, as a change in one changes min and max values for the next.
            scope_HandleNumbers.forEach(function (index) {
                var handle = scope_Handles[index];
                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                var now = positions[index];
                // Formatted value for display
                var text = String(options.ariaFormat.to(unencoded[index]));
                // Map to slider range values
                min = scope_Spectrum.fromStepping(min).toFixed(1);
                max = scope_Spectrum.fromStepping(max).toFixed(1);
                now = scope_Spectrum.fromStepping(now).toFixed(1);
                handle.children[0].setAttribute("aria-valuemin", min);
                handle.children[0].setAttribute("aria-valuemax", max);
                handle.children[0].setAttribute("aria-valuenow", now);
                handle.children[0].setAttribute("aria-valuetext", text);
            });
        });
    }
    function getGroup(pips) {
        // Use the range.
        if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) {
            return scope_Spectrum.xVal;
        }
        if (pips.mode === PipsMode.Count) {
            if (pips.values < 2) {
                throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
            }
            // Divide 0 - 100 in 'count' parts.
            var interval = pips.values - 1;
            var spread = 100 / interval;
            var values = [];
            // List these parts and have them handled as 'positions'.
            while (interval--) {
                values[interval] = interval * spread;
            }
            values.push(100);
            return mapToRange(values, pips.stepped);
        }
        if (pips.mode === PipsMode.Positions) {
            // Map all percentages to on-range values.
            return mapToRange(pips.values, pips.stepped);
        }
        if (pips.mode === PipsMode.Values) {
            // If the value must be stepped, it needs to be converted to a percentage first.
            if (pips.stepped) {
                return pips.values.map(function (value) {
                    // Convert to percentage, apply step, return to value.
                    return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                });
            }
            // Otherwise, we can simply use the values.
            return pips.values;
        }
        return []; // pips.mode = never
    }
    function mapToRange(values, stepped) {
        return values.map(function (value) {
            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
        });
    }
    function generateSpread(pips) {
        function safeIncrement(value, increment) {
            // Avoid floating point variance by dropping the smallest decimal places.
            return Number((value + increment).toFixed(7));
        }
        var group = getGroup(pips);
        var indexes = {};
        var firstInRange = scope_Spectrum.xVal[0];
        var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
        var ignoreFirst = false;
        var ignoreLast = false;
        var prevPct = 0;
        // Create a copy of the group, sort it and filter away all duplicates.
        group = unique(group.slice().sort(function (a, b) {
            return a - b;
        }));
        // Make sure the range starts with the first element.
        if (group[0] !== firstInRange) {
            group.unshift(firstInRange);
            ignoreFirst = true;
        }
        // Likewise for the last one.
        if (group[group.length - 1] !== lastInRange) {
            group.push(lastInRange);
            ignoreLast = true;
        }
        group.forEach(function (current, index) {
            // Get the current step and the lower + upper positions.
            var step;
            var i;
            var q;
            var low = current;
            var high = group[index + 1];
            var newPct;
            var pctDifference;
            var pctPos;
            var type;
            var steps;
            var realSteps;
            var stepSize;
            var isSteps = pips.mode === PipsMode.Steps;
            // When using 'steps' mode, use the provided steps.
            // Otherwise, we'll step on to the next subrange.
            if (isSteps) {
                step = scope_Spectrum.xNumSteps[index];
            }
            // Default to a 'full' step.
            if (!step) {
                step = high - low;
            }
            // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
            if (high === undefined) {
                high = low;
            }
            // Make sure step isn't 0, which would cause an infinite loop (#654)
            step = Math.max(step, 0.0000001);
            // Find all steps in the subrange.
            for (i = low; i <= high; i = safeIncrement(i, step)) {
                // Get the percentage value for the current step,
                // calculate the size for the subrange.
                newPct = scope_Spectrum.toStepping(i);
                pctDifference = newPct - prevPct;
                steps = pctDifference / (pips.density || 1);
                realSteps = Math.round(steps);
                // This ratio represents the amount of percentage-space a point indicates.
                // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                // Round the percentage offset to an even number, then divide by two
                // to spread the offset on both sides of the range.
                stepSize = pctDifference / realSteps;
                // Divide all points evenly, adding the correct number to this subrange.
                // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                for (q = 1; q <= realSteps; q += 1) {
                    // The ratio between the rounded value and the actual size might be ~1% off.
                    // Correct the percentage offset by the number of points
                    // per subrange. density = 1 will result in 100 points on the
                    // full range, 2 for 50, 4 for 25, etc.
                    pctPos = prevPct + q * stepSize;
                    indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                }
                // Determine the point type.
                type = group.indexOf(i) > -1 ? PipsType.LargeValue : isSteps ? PipsType.SmallValue : PipsType.NoValue;
                // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                if (!index && ignoreFirst && i !== high) {
                    type = 0;
                }
                if (!(i === high && ignoreLast)) {
                    // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                    indexes[newPct.toFixed(5)] = [i, type];
                }
                // Update the percentage count.
                prevPct = newPct;
            }
        });
        return indexes;
    }
    function addMarking(spread, filterFunc, formatter) {
        var _a, _b;
        var element = scope_Document.createElement("div");
        var valueSizeClasses = (_a = {},
            _a[PipsType.None] = "",
            _a[PipsType.NoValue] = options.cssClasses.valueNormal,
            _a[PipsType.LargeValue] = options.cssClasses.valueLarge,
            _a[PipsType.SmallValue] = options.cssClasses.valueSub,
            _a);
        var markerSizeClasses = (_b = {},
            _b[PipsType.None] = "",
            _b[PipsType.NoValue] = options.cssClasses.markerNormal,
            _b[PipsType.LargeValue] = options.cssClasses.markerLarge,
            _b[PipsType.SmallValue] = options.cssClasses.markerSub,
            _b);
        var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
        var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
        addClass(element, options.cssClasses.pips);
        addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
        function getClasses(type, source) {
            var a = source === options.cssClasses.value;
            var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
            var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
            return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
        }
        function addSpread(offset, value, type) {
            // Apply the filter function, if it is set.
            type = filterFunc ? filterFunc(value, type) : type;
            if (type === PipsType.None) {
                return;
            }
            // Add a marker for every point
            var node = addNodeTo(element, false);
            node.className = getClasses(type, options.cssClasses.marker);
            node.style[options.style] = offset + "%";
            // Values are only appended for points marked '1' or '2'.
            if (type > PipsType.NoValue) {
                node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.value);
                node.setAttribute("data-value", String(value));
                node.style[options.style] = offset + "%";
                node.innerHTML = String(formatter.to(value));
            }
        }
        // Append all points.
        Object.keys(spread).forEach(function (offset) {
            addSpread(offset, spread[offset][0], spread[offset][1]);
        });
        return element;
    }
    function removePips() {
        if (scope_Pips) {
            removeElement(scope_Pips);
            scope_Pips = null;
        }
    }
    function pips(pips) {
        // Fix #669
        removePips();
        var spread = generateSpread(pips);
        var filter = pips.filter;
        var format = pips.format || {
            to: function (value) {
                return String(Math.round(value));
            },
        };
        scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
        return scope_Pips;
    }
    // Shorthand for base dimensions.
    function baseSize() {
        var rect = scope_Base.getBoundingClientRect();
        var alt = ("offset" + ["Width", "Height"][options.ort]);
        return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
    }
    // Handler for attaching events trough a proxy.
    function attachEvent(events, element, callback, data) {
        // This function can be used to 'filter' events to the slider.
        // element is a node, not a nodeList
        var method = function (event) {
            var e = fixEvent(event, data.pageOffset, data.target || element);
            // fixEvent returns false if this event has a different target
            // when handling (multi-) touch events;
            if (!e) {
                return false;
            }
            // doNotReject is passed by all end events to make sure released touches
            // are not rejected, leaving the slider "stuck" to the cursor;
            if (isSliderDisabled() && !data.doNotReject) {
                return false;
            }
            // Stop if an active 'tap' transition is taking place.
            if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                return false;
            }
            // Ignore right or middle clicks on start #454
            if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                return false;
            }
            // Ignore right or middle clicks on start #454
            if (data.hover && e.buttons) {
                return false;
            }
            // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
            // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
            // touch-action: manipulation, but that allows panning, which breaks
            // sliders after zooming/on non-responsive pages.
            // See: https://bugs.webkit.org/show_bug.cgi?id=133112
            if (!supportsPassive) {
                e.preventDefault();
            }
            e.calcPoint = e.points[options.ort];
            // Call the event handler with the event [ and additional data ].
            callback(e, data);
            return;
        };
        var methods = [];
        // Bind a closure on the target for every event type.
        events.split(" ").forEach(function (eventName) {
            element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
            methods.push([eventName, method]);
        });
        return methods;
    }
    // Provide a clean event with standardized offset values.
    function fixEvent(e, pageOffset, eventTarget) {
        // Filter the event to register the type, which can be
        // touch, mouse or pointer. Offset changes need to be
        // made on an event specific basis.
        var touch = e.type.indexOf("touch") === 0;
        var mouse = e.type.indexOf("mouse") === 0;
        var pointer = e.type.indexOf("pointer") === 0;
        var x = 0;
        var y = 0;
        // IE10 implemented pointer events with a prefix;
        if (e.type.indexOf("MSPointer") === 0) {
            pointer = true;
        }
        // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
        // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
        // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
        if (e.type === "mousedown" && !e.buttons && !e.touches) {
            return false;
        }
        // The only thing one handle should be concerned about is the touches that originated on top of it.
        if (touch) {
            // Returns true if a touch originated on the target.
            var isTouchOnTarget = function (checkTouch) {
                var target = checkTouch.target;
                return (target === eventTarget ||
                    eventTarget.contains(target) ||
                    (e.composed && e.composedPath().shift() === eventTarget));
            };
            // In the case of touchstart events, we need to make sure there is still no more than one
            // touch on the target so we look amongst all touches.
            if (e.type === "touchstart") {
                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                // Do not support more than one touch per handle.
                if (targetTouches.length > 1) {
                    return false;
                }
                x = targetTouches[0].pageX;
                y = targetTouches[0].pageY;
            }
            else {
                // In the other cases, find on changedTouches is enough.
                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                // Cancel if the target touch has not moved.
                if (!targetTouch) {
                    return false;
                }
                x = targetTouch.pageX;
                y = targetTouch.pageY;
            }
        }
        pageOffset = pageOffset || getPageOffset(scope_Document);
        if (mouse || pointer) {
            x = e.clientX + pageOffset.x;
            y = e.clientY + pageOffset.y;
        }
        e.pageOffset = pageOffset;
        e.points = [x, y];
        e.cursor = mouse || pointer; // Fix #435
        return e;
    }
    // Translate a coordinate in the document to a percentage on the slider
    function calcPointToPercentage(calcPoint) {
        var location = calcPoint - offset(scope_Base, options.ort);
        var proposal = (location * 100) / baseSize();
        // Clamp proposal between 0% and 100%
        // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
        // are used (e.g. contained handles feature)
        proposal = limit(proposal);
        return options.dir ? 100 - proposal : proposal;
    }
    // Find handle closest to a certain percentage on the slider
    function getClosestHandle(clickedPosition) {
        var smallestDifference = 100;
        var handleNumber = false;
        scope_Handles.forEach(function (handle, index) {
            // Disabled handles are ignored
            if (isHandleDisabled(index)) {
                return;
            }
            var handlePosition = scope_Locations[index];
            var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
            // Initial state
            var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
            // Difference with this handle is smaller than the previously checked handle
            var isCloser = differenceWithThisHandle < smallestDifference;
            var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
            if (isCloser || isCloserAfter || clickAtEdge) {
                handleNumber = index;
                smallestDifference = differenceWithThisHandle;
            }
        });
        return handleNumber;
    }
    // Fire 'end' when a mouse or pen leaves the document.
    function documentLeave(event, data) {
        if (event.type === "mouseout" &&
            event.target.nodeName === "HTML" &&
            event.relatedTarget === null) {
            eventEnd(event, data);
        }
    }
    // Handle movement on document for handle and range drag.
    function eventMove(event, data) {
        // Fix #498
        // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
        // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
        // IE9 has .buttons and .which zero on mousemove.
        // Firefox breaks the spec MDN defines.
        if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
            return eventEnd(event, data);
        }
        // Check if we are moving up or down
        var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
        // Convert the movement into a percentage of the slider width/height
        var proposal = (movement * 100) / data.baseSize;
        moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
    }
    // Unbind move events on document, call callbacks.
    function eventEnd(event, data) {
        // The handle is no longer active, so remove the class.
        if (data.handle) {
            removeClass(data.handle, options.cssClasses.active);
            scope_ActiveHandlesCount -= 1;
        }
        // Unbind the move and end events, which are added on 'start'.
        data.listeners.forEach(function (c) {
            scope_DocumentElement.removeEventListener(c[0], c[1]);
        });
        if (scope_ActiveHandlesCount === 0) {
            // Remove dragging class.
            removeClass(scope_Target, options.cssClasses.drag);
            setZindex();
            // Remove cursor styles and text-selection events bound to the body.
            if (event.cursor) {
                scope_Body.style.cursor = "";
                scope_Body.removeEventListener("selectstart", preventDefault);
            }
        }
        if (options.events.smoothSteps) {
            data.handleNumbers.forEach(function (handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
            });
            data.handleNumbers.forEach(function (handleNumber) {
                fireEvent("update", handleNumber);
            });
        }
        data.handleNumbers.forEach(function (handleNumber) {
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            fireEvent("end", handleNumber);
        });
    }
    // Bind move events on document.
    function eventStart(event, data) {
        // Ignore event if any handle is disabled
        if (data.handleNumbers.some(isHandleDisabled)) {
            return;
        }
        var handle;
        if (data.handleNumbers.length === 1) {
            var handleOrigin = scope_Handles[data.handleNumbers[0]];
            handle = handleOrigin.children[0];
            scope_ActiveHandlesCount += 1;
            // Mark the handle as 'active' so it can be styled.
            addClass(handle, options.cssClasses.active);
        }
        // A drag should never propagate up to the 'tap' event.
        event.stopPropagation();
        // Record the event listeners.
        var listeners = [];
        // Attach the move and end events.
        var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
            // The event target has changed so we need to propagate the original one so that we keep
            // relying on it to extract target touches.
            target: event.target,
            handle: handle,
            connect: data.connect,
            listeners: listeners,
            startCalcPoint: event.calcPoint,
            baseSize: baseSize(),
            pageOffset: event.pageOffset,
            handleNumbers: data.handleNumbers,
            buttonsProperty: event.buttons,
            locations: scope_Locations.slice(),
        });
        var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
            target: event.target,
            handle: handle,
            listeners: listeners,
            doNotReject: true,
            handleNumbers: data.handleNumbers,
        });
        var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
            target: event.target,
            handle: handle,
            listeners: listeners,
            doNotReject: true,
            handleNumbers: data.handleNumbers,
        });
        // We want to make sure we pushed the listeners in the listener list rather than creating
        // a new one as it has already been passed to the event handlers.
        listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
        // Text selection isn't an issue on touch devices,
        // so adding cursor styles can be skipped.
        if (event.cursor) {
            // Prevent the 'I' cursor and extend the range-drag cursor.
            scope_Body.style.cursor = getComputedStyle(event.target).cursor;
            // Mark the target with a dragging state.
            if (scope_Handles.length > 1) {
                addClass(scope_Target, options.cssClasses.drag);
            }
            // Prevent text selection when dragging the handles.
            // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
            // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
            // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
            // The 'cursor' flag is false.
            // See: http://caniuse.com/#search=selectstart
            scope_Body.addEventListener("selectstart", preventDefault, false);
        }
        data.handleNumbers.forEach(function (handleNumber) {
            fireEvent("start", handleNumber);
        });
    }
    // Move closest handle to tapped location.
    function eventTap(event) {
        // The tap event shouldn't propagate up
        event.stopPropagation();
        var proposal = calcPointToPercentage(event.calcPoint);
        var handleNumber = getClosestHandle(proposal);
        // Tackle the case that all handles are 'disabled'.
        if (handleNumber === false) {
            return;
        }
        // Flag the slider as it is now in a transitional state.
        // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
        if (!options.events.snap) {
            addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
        }
        setHandle(handleNumber, proposal, true, true);
        setZindex();
        fireEvent("slide", handleNumber, true);
        fireEvent("update", handleNumber, true);
        if (!options.events.snap) {
            fireEvent("change", handleNumber, true);
            fireEvent("set", handleNumber, true);
        }
        else {
            eventStart(event, { handleNumbers: [handleNumber] });
        }
    }
    // Fires a 'hover' event for a hovered mouse/pen position.
    function eventHover(event) {
        var proposal = calcPointToPercentage(event.calcPoint);
        var to = scope_Spectrum.getStep(proposal);
        var value = scope_Spectrum.fromStepping(to);
        Object.keys(scope_Events).forEach(function (targetEvent) {
            if ("hover" === targetEvent.split(".")[0]) {
                scope_Events[targetEvent].forEach(function (callback) {
                    callback.call(scope_Self, value);
                });
            }
        });
    }
    // Handles keydown on focused handles
    // Don't move the document when pressing arrow keys on focused handles
    function eventKeydown(event, handleNumber) {
        if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
            return false;
        }
        var horizontalKeys = ["Left", "Right"];
        var verticalKeys = ["Down", "Up"];
        var largeStepKeys = ["PageDown", "PageUp"];
        var edgeKeys = ["Home", "End"];
        if (options.dir && !options.ort) {
            // On an right-to-left slider, the left and right keys act inverted
            horizontalKeys.reverse();
        }
        else if (options.ort && !options.dir) {
            // On a top-to-bottom slider, the up and down keys act inverted
            verticalKeys.reverse();
            largeStepKeys.reverse();
        }
        // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
        var key = event.key.replace("Arrow", "");
        var isLargeDown = key === largeStepKeys[0];
        var isLargeUp = key === largeStepKeys[1];
        var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
        var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
        var isMin = key === edgeKeys[0];
        var isMax = key === edgeKeys[1];
        if (!isDown && !isUp && !isMin && !isMax) {
            return true;
        }
        event.preventDefault();
        var to;
        if (isUp || isDown) {
            var direction = isDown ? 0 : 1;
            var steps = getNextStepsForHandle(handleNumber);
            var step = steps[direction];
            // At the edge of a slider, do nothing
            if (step === null) {
                return false;
            }
            // No step set, use the default of 10% of the sub-range
            if (step === false) {
                step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
            }
            if (isLargeUp || isLargeDown) {
                step *= options.keyboardPageMultiplier;
            }
            else {
                step *= options.keyboardMultiplier;
            }
            // Step over zero-length ranges (#948);
            step = Math.max(step, 0.0000001);
            // Decrement for down steps
            step = (isDown ? -1 : 1) * step;
            to = scope_Values[handleNumber] + step;
        }
        else if (isMax) {
            // End key
            to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
        }
        else {
            // Home key
            to = options.spectrum.xVal[0];
        }
        setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
        fireEvent("slide", handleNumber);
        fireEvent("update", handleNumber);
        fireEvent("change", handleNumber);
        fireEvent("set", handleNumber);
        return false;
    }
    // Attach events to several slider parts.
    function bindSliderEvents(behaviour) {
        // Attach the standard drag event to the handles.
        if (!behaviour.fixed) {
            scope_Handles.forEach(function (handle, index) {
                // These events are only bound to the visual handle
                // element, not the 'real' origin element.
                attachEvent(actions.start, handle.children[0], eventStart, {
                    handleNumbers: [index],
                });
            });
        }
        // Attach the tap event to the slider base.
        if (behaviour.tap) {
            attachEvent(actions.start, scope_Base, eventTap, {});
        }
        // Fire hover events
        if (behaviour.hover) {
            attachEvent(actions.move, scope_Base, eventHover, {
                hover: true,
            });
        }
        // Make the range draggable.
        if (behaviour.drag) {
            scope_Connects.forEach(function (connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                    return;
                }
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [connect];
                var handlesToDrag = [handleBefore, handleAfter];
                var handleNumbersToDrag = [index - 1, index];
                addClass(connect, options.cssClasses.draggable);
                // When the range is fixed, the entire range can
                // be dragged by the handles. The handle in the first
                // origin will propagate the start event upward,
                // but it needs to be bound manually on the other.
                if (behaviour.fixed) {
                    eventHolders.push(handleBefore.children[0]);
                    eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                    handlesToDrag = scope_Handles;
                    handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach(function (eventHolder) {
                    attachEvent(actions.start, eventHolder, eventStart, {
                        handles: handlesToDrag,
                        handleNumbers: handleNumbersToDrag,
                        connect: connect,
                    });
                });
            });
        }
    }
    // Attach an event to this slider, possibly including a namespace
    function bindEvent(namespacedEvent, callback) {
        scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
        scope_Events[namespacedEvent].push(callback);
        // If the event bound is 'update,' fire it immediately for all handles.
        if (namespacedEvent.split(".")[0] === "update") {
            scope_Handles.forEach(function (a, index) {
                fireEvent("update", index);
            });
        }
    }
    function isInternalNamespace(namespace) {
        return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
    }
    // Undo attachment of event
    function removeEvent(namespacedEvent) {
        var event = namespacedEvent && namespacedEvent.split(".")[0];
        var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
        Object.keys(scope_Events).forEach(function (bind) {
            var tEvent = bind.split(".")[0];
            var tNamespace = bind.substring(tEvent.length);
            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                // only delete protected internal event if intentional
                if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
                    delete scope_Events[bind];
                }
            }
        });
    }
    // External event handling
    function fireEvent(eventName, handleNumber, tap) {
        Object.keys(scope_Events).forEach(function (targetEvent) {
            var eventType = targetEvent.split(".")[0];
            if (eventName === eventType) {
                scope_Events[targetEvent].forEach(function (callback) {
                    callback.call(
                    // Use the slider public API as the scope ('this')
                    scope_Self, 
                    // Return values as array, so arg_1[arg_2] is always valid.
                    scope_Values.map(options.format.to), 
                    // Handle index, 0 or 1
                    handleNumber, 
                    // Un-formatted slider values
                    scope_Values.slice(), 
                    // Event is fired by tap, true or false
                    tap || false, 
                    // Left offset of the handle, in relation to the slider
                    scope_Locations.slice(), 
                    // add the slider public API to an accessible parameter when this is unavailable
                    scope_Self);
                });
            }
        });
    }
    // Split out the handle positioning logic so the Move event can use it, too
    function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
        var distance;
        // For sliders with multiple handles, limit movement to the other handle.
        // Apply the margin option by adding it to the handle positions.
        if (scope_Handles.length > 1 && !options.events.unconstrained) {
            if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                to = Math.max(to, distance);
            }
            if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                to = Math.min(to, distance);
            }
        }
        // The limit option has the opposite effect, limiting handles to a
        // maximum distance from another. Limit must be > 0, as otherwise
        // handles would be unmovable.
        if (scope_Handles.length > 1 && options.limit) {
            if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                to = Math.min(to, distance);
            }
            if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                to = Math.max(to, distance);
            }
        }
        // The padding option keeps the handles a certain distance from the
        // edges of the slider. Padding must be > 0.
        if (options.padding) {
            if (handleNumber === 0) {
                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                to = Math.max(to, distance);
            }
            if (handleNumber === scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                to = Math.min(to, distance);
            }
        }
        if (!smoothSteps) {
            to = scope_Spectrum.getStep(to);
        }
        // Limit percentage to the 0 - 100 range
        to = limit(to);
        // Return false if handle can't move
        if (to === reference[handleNumber] && !getValue) {
            return false;
        }
        return to;
    }
    // Uses slider orientation to create CSS rules. a = base value;
    function inRuleOrder(v, a) {
        var o = options.ort;
        return (o ? a : v) + ", " + (o ? v : a);
    }
    // Moves handle(s) by a percentage
    // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
        var proposals = locations.slice();
        // Store first handle now, so we still have it in case handleNumbers is reversed
        var firstHandle = handleNumbers[0];
        var smoothSteps = options.events.smoothSteps;
        var b = [!upward, upward];
        var f = [upward, !upward];
        // Copy handleNumbers so we don't change the dataset
        handleNumbers = handleNumbers.slice();
        // Check to see which handle is 'leading'.
        // If that one can't move the second can't either.
        if (upward) {
            handleNumbers.reverse();
        }
        // Step 1: get the maximum percentage that any of the handles can move
        if (handleNumbers.length > 1) {
            handleNumbers.forEach(function (handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                // Stop if one of the handles can't move.
                if (to === false) {
                    proposal = 0;
                }
                else {
                    proposal = to - proposals[handleNumber];
                    proposals[handleNumber] = to;
                }
            });
        }
        // If using one handle, check backward AND forward
        else {
            b = f = [true];
        }
        var state = false;
        // Step 2: Try to set the handles with the found percentage
        handleNumbers.forEach(function (handleNumber, o) {
            state =
                setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
        });
        // Step 3: If a handle moved, fire events
        if (state) {
            handleNumbers.forEach(function (handleNumber) {
                fireEvent("update", handleNumber);
                fireEvent("slide", handleNumber);
            });
            // If target is a connect, then fire drag event
            if (connect != undefined) {
                fireEvent("drag", firstHandle);
            }
        }
    }
    // Takes a base value and an offset. This offset is used for the connect bar size.
    // In the initial design for this feature, the origin element was 1% wide.
    // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
    // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
    function transformDirection(a, b) {
        return options.dir ? 100 - a - b : a;
    }
    // Updates scope_Locations and scope_Values, updates visual state
    function updateHandlePosition(handleNumber, to) {
        // Update locations.
        scope_Locations[handleNumber] = to;
        // Convert the value to the slider stepping/range.
        scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
        var translation = transformDirection(to, 0) - scope_DirOffset;
        var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
        scope_Handles[handleNumber].style[options.transformRule] = translateRule;
        updateConnect(handleNumber);
        updateConnect(handleNumber + 1);
    }
    // Handles before the slider middle are stacked later = higher,
    // Handles after the middle later is lower
    // [[7] [8] .......... | .......... [5] [4]
    function setZindex() {
        scope_HandleNumbers.forEach(function (handleNumber) {
            var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
            var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
            scope_Handles[handleNumber].style.zIndex = String(zIndex);
        });
    }
    // Test suggested values and apply margin, step.
    // if exactInput is true, don't run checkHandlePosition, then the handle can be placed in between steps (#436)
    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
        if (!exactInput) {
            to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
        }
        if (to === false) {
            return false;
        }
        updateHandlePosition(handleNumber, to);
        return true;
    }
    // Updates style attribute for connect nodes
    function updateConnect(index) {
        // Skip connects set to false
        if (!scope_Connects[index]) {
            return;
        }
        var l = 0;
        var h = 100;
        if (index !== 0) {
            l = scope_Locations[index - 1];
        }
        if (index !== scope_Connects.length - 1) {
            h = scope_Locations[index];
        }
        // We use two rules:
        // 'translate' to change the left/top offset;
        // 'scale' to change the width of the element;
        // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
        var connectWidth = h - l;
        var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
        var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
        scope_Connects[index].style[options.transformRule] =
            translateRule + " " + scaleRule;
    }
    // Parses value passed to .set method. Returns current value if not parse-able.
    function resolveToValue(to, handleNumber) {
        // Setting with null indicates an 'ignore'.
        // Inputting 'false' is invalid.
        if (to === null || to === false || to === undefined) {
            return scope_Locations[handleNumber];
        }
        // If a formatted number was passed, attempt to decode it.
        if (typeof to === "number") {
            to = String(to);
        }
        to = options.format.from(to);
        if (to !== false) {
            to = scope_Spectrum.toStepping(to);
        }
        // If parsing the number failed, use the current value.
        if (to === false || isNaN(to)) {
            return scope_Locations[handleNumber];
        }
        return to;
    }
    // Set the slider value.
    function valueSet(input, fireSetEvent, exactInput) {
        var values = asArray(input);
        var isInit = scope_Locations[0] === undefined;
        // Event fires by default
        fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
        // Animation is optional.
        // Make sure the initial values were set before using animated placement.
        if (options.animate && !isInit) {
            addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
        }
        // First pass, without lookAhead but with lookBackward. Values are set from left to right.
        scope_HandleNumbers.forEach(function (handleNumber) {
            setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
        });
        var i = scope_HandleNumbers.length === 1 ? 0 : 1;
        // Spread handles evenly across the slider if the range has no size (min=max)
        if (isInit && scope_Spectrum.hasNoSize()) {
            exactInput = true;
            scope_Locations[0] = 0;
            if (scope_HandleNumbers.length > 1) {
                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                scope_HandleNumbers.forEach(function (handleNumber) {
                    scope_Locations[handleNumber] = handleNumber * space_1;
                });
            }
        }
        // Secondary passes. Now that all base values are set, apply constraints.
        // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
        for (; i < scope_HandleNumbers.length; ++i) {
            scope_HandleNumbers.forEach(function (handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
            });
        }
        setZindex();
        scope_HandleNumbers.forEach(function (handleNumber) {
            fireEvent("update", handleNumber);
            // Fire the event only for handles that received a new value, as per #579
            if (values[handleNumber] !== null && fireSetEvent) {
                fireEvent("set", handleNumber);
            }
        });
    }
    // Reset slider to initial values
    function valueReset(fireSetEvent) {
        valueSet(options.start, fireSetEvent);
    }
    // Set value for a single handle
    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
        // Ensure numeric input
        handleNumber = Number(handleNumber);
        if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
            throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
        }
        // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
        // The exactInput argument can be used to ignore slider stepping (#436)
        setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
        fireEvent("update", handleNumber);
        if (fireSetEvent) {
            fireEvent("set", handleNumber);
        }
    }
    // Get the slider value.
    function valueGet(unencoded) {
        if (unencoded === void 0) { unencoded = false; }
        if (unencoded) {
            // return a copy of the raw values
            return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
        }
        var values = scope_Values.map(options.format.to);
        // If only one handle is used, return a single value.
        if (values.length === 1) {
            return values[0];
        }
        return values;
    }
    // Removes classes from the root and empties it.
    function destroy() {
        // remove protected internal listeners
        removeEvent(INTERNAL_EVENT_NS.aria);
        removeEvent(INTERNAL_EVENT_NS.tooltips);
        Object.keys(options.cssClasses).forEach(function (key) {
            removeClass(scope_Target, options.cssClasses[key]);
        });
        while (scope_Target.firstChild) {
            scope_Target.removeChild(scope_Target.firstChild);
        }
        delete scope_Target.noUiSlider;
    }
    function getNextStepsForHandle(handleNumber) {
        var location = scope_Locations[handleNumber];
        var nearbySteps = scope_Spectrum.getNearbySteps(location);
        var value = scope_Values[handleNumber];
        var increment = nearbySteps.thisStep.step;
        var decrement = null;
        // If snapped, directly use defined step value
        if (options.snap) {
            return [
                value - nearbySteps.stepBefore.startValue || null,
                nearbySteps.stepAfter.startValue - value || null,
            ];
        }
        // If the next value in this step moves into the next step,
        // the increment is the start of the next step - the current value
        if (increment !== false) {
            if (value + increment > nearbySteps.stepAfter.startValue) {
                increment = nearbySteps.stepAfter.startValue - value;
            }
        }
        // If the value is beyond the starting point
        if (value > nearbySteps.thisStep.startValue) {
            decrement = nearbySteps.thisStep.step;
        }
        else if (nearbySteps.stepBefore.step === false) {
            decrement = false;
        }
        // If a handle is at the start of a step, it always steps back into the previous step first
        else {
            decrement = value - nearbySteps.stepBefore.highestStep;
        }
        // Now, if at the slider edges, there is no in/decrement
        if (location === 100) {
            increment = null;
        }
        else if (location === 0) {
            decrement = null;
        }
        // As per #391, the comparison for the decrement step can have some rounding issues.
        var stepDecimals = scope_Spectrum.countStepDecimals();
        // Round per #391
        if (increment !== null && increment !== false) {
            increment = Number(increment.toFixed(stepDecimals));
        }
        if (decrement !== null && decrement !== false) {
            decrement = Number(decrement.toFixed(stepDecimals));
        }
        return [decrement, increment];
    }
    // Get the current step size for the slider.
    function getNextSteps() {
        return scope_HandleNumbers.map(getNextStepsForHandle);
    }
    // Updatable: margin, limit, padding, step, range, animate, snap
    function updateOptions(optionsToUpdate, fireSetEvent) {
        // Spectrum is created using the range, snap, direction and step options.
        // 'snap' and 'step' can be updated.
        // If 'snap' and 'step' are not passed, they should remain unchanged.
        var v = valueGet();
        var updateAble = [
            "margin",
            "limit",
            "padding",
            "range",
            "animate",
            "snap",
            "step",
            "format",
            "pips",
            "tooltips",
        ];
        // Only change options that we're actually passed to update.
        updateAble.forEach(function (name) {
            // Check for undefined. null removes the value.
            if (optionsToUpdate[name] !== undefined) {
                originalOptions[name] = optionsToUpdate[name];
            }
        });
        var newOptions = testOptions(originalOptions);
        // Load new options into the slider state
        updateAble.forEach(function (name) {
            if (optionsToUpdate[name] !== undefined) {
                options[name] = newOptions[name];
            }
        });
        scope_Spectrum = newOptions.spectrum;
        // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
        options.margin = newOptions.margin;
        options.limit = newOptions.limit;
        options.padding = newOptions.padding;
        // Update pips, removes existing.
        if (options.pips) {
            pips(options.pips);
        }
        else {
            removePips();
        }
        // Update tooltips, removes existing.
        if (options.tooltips) {
            tooltips();
        }
        else {
            removeTooltips();
        }
        // Invalidate the current positioning so valueSet forces an update.
        scope_Locations = [];
        valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
    }
    // Initialization steps
    function setupSlider() {
        // Create the base element, initialize HTML and set classes.
        // Add handles and connect elements.
        scope_Base = addSlider(scope_Target);
        addElements(options.connect, scope_Base);
        // Attach user events.
        bindSliderEvents(options.events);
        // Use the public value method to set the start values.
        valueSet(options.start);
        if (options.pips) {
            pips(options.pips);
        }
        if (options.tooltips) {
            tooltips();
        }
        aria();
    }
    setupSlider();
    var scope_Self = {
        destroy: destroy,
        steps: getNextSteps,
        on: bindEvent,
        off: removeEvent,
        get: valueGet,
        set: valueSet,
        setHandle: valueSetHandle,
        reset: valueReset,
        disable: disable,
        enable: enable,
        // Exposed for unit testing, don't use this in your application.
        __moveHandles: function (upward, proposal, handleNumbers) {
            moveHandles(upward, proposal, scope_Locations, handleNumbers);
        },
        options: originalOptions,
        updateOptions: updateOptions,
        target: scope_Target,
        removePips: removePips,
        removeTooltips: removeTooltips,
        getPositions: function () {
            return scope_Locations.slice();
        },
        getTooltips: function () {
            return scope_Tooltips;
        },
        getOrigins: function () {
            return scope_Handles;
        },
        pips: pips, // Issue #594
    };
    return scope_Self;
}
// Run the standard initializer
function initialize(target, originalOptions) {
    if (!target || !target.nodeName) {
        throw new Error("noUiSlider: create requires a single element, got: " + target);
    }
    // Throw an error if the slider was already initialized.
    if (target.noUiSlider) {
        throw new Error("noUiSlider: Slider was already initialized.");
    }
    // Test the options and create the slider environment;
    var options = testOptions(originalOptions);
    var api = scope(target, options, originalOptions);
    target.noUiSlider = api;
    return api;
}


/* harmony default export */ const nouislider = ({
    // Exposed for unit testing, don't use this in your application.
    __spectrum: Spectrum,
    // A reference to the default classes, allows global changes.
    // Use the cssClasses option for changes to one slider.
    cssClasses: cssClasses,
    create: initialize,
});

// EXTERNAL MODULE: ./node_modules/wnumb/wNumb.js
var wNumb = __webpack_require__(18);
;// CONCATENATED MODULE: ./src/js/modules/nouislider.js



function rangeSlidersInit() {
	const rangeSliders = document.querySelectorAll('[data-range="rangeslider"]');
	if (!rangeSliders) return;
	rangeSliders.forEach((el) => {
		if (el.noUiSlider) {
			// already initialized
			return;
		}

		if (el) {
			let min = parseInt(el.dataset.min),
				max = parseInt(el.dataset.max),
				from = parseInt(el.dataset.from),
				to = parseInt(el.dataset.to),
				step = parseInt(el.dataset.step);

			nouislider.create(el, {
				start: [from ? from : min, to ? to : max],
				range: { min: min, max: max },
				step: step ? step : 500,
				connect: true,
				behaviour: "none",
				format: wNumb({
					decimals: 0,
					thousand: " ",
				}),
			});

			let inputs = [el.parentNode.querySelector(".input-min"), el.parentNode.querySelector(".input-max")];

			el.noUiSlider.on("update", (values, handle) => {
				inputs[handle].value = values[handle];
			});

			// fire change event for form after value set
			el.noUiSlider.on("end", (values, handle) => {
				const evt = new Event("input", { bubbles: true }),
					input = inputs[handle];
				input.dispatchEvent(evt);
				// const evt = new Event("change"),
				// 	form = el.closest("form");
				// form.dispatchEvent(evt);
			});
		}
	});

	// reset on filter clear
	const resetBtn = document.querySelector(".js-filter-reset");
	if (!resetBtn) return;

	resetBtn.addEventListener("click", () => {
		const form = resetBtn.closest("form"),
			rangeSliders = form.querySelectorAll('[data-range="rangeslider"]');
		rangeSliders.forEach((el) => {
			if (el) {
				el.noUiSlider.set([0,999999999]);
				// el.noUiSlider.reset();
			}
		});
	});
}

;// CONCATENATED MODULE: ./src/js/modules/product.js




/** products at catalog list */
function productGalleriesInit(item = false) {
	const isActiveClass = "is-active";

	if (item) {
		item.querySelector(".item__gallery-item").classList.add(isActiveClass);
		return;
	}

	// onload
	const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel");

	galleryItems.forEach((el) => {
		if (!el) return;

		let items = el.querySelectorAll(".item");
		// if (!items) return;
		items.forEach((i) => {
			i.querySelector(".item__gallery-item").classList.add(isActiveClass);
		});
	});
}

function productGallery() {
	const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel"),
		isActiveClass = "is-active";

	galleryItems.forEach((el) => {
		if (!el) return;
		el.addEventListener("mouseover", (e) => {
			const item = e.target.closest(".item");
			if (!item) return;

			const gallery = item.querySelector(".item__gallery-wrapper"),
				gItems = gallery.querySelectorAll(".item__gallery-item");

			gallery.addEventListener("mouseenter", () => {
				gItems.forEach((i) => {
					i.addEventListener("mouseenter", () => {
						i.parentElement.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
						i.classList.add(isActiveClass);
					});
				});
			});

			gallery.addEventListener("mouseleave", () => {
				gallery.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
				gallery.querySelector(".item__gallery-item").classList.add(isActiveClass);
			});
		});
	});
}

function productFavourite() {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-fav"),
			isActiveClass = "is-active";
		if (!btn) return;

		const id = btn.dataset.id,
			url = btn.dataset.url,
			data = { id: id };

		(async () => {
			try {
				let response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					return;
				}
				let result = await response.json();

				if (result.status === true) {
					btn.parentElement.classList.toggle(isActiveClass);
				}
			} catch (e) {
				console.log(e);
				return;
			}
		})();
	});
}

function productPropsHover() {
	const catalogItems = document.querySelector(".catalog-items");
	if (!catalogItems) return;

	catalogItems.addEventListener("mouseover", (e) => {
		const item = e.target.closest(".item");
		if (!item) return;

		item.addEventListener("mouseenter", () => {
			const url = item.dataset.url,
				details = item.querySelector(".item__details"),
				skeleton = item.querySelector(".skeleton");

			if (details.innerHTML.trim().length > 0 && !skeleton) return;

			showSkeleton(details, "tpl-props");

			(async () => {
				try {
					let response = await fetch(url);
					if (!response.ok) {
						return;
					}
					let result = await response.text();
					details.innerHTML = "";
					details.innerHTML = result;
					productPropCollapseHandler(item);
				} catch (e) {
					console.log(e);
					return;
				}
			})();
		});
	});
}

function productProps() {
	document.addEventListener("change", (e) => {
		if (!e.target.closest(".prop")) {
			return;
		}

		const prop = e.target,
			item = prop.closest(".item"),
			details = prop.closest(".item__details"),
			card = prop.closest(".product__options"),
			form = prop.closest("form");

		if (!form) return;

		let formData = new FormData(form),
			data = {},
			params = {},
			url = prop.dataset.url;

		let formDataObject = Object.fromEntries(formData.entries());

		data = { name: prop.name, checked: true };

		if (prop.dataset.params) {
			params = JSON.parse(prop.dataset.params);
		}

		Object.assign(data, params, formDataObject);

		// data-id item-id-????-props not found (php):
		// Object.assign(data, { element: { name: prop.name, checked: true, params: params} }, formDataObject);

		// product list
		if (item) {
			(async () => {
				try {
					useLoader([item, details], "start");

					let response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
						body: JSON.stringify(data),
					});
					if (!response.ok) {
						return;
					}
					let result = await response.json();

					if (result.status === true) {
						update(result, item);
					}

					productGalleriesInit(item);
					productPropCollapseHandler(item);

					useLoader([item, details], "stop");
				} catch (e) {
					console.log(e);
					return;
				}
			})();
		}

		// product card
		if (card) {
			(async () => {
				try {
					useLoader([card], "start");
					let response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
						body: JSON.stringify(data),
					});
					if (!response.ok) {
						return;
					}
					let result = await response.json();
					if (result.status === true) {
						update(result, card);
					}

					if (result.url) {
						setWindowLocation(result.url);
					}
					// productGalleriesInit(card);
					// productPropCollapseHandler(card);
					useLoader([card], "stop");
				} catch (e) {
					console.log(e);
					return;
				}
			})();
		}

		let update = (result, where) => {
			Object.entries(result.chunks).forEach(([key, value]) => {
				if (value.length > 0) {
					let target = where.querySelector(`[data-id=${key}]`);
					if (!target) {
						console.log(`data-id ${key} not found`);
						return;
					}
					target.innerHTML = value;
				}
			});
		};
	});
}

function productFetches() {
	const filter = document.querySelector(".filter"),
		filterForm = document.getElementById("filter-form"),
		filterReset = document.querySelector(".js-filter-reset"),
		sortBtns = document.querySelectorAll("input[name='sort']"),
		itemsContainer = document.querySelector(".content_columns"),
		productPage = document.querySelector(".product");

	if (!filter && !productPage) return;

	let fetchByFilter = async () => {
		let filterMobile = document.querySelector(".filter.is-active"),
			formData = new FormData(filterForm),
			url = filterForm.action;

		let formDataObject = Object.fromEntries(formData.entries());

		// loader start +++ filter @mobile
		useLoader([itemsContainer, filterMobile], "start");

		// step 1: get filter url based on filter selected
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(formDataObject),
		});

		// break if new url not recieved
		let result = await response.json();

		try {
			if (result.url) filterForm.action = result.url;
			else throw new Error("url is empty");
		} catch (e) {
			console.log(e);
			useLoader(itemsContainer, "stop");
			return;
		}

		setWindowLocation(result.url);

		// step 2: get page chunks
		response = await fetch(result.url);
		result = await response.json();

		// step 3: update page chunks
		try {
			if (result.status === true && result.chunks) updateChunks(result.chunks);
			else throw new Error("chunks response is incorrect");
		} catch (e) {
			console.log(e);
			useLoader(itemsContainer, "stop");
			return;
		}

		reinitFetchesResults();

		// loader finish
		useLoader(itemsContainer, "stop");
	};

	let fetchByUrl = async (obj) => {
		if (!obj) return;

		let amp = filterForm.action.includes("?") ? "&" : "?",
			query = amp + new URLSearchParams(obj).toString(),
			url = filterForm.action + query;

		// loader start +++ filter @mobile
		useLoader(itemsContainer, "start");

		// step 1: fetch get
		let response = await fetch(url);
		let result = await response.json();

		// step 2: update page chunks
		if (result.status === true) {
			// update action if new url recieved
			if (result.url) {
				filterForm.action = result.url;
				setWindowLocation(result.url);
			}

			if (result.chunks) {
				updateChunks(result.chunks);
			}
		}

		reinitFetchesResults();

		// loader finish
		useLoader(itemsContainer, "stop");
	};

	let fetchByMoreBtn = async (btn) => {
		if (!btn) return;
		const url = btn.dataset.url,
			target = document.querySelector(`.${btn.dataset.target}`);
		if (!target || !url) return;

		btnLoader(btn);

		// step 1: fetch get
		let response = await fetch(url);
		let result = await response.json();

		// step 2: update page chunks
		if (result.status === true) {
			// update action if new url recieved
			if (result.url) {
				filterForm.action = result.url;
				setWindowLocation(result.url);
			}

			if (result.products) {
				// target.innerHTML += result; -- bad solution (target div flickering)
				let div = document.createElement("div");
				div.innerHTML = result.products;

				div.childNodes.forEach((i) => {
					target.appendChild(i);
				});
			}

			if (result.chunks) {
				updateChunks(result.chunks);
			}
		}

		reinitFetchesResults();

		btnLoader(btn, "stop");
	};

	let updateChunks = (obj) => {
		if (!obj) return;

		Object.entries(obj).forEach(([key, value]) => {
			let target = document.querySelector(`[data-id=${key}]`);
			if (!target) {
				console.log(`data-id ${key} not found`);
				return;
			}
			target.innerHTML = value;
		});
	};

	let reinitFetchesResults = () => {
		carouselsInit();
		productGalleriesInit();
		productGallery();
		rangeSlidersInit();
	};

	let addToCart = (btn) => {
		const form = btn.closest("form") || btn.closest(".item__props").querySelector("form"),
			inCartClass = "in-cart";

		let formData = new FormData(form),
			data = {},
			params = {},
			url = btn.dataset.url,
			id = btn.dataset.id;

		let formDataObject = Object.fromEntries(formData.entries());

		data = { id: id };

		if (btn.dataset.params) {
			params = JSON.parse(btn.dataset.params);
		}

		Object.assign(data, params, formDataObject);

		(async () => {
			try {
				btnLoader(btn);

				let response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					return;
				}
				let result = await response.json();

				if (result.status === true) {
					btn.classList.add(inCartClass);

					let target = document.querySelector(`[data-id="amount"]`);
					if (!target) {
						console.log(`data-id amount not found`);
						return;
					}
					target.dataset.amount = result.amount;
				}

				btnLoader(btn, "stop");
			} catch (e) {
				console.log(e);
				return;
			}
		})();
	};

	if (filter) {
		// filter on change
		filterForm.addEventListener("input", () => {
			filterReset.classList.remove("invisible");
			fetchByFilter();
			filterTagsSet();
		});

		// filter on reset
		filterReset.addEventListener("click", () => {
			const resetFlag = document.getElementById("filter-reset"),
				checked = document.querySelectorAll(`input[type='checkbox']:checked`);
			if (checked.length > 0) {
				checked.forEach((el) => (el.checked = false));
			}
			filterTagsSet();
			resetFlag.value = "Y";
			fetchByFilter();
			resetFlag.value = "N";
			filterReset.classList.add("invisible");
		});

		// filter on submit
		filterForm.addEventListener("submit", (e) => {
			e.preventDefault();
			fetchByFilter();
			filterTagsSet();
		});

		// dropdown sorter
		sortBtns.forEach((btn) => {
			btn.addEventListener("change", () => {
				const sortFlag = document.getElementById("filter-sort"),
					sortBlock = btn.closest(".js-drop-down.is-active"),
					sortLabel = sortBlock.querySelector(".drop-down__head"),
					object = {};
				sortFlag.value = btn.value;
				sortLabel.textContent = btn.nextElementSibling.textContent;
				sortBlock.classList.remove("is-active");
				object[btn.name] = parseInt(btn.value);
				fetchByUrl(object);
			});
		});

		// btn "load more"
		document.addEventListener("click", (e) => {
			const btn = e.target.closest(".js-load-more");
			if (!btn) return;
			fetchByMoreBtn(btn);
		});
	}

	// btn "add to cart"
	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-add-to-cart")) {
			let btn = e.target.closest(".js-add-to-cart"),
				inCartClass = "in-cart";
			if (!btn) return;

			if (btn.classList.contains(inCartClass)) {
				if (btn.dataset.cart) {
					window.location.assign(btn.dataset.cart);
					return;
				}
			}

			addToCart(btn);
		}
	});

	// amount to cart
	document.addEventListener("change", (e) => {
		if (e.target.name == "amount") {
			let btn = e.target.closest(".product__purchase").querySelector(".js-add-to-cart");
			if (!btn) return;
			addToCart(btn);
		}
	});
}

function filterTagsSet() {
	const filterForm = document.getElementById("filter-form"),
		fGroups = document.querySelectorAll(".filter-group"),
		tagsContainer = document.querySelector(".catalog-bar__tags"),
		tagsObj = {};

	if (!filterForm) return;

	fGroups.forEach((gr) => {
		const header = gr.querySelector(".filter-group__header").textContent,
			checkboxes = gr.querySelectorAll("input[type='checkbox']:checked"),
			rangesliders = gr.querySelectorAll(".rangeslider"),
			rangeArr = [],
			checkedArr = [];

		if (checkboxes.length + rangesliders.length == 0) return;

		rangesliders.forEach((el) => {
			const slider = el.querySelector("[data-range='rangeslider']"),
				elGroup = el.closest(".filter-group").dataset.propId,
				iMin = el.querySelector(".input-min"),
				iMax = el.querySelector(".input-max"),
				rangeMin = parseInt(slider.dataset.min),
				rangeMax = parseInt(slider.dataset.max),
				valueMin = iMin.value,
				valueMax = iMax.value,
				labelMin = iMin.previousElementSibling.textContent,
				labelMax = iMax.previousElementSibling.textContent;

			if (rangeMin == parseInt(valueMin.replace(/[^0-9]+/g, "")) && rangeMax == parseInt(valueMax.replace(/[^0-9]+/g, ""))) return;

			rangeArr.push({ title: `${labelMin} ${valueMin} ${labelMax} ${valueMax}`, group: elGroup, name: "" });
			if (rangeArr.length > 0) Object.assign(tagsObj, { [header]: rangeArr });
		});

		checkboxes.forEach((el) => {
			const elGroup = el.closest(".filter-group").dataset.propId,
				elName = el.name,
				elTitle = el.parentNode.title;
			checkedArr.push({ title: elTitle, group: elGroup, name: elName });
		});

		if (checkedArr.length > 0) Object.assign(tagsObj, { [header]: checkedArr });
	});

	tagsContainer.innerHTML = createTagsList(tagsObj);
}

function filterTagsRemove() {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-remove-tag");
		if (!btn) return;

		if (btn.dataset.name) {
			document.querySelector(`[name=${btn.dataset.name}]`).click();
		}

		if (btn.dataset.group) {
			const filterForm = document.getElementById("filter-form"),
				group = document.querySelector(`[data-prop-id=${btn.dataset.group}]`),
				checked = group.querySelectorAll(`input[type='checkbox']:checked`),
				rangeSlider = group.querySelector('[data-range="rangeslider"]');

			if (checked.length > 0) {
				checked.forEach((el) => (el.checked = false));
			}

			if (rangeSlider) {
				rangeSlider.noUiSlider.set([0, 999999999]);
			}

			filterTagsSet();
			filterForm.dispatchEvent(new Event("submit"));
			// filterForm.requestSubmit(); 90.46% supported
		}
	});
}

function productAmount() {
	const product = document.querySelector(".product");
	if (!product) return;

	product.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-btn-minus")) {
			let inputNumber = e.target.nextElementSibling;
			if (inputNumber.getAttribute("min") == inputNumber.value) return;
			inputNumber.stepDown();
			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}

		if (e.target.classList.contains("js-btn-plus")) {
			let inputNumber = e.target.previousElementSibling;
			if (inputNumber.getAttribute("max") == inputNumber.value) return;
			inputNumber.stepUp();
			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}
	});
}

function productBlockCollapseHandler(el) {
	if (!el) {
		let blocks = document.querySelectorAll(".block-collapsible");
		blocks.forEach((block) => productBlockCollapseHandler(block));
		return;
	}

	let check = el.querySelector(".block-collapse");
	if (check) return;

	let elRealHeight = el.scrollHeight,
		elHeight = el.getBoundingClientRect().height,
		isClosedClass = "is-closed",
		isOpenedClass = "is-opened";

	if (elRealHeight > elHeight) {
		let div = document.createElement("div"),
			btn = document.createElement("button");
		btn.innerHTML = "<span>Показать всё</span><span>Свернуть</span>";
		btn.classList.add("block-collapse__btn", "js-block-collpase", "is-closed");
		div.classList.add("block-collapse");
		div.appendChild(btn);
		el.appendChild(div);

		let collapseBlock = el.querySelector(".block-collapse"),
			collapseBlockHeight = collapseBlock.getBoundingClientRect().height,
			collapseBtn = collapseBlock.querySelector(".js-block-collpase");

		if (!collapseBtn) return;

		collapseBtn.addEventListener("click", () => {
			collapseBtn.classList.toggle(isClosedClass);
			if (el.style.maxHeight) {
				el.style.maxHeight = null;
				el.classList.remove(isOpenedClass);
			} else {
				el.style.maxHeight = elRealHeight + collapseBlockHeight + "px";
				el.classList.add(isOpenedClass);
			}
		});
	}
}

function productGalleryShow() {
	const isActiveClass = "is-active";

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-product-gallery");
		if (!el) return;

		const show = el.dataset.show;
		if (show) {
			const body = document.body,
				header = document.querySelector(".header"),
				target = document.querySelector(`.${show}`),
				offsetTop = target.closest(".container").offsetTop,
				containers = document.querySelectorAll(".container"),
				sw = getScrollbarWidth();

			body.classList.add("noscroll");
			header.classList.remove("is-hidden");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});

			target.classList.add(isActiveClass);
			target.style.top = `${offsetTop}px`;
		}
	});

	window.addEventListener("resize", () => {
		const galleryBtn = document.querySelector(`.js-product-gallery`);
		if (!galleryBtn) return;
		const show = galleryBtn.dataset.show,
			target = document.querySelector(`.${show}`),
			containers = document.querySelectorAll(".container");
		if (target) {
			target.classList.remove(isActiveClass);
			document.body.classList.remove("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = "";
			});
		}
	});
}

// product helpers
function isPropOverflowX(el) {
	return el ? el.scrollWidth > el.clientWidth : false;
}

function productPropCollapseHandler(el) {
	if (!el) return;
	const propsBtns = el.querySelectorAll(".js-prop-collapse"),
		isOpenedClass = "is-opened";

	propsBtns.forEach((btn) => {
		let parent = btn.parentElement,
			flag = parent.querySelector(`input[type="hidden"]`);

		if (!parent.classList.contains(isOpenedClass) && !isPropOverflowX(parent)) {
			btn.classList.add("hidden");
		} else {
			btn.addEventListener("click", () => {
				parent.classList.toggle(isOpenedClass);
				flag.value = flag.value == 1 ? 0 : 1;
			});
		}
	});
}

function createTagsList(obj) {
	let tagItems = "";

	Object.entries(obj).forEach(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			let count = Object.keys(value).length;
			if (count == 1) {
				tagItems += `<div class="tag"><div class="tag__head"><div class="tag__val">${key}: ${value[0].title}</div><div class="tag__remove js-remove-tag" data-group="${value[0].group}"></div></div></div>`;
			} else {
				tagItems += `<div class="tag"><div class="tag__head"><div class="tag__val">${key}: ${count} знач.</div><div class="tag__remove js-remove-tag" data-group="${value[0].group}"></div></div>`;
				tagItems += `<div class="tag__list">`;
				Object.values(value).forEach((v) => {
					tagItems += `<div class="tag__item"><div class="tag__val">${v.title}</div><div class="tag__remove js-remove-tag" data-name="${v.name}"></div></div>`;
				});
				tagItems += `</div></div>`;
			}
		}
	});

	return tagItems;
}

function setWindowLocation(url) {
	// TODO @ prod:
	// window.history.pushState("", "", url);
	window.history.pushState("", "", url.replace("https://deviart.ru/zamm/", ""));
}

;// CONCATENATED MODULE: ./src/js/modules/functions.js



function stickyHeader() {
	const header = document.querySelector("header"),
		isOntopClass = "is-ontop",
		isStickyClass = "is-sticky",
		isHiddenClass = "is-hidden";

	if (!header) return;

	let lastScrollTop = 0;

	const handleScroll = () => {
		if (window.scrollY == 0) {
			header.classList.add(isOntopClass);
		}
		if (window.scrollY > 56) {
			if (window.scrollY > lastScrollTop || 0) {
				header.classList.remove(isOntopClass);
				header.classList.add(isHiddenClass);
			} else if (window.scrollY < lastScrollTop) {
				header.classList.add(isStickyClass);
				header.classList.remove(isHiddenClass);
			}
		}
		lastScrollTop = window.scrollY;
	};

	window.addEventListener("scroll", handleScroll);
}

function sectionShow() {
	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-show"),
			isActiveClass = "is-active";
		if (!el) return;
		const target = el.dataset.show;
		if (target) {
			overlay(1, target);
			document.querySelector(`.${target}`).classList.add(isActiveClass);
		}
	});
}

function sectionClose() {
	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-close"),
			isActiveClass = "is-active";
		if (!el) return;
		const target = el.closest(`.${isActiveClass}`);
		if (target) {
			overlay(0);
			target.classList.remove(isActiveClass);
		}
	});
}

function overlayClick() {
	document.addEventListener("click", (e) => {
		const o = e.target,
			isActiveClass = "is-active";
		if (o.classList.contains("overlay")) {
			const origin = o.dataset.origin;
			document.querySelector(`.${origin}`).classList.remove(isActiveClass);
			overlay(0);
		}
	});
}

function overlay(action, origin = false) {
	const body = document.body,
		sw = functions_getScrollbarWidth(),
		containers = document.querySelectorAll(".container"),
		isActiveClass = "is-active";
	if (action) {
		const o = document.createElement("div"),
			scrollY = window.scrollY;
		o.classList.add("overlay");

		origin ? (o.dataset.origin = origin) : "";
		body.prepend(o);
		body.style.top = `-${scrollY}px`;
		body.classList.add("noscroll");
		containers.forEach((c) => {
			c.style.paddingRight = `${sw}px`;
		});

		setTimeout(() => {
			o.classList.add(isActiveClass);
		}, 0);
	} else {
		body.classList.remove("noscroll");
		containers.forEach((c) => {
			c.style.paddingRight = '';
		});

		const o = document.querySelector(".overlay"),
			scrollY = body.style.top;
		if (!o) return;
		body.style.top = "";
		o.classList.remove(isActiveClass);

		window.scrollTo({
			left: 0,
			top: parseInt(scrollY || "0") * -1,
			behavior: "instant",
		});

		setTimeout(() => {
			o.remove();
		}, 250);
	}
}

function dropdownShow() {
	const dds = document.querySelectorAll(".js-drop-down"),
		isActiveClass = "is-active";
	dds.forEach((dd) => {
		dd.addEventListener("click", (e) => {
			e.stopPropagation();
			dd.classList.toggle(isActiveClass);
		});
	});
}

function dropdownClose() {
	window.addEventListener("click", (e) => {
		const dds = document.querySelectorAll(".drop-down__box"),
			isActiveClass = "is-active";
		dds.forEach((dd) => {
			if (!dd.contains(e.target)) {
				dd.parentNode.classList.remove(isActiveClass);
			}
		});
	});
}

function mobileCheck(w) {
	if (!w) return;
	let mq = window.matchMedia(`(max-width: ${w}px)`);
	return mq.matches ? true : false;
}

function mobileCatalog() {
	const navMenu = document.querySelector(".nav__menu"),
		menuToggler = document.getElementById("menu-toggle"),
		subMenuWrapper = document.querySelector(".catalog__submenu"),
		catalogLinks = document.querySelectorAll(".catalog__list .catalog__link"),
		backBtn = document.querySelector(".nav__back"),
		isActiveClass = "is-active",
		hideNavClass = "hide-nav";

	catalogLinks.forEach((catalogLink) => {
		catalogLink.addEventListener("click", (e) => {
			const category = catalogLink.nextElementSibling;
			if (category) {
				e.preventDefault();
				const cloneCategory = category.cloneNode(true);
				cloneCategory.classList.add(isActiveClass);
				subMenuWrapper.classList.add(isActiveClass);
				subMenuWrapper.innerHTML = "";
				subMenuWrapper.append(cloneCategory);
				backBtn.classList.add(isActiveClass);
			}
		});
	});

	backBtn.addEventListener("click", () => {
		backBtn.classList.remove(isActiveClass);
		subMenuWrapper.classList.remove(isActiveClass);
		setTimeout(() => {
			subMenuWrapper.innerHTML = "";
		}, 250);
	});

	menuToggler.addEventListener("change", () => {
		if (!menuToggler.checked) {
			backBtn.classList.remove(isActiveClass);
			subMenuWrapper.classList.remove(isActiveClass);
			navMenu.classList.remove(hideNavClass);
			subMenuWrapper.innerHTML = "";
		}
	});

	window.addEventListener("resize", () => {
		if (menuToggler.checked) {
			menuToggler.click();
		}
	});
}

function searchForm() {
	const navMenu = document.querySelector(".nav__menu"),
		menuToggler = document.getElementById("menu-toggle"),
		searchForm = document.querySelector(".nav__search"),
		searchInput = document.querySelector(".input_nav-search"),
		closeSearchBtn = document.querySelector(".js-close-search"),
		isActiveClass = "is-active",
		hideNavClass = "hide-nav";

	searchInput.addEventListener("focus", () => {
		searchForm.classList.add(isActiveClass);

		if (menuToggler.checked) {
			navMenu.classList.add(hideNavClass);
		}
	});

	closeSearchBtn.addEventListener("click", () => {
		searchForm.classList.remove(isActiveClass);
		navMenu.classList.remove(hideNavClass);
	});

	document.addEventListener("click", (e) => {
		if (!searchForm.contains(e.target)) {
			if (!menuToggler.checked) {
				searchForm.classList.remove(isActiveClass);
			}
		}
	});
}

function collapseHandler() {
	const isCollapsedClass = "is-collapsed";

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-collapse");
		if (!trigger) return;

		const isCollapsed = trigger.classList.contains(isCollapsedClass);

		if (isCollapsed) {
			expandSection(trigger);
			trigger.classList.remove(isCollapsedClass);
		} else {
			collapseSection(trigger);
		}
	});

	let collapseSection = (trigger) => {
		const section = trigger.nextElementSibling,
			sectionH = section.scrollHeight,
			elTransition = section.style.transition,
			isCollapsedClass = "is-collapsed";
		section.style.transition = "";
		requestAnimationFrame(function () {
			section.style.height = sectionH + "px";
			section.style.transition = elTransition;
			requestAnimationFrame(function () {
				section.style.height = 0 + "px";
				trigger.classList.add(isCollapsedClass);
			});
		});
	};

	let expandSection = (trigger) => {
		const section = trigger.nextElementSibling,
			sectionH = section.scrollHeight,
			isCollapsedClass = "is-collapsed";
		section.style.height = sectionH + "px";
		trigger.classList.remove(isCollapsedClass);
	};
}

function accordion() {
	const triggers = document.querySelectorAll(".js-accordion__trigger"),
		isOpenedClass = "is-opened",
		isEnabledClass = "on";
	triggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const accordionParent = trigger.parentElement,
				accordionContent = trigger.nextElementSibling;
			if (accordionParent.classList.contains(isEnabledClass)) {
				trigger.classList.toggle(isOpenedClass);
				if (accordionContent.style.maxHeight) {
					accordionContent.style.maxHeight = null;
				} else {
					accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
				}
			}
		});
	});
}

function accordionFooter() {
	const accordionFooter = document.querySelectorAll(".f-menu.js-accordion"),
		isEnabledClass = "on";

	let accordionBuildFooter = () => {
		accordionFooter.forEach((el) => {
			el.classList.add(isEnabledClass);
		});
	};

	let accordionDestroyFooter = () => {
		accordionFooter.forEach((el) => {
			el.classList.remove(isEnabledClass);
		});
	};

	let timeout;

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			if (!timeout) {
				timeout = setTimeout(function () {
					// Reset timeout
					timeout = null;
					const isMobile = mobileCheck("767");
					isMobile ? accordionBuildFooter() : accordionDestroyFooter();
				}, 200);
			}
		})
	);
}

function tabsInit() {
	const isActiveClass = "is-active",
		tabsItems = document.querySelectorAll(".tabs");
	if (!tabsItems) return;

	tabsItems.forEach((el) => {
		const currentActive = el.querySelector(`.${isActiveClass}`);
		if (currentActive) return;

		let items = el.querySelectorAll(".tabs__header, .tabs__content");
		if (!items) return;

		items.forEach((i) => {
			i.querySelector(".tab-nav, .tab-block").classList.add(isActiveClass);
		});
	});
}

function tabsHandler(observe) {
	const isActiveClass = "is-active";

	if (observe) blockObserver(observe);

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-tab-nav");
		if (!trigger || trigger.classList.contains(isActiveClass)) return;

		const currentActive = trigger.closest(".tabs").querySelectorAll(`.${isActiveClass}`),
			targetTab = trigger.dataset.tab,
			tabContent = trigger.closest(".tabs").querySelector(`[data-tab-content=${targetTab}]`);

		currentActive.forEach((el) => el.classList.remove(isActiveClass));

		trigger.classList.add(isActiveClass);
		tabContent.classList.add(isActiveClass);
	});
}

// в шаблоне пишем сразу инлайн стиль, без js
// export function ideaMarkerPlace() {
// 	const markers = document.querySelectorAll(".idea-marker");
// 	if (!markers) return;
// 	markers.forEach((m) => {
// 		const x = m.dataset.x,
// 			y = m.dataset.y;
// 		m.style.left = `${x}%`;
// 		m.style.top = `${y}%`;
// 	});
// }

function ideaMarkerShow() {
	const markers = document.querySelectorAll(".idea-marker__btn"),
		isActiveClass = "is-active";

	if (!markers) return;

	markers.forEach((m) => {
		m.addEventListener("click", () => {
			m.parentElement.classList.toggle(isActiveClass);

			const isMobile = mobileCheck("576");
			if (isMobile) {
				const ideaMobile = document.querySelector(".idea-mobile-content div");

				if (ideaMobile) {
					const cloneContent = m.nextElementSibling.cloneNode(true);
					ideaMobile.innerHTML = "";
					ideaMobile.parentElement.classList.add(isActiveClass);
					ideaMobile.append(cloneContent);
					// overlay(1);
				}
			}
		});
	});

	document.addEventListener("click", (e) => {
		const openedIdeas = document.querySelectorAll(".idea-marker.is-active");
		openedIdeas.forEach((i) => {
			if (!i.contains(e.target)) {
				i.classList.remove(isActiveClass);
			}
		});
	});
}

// canvas.offsetLeft		-- родитель от левого края браузера
// canvas.offsetWidth		-- длина родителя
// marker.offsetLeft		-- маркер до левого края
// marker.offsetWidth		-- длина маркера
// box.offsetWidth			-- длина попапа
function ideaPopupPlace() {
	const iPopups = document.querySelectorAll(".idea-marker__content"),
		leftClass = "marker-l",
		rightClass = "marker-r";

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			iPopups.forEach((box) => {
				const canvas = box.closest(".idea"),
					canvasL = canvas.offsetLeft,
					marker = box.parentElement,
					markerW = marker.offsetWidth,
					markerL = marker.offsetLeft,
					markerR = marker.getBoundingClientRect().right,
					minL = markerW / 2 + markerL + canvasL - 16,
					minR = window.innerWidth - markerR + markerW / 2 - 32,
					boxW = box.offsetWidth,
					overL = minL < boxW / 2,
					overR = minR < boxW / 2;

				box.classList[overL ? "add" : "remove"](leftClass);
				box.classList[overR ? "add" : "remove"](rightClass);
			});
		})
	);
}

function showSkeleton(where, tpl) {
	if (!where || !tpl) return;
	const template = document.getElementById(tpl);
	where.innerHTML = "";
	where.appendChild(template.content.cloneNode(true));
}

function useLoader(where, action, options = {}) {
	if (!where) return;
	let whereArr = [];

	if (!Array.isArray(where)) {
		whereArr = [where];
	} else {
		whereArr = where;
	}

	if (action == "start") {
		whereArr.forEach((el) => {
			if (!el) return;
			let loader = document.createElement("div");
			loader.classList.add("fetch");
			let child = document.createElement("div");
			child.classList.add("fetch__ring");

			if (options.class) {
				loader.classList.add(options.class);
			}

			loader.appendChild(child);

			el.appendChild(loader);

			setTimeout(() => {
				loader.style.opacity = 1;
			}, 0);
		});
	} else if (action == "stop") {
		whereArr.forEach((el) => {
			if (!el) return;
			let loaders = el.querySelectorAll(".fetch");
			if (!loaders) return;
			loaders.forEach((loader) => {
				setTimeout(() => {
					loader.style.opacity = 0;
					setTimeout(() => {
						loader.remove();
					}, 250);
				}, 0);
			});
		});
		return;
	}
}

function btnLoader(where, action = false) {
	if (!where) return;
	const btnLoaderClass = "btn-loader",
		labels = where.querySelectorAll("span");

	if (action == "stop") {
		where.classList.remove(btnLoaderClass);
		labels.forEach((l) => {
			l.style.opacity = "";
		});
		return;
	}

	where.classList.add(btnLoaderClass);
	labels.forEach((l) => {
		l.style.opacity = 0;
	});
}

// fetch observer
function blockObserver(el = false) {
	const fetchObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let target = entry.target,
					url = target.dataset.url,
					data = {},
					params = {};

				if (!url) return;

				if (target.dataset.params) {
					params = JSON.parse(target.dataset.params);
				}

				Object.assign(data, params);

				(async () => {
					try {
						useLoader(target, "start", { class: "_sm" });

						let response = await fetch(url, {
							method: "POST",
							headers: {
								"Content-Type": "application/json;charset=utf-8",
							},
							body: JSON.stringify(data),
						});
						if (!response.ok) {
							return;
						}
						let result = await response.json();

						if (result.status === true) {
							target.innerHTML = result.content;
						}

						reinitObserverResults(target);

						useLoader(target, "stop");
					} catch (e) {
						console.log(e);
						return;
					}
				})();

				observer.unobserve(entry.target);
			}
		});
	}, {});

	const blocks = el ? el.querySelectorAll("[data-fetch='true']") : document.querySelectorAll("[data-fetch='true']");
	blocks.forEach((block) => fetchObserver.observe(block));

	let reinitObserverResults = (target) => {
		productBlockCollapseHandler();
		carouselsInit(target);
		productGalleriesInit();
		productGallery();
		tabsInit();
		tabsHandler(target);
	};
}

function functions_getScrollbarWidth() {
	let div = document.createElement("div");
	div.style.overflowY = "scroll";
	div.style.width = "50px";
	div.style.height = "50px";
	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();
	return scrollWidth;
}


;// CONCATENATED MODULE: ./src/js/modules/dynamicAdapt.js
/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */

/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */

/**
 * @param {'min' | 'max'} type
 */
function useDynamicAdapt(type = 'max') {
  const className = '_dynamic_adapt_'
  const attrName = 'data-da'

  /** @type {dNode[]} */
  const dNodes = getDNodes()

  /** @type {dMediaQuery[]} */
  const dMediaQueries = getDMediaQueries(dNodes)

  dMediaQueries.forEach((dMediaQuery) => {
    const matchMedia = window.matchMedia(dMediaQuery.query)
    // массив объектов с подходящим брейкпоинтом
    const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
    const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
    matchMedia.addEventListener('change', mediaHandler)

    mediaHandler()
  })

  function getDNodes() {
    const result = []
    const elements = [...document.querySelectorAll(`[${attrName}]`)]

    elements.forEach((element) => {
      const attr = element.getAttribute(attrName)
      const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())

      const to = document.querySelector(toSelector)

      if (to) {
        result.push({
          parent: element.parentElement,
          element,
          to,
          breakpoint: breakpoint ?? '767',
          order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
          index: -1,
        })
      }
    })

    return sortDNodes(result)
  }

  /**
   * @param {dNode} items
   * @returns {dMediaQuery[]}
   */
  function getDMediaQueries(items) {
    const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

    return uniqItems.map((item) => {
      const [query, breakpoint] = item.split(',')

      return { query, breakpoint }
    })
  }

  /**
   * @param {MediaQueryList} matchMedia
   * @param {dNodes} items
   */
  function getMediaHandler(matchMedia, items) {
    return function mediaHandler() {
      if (matchMedia.matches) {
        items.forEach((item) => {
          moveTo(item)
        })

        items.reverse()
      } else {
        items.forEach((item) => {
          if (item.element.classList.contains(className)) {
            moveBack(item)
          }
        })

        items.reverse()
      }
    }
  }

  /**
   * @param {dNode} dNode
   */
  function moveTo(dNode) {
    const { to, element, order } = dNode
    dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
    element.classList.add(className)

    if (order === 'last' || order >= to.children.length) {
      to.append(element)

      return
    }

    if (order === 'first') {
      to.prepend(element)

      return
    }

    to.children[order].before(element)
  }

  /**
   * @param {dNode} dNode
   */
  function moveBack(dNode) {
    const { parent, element, index } = dNode
    element.classList.remove(className)

    if (index >= 0 && parent.children[index]) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   */
  function getIndexInParent(element, parent) {
    return [...parent.children].indexOf(element)
  }

  /**
   * Функция сортировки массива по breakpoint и order
   * по возрастанию для type = min
   * по убыванию для type = max
   *
   * @param {dNode[]} items
   */
  function sortDNodes(items) {
    const isMin = type === 'min' ? 1 : 0

    return [...items].sort((a, b) => {
      if (a.breakpoint === b.breakpoint) {
        if (a.order === b.order) {
          return 0
        }

        if (a.order === 'first' || b.order === 'last') {
          return -1 * isMin
        }

        if (a.order === 'last' || b.order === 'first') {
          return 1 * isMin
        }

        return 0
      }

      return (a.breakpoint - b.breakpoint) * isMin
    })
  }

  function isNumber(value) {
    return !isNaN(value)
  }
}

;// CONCATENATED MODULE: ./src/js/modules/cookies.js
/**
 * Cookie policy
 * @link https://learn.javascript.ru/cookie
 */
function getCookie(name) {
	let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 1) {
	let expires;

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}

	let options = {
		path: "/",
		expires: expires,
		// defaults
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		"max-age": -1,
	});
}

const cookieForm = document.querySelector(".cookie"),
	cookieAccept = document.querySelector(".js-cookie__accept");

	if(cookieForm && cookieAccept) {
		let policyCheck = () => {
			if (!getCookie("policyAccepted")) {
				cookieForm.classList.remove("hidden");
			}
		};
		
		let policyAccepted = (e) => {
			e.preventDefault();
			setCookie("policyAccepted", "1", 7);
			cookieForm.classList.add("hidden");
		};
		
		cookieAccept.addEventListener("click", policyAccepted);
		window.addEventListener("load", policyCheck);
	}

const headerAlert = document.querySelector(".header-alert"),
	closeAlert = document.querySelector(".js-close-header-alert");

	if(headerAlert && closeAlert) {
		let alertCheck = () => {
			if (!getCookie("alertHidden")) {
				headerAlert.classList.remove("hidden");
			}
		};
		
		let alertHide = (e) => {
			e.preventDefault();
			setCookie("alertHidden", "1", 1);
			headerAlert.classList.add("hidden");
		};
		
		closeAlert.addEventListener("click", alertHide);
		window.addEventListener("load", alertCheck);
	}

;// CONCATENATED MODULE: ./src/js/app.js








addEventListener("DOMContentLoaded", () => {
	useDynamicAdapt();

	stickyHeader();
	mobileCatalog();
	searchForm();
	sectionClose();
	sectionShow();
	dropdownClose();
	dropdownShow();
	overlayClick();
	collapseHandler();
	accordion();
	accordionFooter();
	tabsInit();
	tabsHandler();
	ideaMarkerShow();
	ideaPopupPlace();
	blockObserver();

	carouselsInit();
	rangeSlidersInit();

	productGalleriesInit();
	productGallery();
	productFavourite();
	productPropsHover();
	productProps();
	productFetches();

	filterTagsSet();
	filterTagsRemove();
});

})();

/******/ })()
;