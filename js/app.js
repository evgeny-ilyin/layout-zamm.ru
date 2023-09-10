/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/functions.js
function stickyHeader() {
	const header = document.querySelector("header"),
		isOntopClass = "is-ontop",
		isStickyClass = "is-sticky",
		isHiddenClass = "is-hidden";

	function handleScroll() {
		if (window.scrollY == 0) {
			header.classList.add(isOntopClass);
		}
		if (window.scrollY > 56) {
			if (window.scrollY > this.lastScrollTop || 0) {
				header.classList.remove(isOntopClass);
				header.classList.add(isHiddenClass);
			} else if (window.scrollY < this.lastScrollTop) {
				header.classList.add(isStickyClass);
				header.classList.remove(isHiddenClass);
			}
		}
		this.lastScrollTop = window.scrollY;
	}

	window.addEventListener("scroll", handleScroll);
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
		if (!this.checked) {
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

// не используются >
function isTouchEnabled() {
	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function dropdownByTouch() {
	if (!isTouchEnabled()) {
		return;
	}

	const dropdownTouch = document.querySelectorAll(".dropdown-touch"),
		isActiveClass = "is-active";

	dropdownTouch.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.stopPropagation();
			const dropdown = link.nextElementSibling;
			if (!dropdown.classList.contains(isActiveClass)) {
				dropdownClose(e);
			}
			dropdown.classList.toggle(isActiveClass);
		});
	});

	document.addEventListener("click", (e) => {
		dropdownClose(e);
	});

	let dropdownClose = (e) => {
		const dropdownTouchActive = document.querySelectorAll(`.dropdown-touch + .${isActiveClass}`);
		if (dropdownTouchActive) {
			dropdownTouchActive.forEach((dropdown) => {
				if (!dropdown.contains(e.target)) {
					dropdown.classList.remove(isActiveClass);
				}
			});
		}
	};
}
// не используются <

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

function closeModal() {
	const closeButtons = document.querySelectorAll(".btn_close"),
		isActiveClass = "is-active";
	closeButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const modal = btn.closest(`.${isActiveClass}`);
			if (modal) {
				modal.classList.remove(isActiveClass);
			}
		});
	});
}

function accordion() {
	const accordionFooter = document.querySelectorAll(".f-menu.js-accordion"),
		accordionTriggers = document.querySelectorAll(".js-accordion__trigger"),
		isActiveClass = "is-active",
		isEnabledClass = "on";

	accordionTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const accordionParent = trigger.parentElement,
				accordionContent = trigger.nextElementSibling;

			if (accordionParent.classList.contains(isEnabledClass)) {
				trigger.classList.toggle(isActiveClass);
				if (accordionContent.style.maxHeight) {
					accordionContent.style.maxHeight = null;
				} else {
					accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
				}
			}
		});
	});

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

	let mobileCheck = (mq) => {
		if (mq.matches) {
			return true;
		} else {
			return false;
		}
	};

	const mq = window.matchMedia("(max-width: 767px)");
	let timeout;

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			if (!timeout) {
				timeout = setTimeout(function () {
					// Reset timeout
					timeout = null;
					const isMobile = mobileCheck(mq);
					if (isMobile) {
						accordionBuildFooter();
					} else if (!isMobile) {
						accordionDestroyFooter();
					}
				}, 200);
			}
		})
	);
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

;// CONCATENATED MODULE: ./node_modules/@fancyapps/ui/dist/carousel/carousel.esm.js
const t=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),e=function(t,i=void 0){return!(!t||t===document.body||i&&t===i)&&(function(t){if(!(t&&t instanceof Element&&t.offsetParent))return!1;const e=t.scrollHeight>t.clientHeight,i=window.getComputedStyle(t).overflowY,s=-1!==i.indexOf("hidden"),n=-1!==i.indexOf("visible");return e&&!s&&!n}(t)?t:e(t.parentElement,i))},i=function(t){var e=(new DOMParser).parseFromString(t,"text/html").body;if(e.childElementCount>1){for(var i=document.createElement("div");e.firstChild;)i.appendChild(e.firstChild);return i}return e.firstChild},s=t=>`${t||""}`.split(" ").filter((t=>!!t)),n=(t,e,i)=>{s(e).forEach((e=>{t&&t.classList.toggle(e,i||!1)}))};class o{constructor(t){Object.defineProperty(this,"pageX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pageY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"time",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"nativePointer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.nativePointer=t,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.time=Date.now()}}const a={passive:!1};class r{constructor(t,{start:e=(()=>!0),move:i=(()=>{}),end:s=(()=>{})}){Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"startCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"moveCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"endCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"currentPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"startPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.element=t,this.startCallback=e,this.moveCallback=i,this.endCallback=s;for(const t of["onPointerStart","onTouchStart","onMove","onTouchEnd","onPointerEnd","onWindowBlur"])this[t]=this[t].bind(this);this.element.addEventListener("mousedown",this.onPointerStart,a),this.element.addEventListener("touchstart",this.onTouchStart,a),this.element.addEventListener("touchmove",this.onMove,a),this.element.addEventListener("touchend",this.onTouchEnd),this.element.addEventListener("touchcancel",this.onTouchEnd)}onPointerStart(t){if(!t.buttons||0!==t.button)return;const e=new o(t);this.currentPointers.some((t=>t.id===e.id))||this.triggerPointerStart(e,t)&&(window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseup",this.onPointerEnd),window.addEventListener("blur",this.onWindowBlur))}onTouchStart(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerStart(new o(e),t);window.addEventListener("blur",this.onWindowBlur)}onMove(t){const e=this.currentPointers.slice(),i="changedTouches"in t?Array.from(t.changedTouches||[]).map((t=>new o(t))):[new o(t)],s=[];for(const t of i){const e=this.currentPointers.findIndex((e=>e.id===t.id));e<0||(s.push(t),this.currentPointers[e]=t)}s.length&&this.moveCallback(t,this.currentPointers.slice(),e)}onPointerEnd(t){t.buttons>0&&0!==t.button||(this.triggerPointerEnd(t,new o(t)),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur))}onTouchEnd(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerEnd(t,new o(e))}triggerPointerStart(t,e){return!!this.startCallback(e,t,this.currentPointers.slice())&&(this.currentPointers.push(t),this.startPointers.push(t),!0)}triggerPointerEnd(t,e){const i=this.currentPointers.findIndex((t=>t.id===e.id));i<0||(this.currentPointers.splice(i,1),this.startPointers.splice(i,1),this.endCallback(t,e,this.currentPointers.slice()))}onWindowBlur(){this.clear()}clear(){for(;this.currentPointers.length;){const t=this.currentPointers[this.currentPointers.length-1];this.currentPointers.splice(this.currentPointers.length-1,1),this.startPointers.splice(this.currentPointers.length-1,1),this.endCallback(new Event("touchend",{bubbles:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY}),t,this.currentPointers.slice())}}stop(){this.element.removeEventListener("mousedown",this.onPointerStart,a),this.element.removeEventListener("touchstart",this.onTouchStart,a),this.element.removeEventListener("touchmove",this.onMove,a),this.element.removeEventListener("touchend",this.onTouchEnd),this.element.removeEventListener("touchcancel",this.onTouchEnd),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur)}}function l(t,e){return e?Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2)):0}function h(t,e){return e?{clientX:(t.clientX+e.clientX)/2,clientY:(t.clientY+e.clientY)/2}:t}const c=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),d=(t,...e)=>{const i=e.length;for(let s=0;s<i;s++){const i=e[s]||{};Object.entries(i).forEach((([e,i])=>{const s=Array.isArray(i)?[]:{};t[e]||Object.assign(t,{[e]:s}),c(i)?Object.assign(t[e],d(s,i)):Array.isArray(i)?Object.assign(t,{[e]:[...i]}):Object.assign(t,{[e]:i})}))}return t},u=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class g{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(t){this.options=t?d({},this.constructor.defaults,t):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...e){let i=u(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...s){let n=u(e,t);var o;"string"!=typeof(o=n)||isNaN(o)||isNaN(parseFloat(o))||(n=parseFloat(n)),"true"===n&&(n=!0),"false"===n&&(n=!1),n&&"function"==typeof n&&(n=n.call(this,this,t,...s));let a=u(e,this.options);return a&&"function"==typeof a?n=a.call(this,this,t,...s,n):void 0===n&&(n=a),void 0===n?i:n}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let s="";return i?s=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(s=this.option(`l10n.${e}`)),s||(s=t),s}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i)}))}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(g,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.22"}),Object.defineProperty(g,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class p extends g{constructor(t={}){super(t),Object.defineProperty(this,"plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}})}attachPlugins(t={}){const e=new Map;for(const[i,s]of Object.entries(t)){const t=this.option(i),n=this.plugins[i];n||!1===t?n&&!1===t&&(n.detach(),delete this.plugins[i]):e.set(i,new s(this,t||{}))}for(const[t,i]of e)this.plugins[t]=i,i.attach();this.emit("attachPlugins")}detachPlugins(t){t=t||Object.keys(this.plugins);for(const e of t){const t=this.plugins[e];t&&t.detach(),delete this.plugins[e]}return this.emit("detachPlugins"),this}}var f;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy"}(f||(f={}));const m=["a","b","c","d","e","f"],b={content:null,width:"auto",height:"auto",panMode:"drag",touch:!0,dragMinThreshold:3,lockAxis:!1,mouseMoveFactor:1,mouseMoveFriction:.12,zoom:!0,pinchToZoom:!0,panOnlyZoomed:"auto",minScale:1,maxScale:2,friction:.25,dragFriction:.35,decelFriction:.05,click:"toggleZoom",dblClick:!1,wheel:"zoom",wheelLimit:7,spinner:!0,bounds:"auto",infinite:!1,rubberband:!0,bounce:!0,maxVelocity:75,transformParent:!1,classes:{content:"f-panzoom__content",isLoading:"is-loading",canZoomIn:"can-zoom_in",canZoomOut:"can-zoom_out",isDraggable:"is-draggable",isDragging:"is-dragging",inFullscreen:"in-fullscreen",htmlHasFullscreen:"with-panzoom-in-fullscreen"},l10n:{PANUP:"Move up",PANDOWN:"Move down",PANLEFT:"Move left",PANRIGHT:"Move right",ZOOMIN:"Zoom in",ZOOMOUT:"Zoom out",TOGGLEZOOM:"Toggle zoom level",TOGGLE1TO1:"Toggle zoom level",ITERATEZOOM:"Toggle zoom level",ROTATECCW:"Rotate counterclockwise",ROTATECW:"Rotate clockwise",FLIPX:"Flip horizontally",FLIPY:"Flip vertically",FITX:"Fit horizontally",FITY:"Fit vertically",RESET:"Reset",TOGGLEFS:"Toggle fullscreen"}},v='<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',y=t=>t&&null!==t&&t instanceof Element&&"nodeType"in t,w=(t,e)=>{t&&s(e).forEach((e=>{t.classList.remove(e)}))},x=(t,e)=>{t&&s(e).forEach((e=>{t.classList.add(e)}))},P={a:1,b:0,c:0,d:1,e:0,f:0},T=1e5,S=1e3,M="mousemove",O="drag",E="content";let z=null,k=null;class R extends p{get isTouchDevice(){return null===k&&(k=window.matchMedia("(hover: none)").matches),k}get isMobile(){return null===z&&(z=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),z}get panMode(){return this.options.panMode!==M||this.isTouchDevice?O:M}get panOnlyZoomed(){const t=this.options.panOnlyZoomed;return"auto"===t?this.isTouchDevice:t}get isInfinite(){return this.option("infinite")}get angle(){return 180*Math.atan2(this.current.b,this.current.a)/Math.PI||0}get targetAngle(){return 180*Math.atan2(this.target.b,this.target.a)/Math.PI||0}get scale(){const{a:t,b:e}=this.current;return Math.sqrt(t*t+e*e)||1}get targetScale(){const{a:t,b:e}=this.target;return Math.sqrt(t*t+e*e)||1}get minScale(){return this.option("minScale")||1}get fullScale(){const{contentRect:t}=this;return t.fullWidth/t.fitWidth||1}get maxScale(){return this.fullScale*(this.option("maxScale")||1)||1}get coverScale(){const{containerRect:t,contentRect:e}=this,i=Math.max(t.height/e.fitHeight,t.width/e.fitWidth)||1;return Math.min(this.fullScale,i)}get isScaling(){return Math.abs(this.targetScale-this.scale)>1e-5&&!this.isResting}get isContentLoading(){const t=this.content;return!!(t&&t instanceof HTMLImageElement)&&!t.complete}get isResting(){if(this.isBouncingX||this.isBouncingY)return!1;for(const t of m){const e="e"==t||"f"===t?.001:1e-5;if(Math.abs(this.target[t]-this.current[t])>e)return!1}return!(!this.ignoreBounds&&!this.checkBounds().inBounds)}constructor(t,e={},s={}){var n;if(super(e),Object.defineProperty(this,"pointerTracker",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"resizeObserver",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"updateTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"clickTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"rAF",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"isTicking",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"friction",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"ignoreBounds",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingX",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingY",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"clicks",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"trackingPoints",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"pwt",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"cwd",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"pmme",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:f.Init}),Object.defineProperty(this,"isDragging",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"content",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"spinner",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"containerRect",{enumerable:!0,configurable:!0,writable:!0,value:{width:0,height:0,innerWidth:0,innerHeight:0}}),Object.defineProperty(this,"contentRect",{enumerable:!0,configurable:!0,writable:!0,value:{top:0,right:0,bottom:0,left:0,fullWidth:0,fullHeight:0,fitWidth:0,fitHeight:0,width:0,height:0}}),Object.defineProperty(this,"dragStart",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,top:0,left:0,time:0}}),Object.defineProperty(this,"dragOffset",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,time:0}}),Object.defineProperty(this,"current",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},P)}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},P)}),Object.defineProperty(this,"velocity",{enumerable:!0,configurable:!0,writable:!0,value:{a:0,b:0,c:0,d:0,e:0,f:0}}),Object.defineProperty(this,"lockedAxis",{enumerable:!0,configurable:!0,writable:!0,value:!1}),!t)throw new Error("Container Element Not Found");this.container=t,this.initContent(),this.attachPlugins(Object.assign(Object.assign({},R.Plugins),s)),this.emit("init");const o=this.content;if(o.addEventListener("load",this.onLoad),o.addEventListener("error",this.onError),this.isContentLoading){if(this.option("spinner")){t.classList.add(this.cn("isLoading"));const e=i(v);!t.contains(o)||o.parentElement instanceof HTMLPictureElement?this.spinner=t.appendChild(e):this.spinner=(null===(n=o.parentElement)||void 0===n?void 0:n.insertBefore(e,o))||null}this.emit("beforeLoad")}else queueMicrotask((()=>{this.enable()}))}initContent(){const{container:t}=this,e=this.cn(E);let i=this.option(E)||t.querySelector(`.${e}`);if(i||(i=t.querySelector("img,picture")||t.firstElementChild,i&&x(i,e)),i instanceof HTMLPictureElement&&(i=i.querySelector("img")),!i)throw new Error("No content found");this.content=i}onLoad(){this.spinner&&(this.spinner.remove(),this.spinner=null),this.option("spinner")&&this.container.classList.remove(this.cn("isLoading")),this.emit("afterLoad"),this.state===f.Init?this.enable():this.updateMetrics()}onError(){this.state!==f.Destroy&&(this.spinner&&(this.spinner.remove(),this.spinner=null),this.stop(),this.detachEvents(),this.state=f.Error,this.emit("error"))}attachObserver(){var t;const e=()=>Math.abs(this.containerRect.width-this.container.getBoundingClientRect().width)>.1||Math.abs(this.containerRect.height-this.container.getBoundingClientRect().height)>.1;this.resizeObserver||void 0===window.ResizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.updateTimer||(e()?(this.onResize(),this.isMobile&&(this.updateTimer=setTimeout((()=>{e()&&this.onResize(),this.updateTimer=null}),500))):this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null))}))),null===(t=this.resizeObserver)||void 0===t||t.observe(this.container)}detachObserver(){var t;null===(t=this.resizeObserver)||void 0===t||t.disconnect()}attachEvents(){const{container:t}=this;t.addEventListener("click",this.onClick,{passive:!1,capture:!1}),t.addEventListener("wheel",this.onWheel,{passive:!1}),this.pointerTracker=new r(t,{start:this.onPointerDown,move:this.onPointerMove,end:this.onPointerUp}),document.addEventListener(M,this.onMouseMove)}detachEvents(){var t;const{container:e}=this;e.removeEventListener("click",this.onClick,{passive:!1,capture:!1}),e.removeEventListener("wheel",this.onWheel,{passive:!1}),null===(t=this.pointerTracker)||void 0===t||t.stop(),this.pointerTracker=null,document.removeEventListener(M,this.onMouseMove),document.removeEventListener("keydown",this.onKeydown,!0),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null)}animate(){const t=this.friction;this.setTargetForce();const e=this.option("maxVelocity");for(const i of m)t?(this.velocity[i]*=1-t,e&&!this.isScaling&&(this.velocity[i]=Math.max(Math.min(this.velocity[i],e),-1*e)),this.current[i]+=this.velocity[i]):this.current[i]=this.target[i];this.setTransform(),this.setEdgeForce(),!this.isResting||this.isDragging?this.rAF=requestAnimationFrame((()=>this.animate())):this.stop("current")}setTargetForce(){for(const t of m)"e"===t&&this.isBouncingX||"f"===t&&this.isBouncingY||(this.velocity[t]=(1/(1-this.friction)-1)*(this.target[t]-this.current[t]))}checkBounds(t=0,e=0){const{current:i}=this,s=i.e+t,n=i.f+e,o=this.getBounds(),{x:a,y:r}=o,l=a.min,h=a.max,c=r.min,d=r.max;let u=0,g=0;return l!==1/0&&s<l?u=l-s:h!==1/0&&s>h&&(u=h-s),c!==1/0&&n<c?g=c-n:d!==1/0&&n>d&&(g=d-n),Math.abs(u)<.001&&(u=0),Math.abs(g)<.001&&(g=0),Object.assign(Object.assign({},o),{xDiff:u,yDiff:g,inBounds:!u&&!g})}clampTargetBounds(){const{target:t}=this,{x:e,y:i}=this.getBounds();e.min!==1/0&&(t.e=Math.max(t.e,e.min)),e.max!==1/0&&(t.e=Math.min(t.e,e.max)),i.min!==1/0&&(t.f=Math.max(t.f,i.min)),i.max!==1/0&&(t.f=Math.min(t.f,i.max))}calculateContentDim(t=this.current){const{content:e,contentRect:i}=this,{fitWidth:s,fitHeight:n,fullWidth:o,fullHeight:a}=i;let r=o,l=a;if(this.option("zoom")||0!==this.angle){const i=!(e instanceof HTMLImageElement)&&("none"===window.getComputedStyle(e).maxWidth||"none"===window.getComputedStyle(e).maxHeight),h=i?o:s,c=i?a:n,d=this.getMatrix(t),u=new DOMPoint(0,0).matrixTransform(d),g=new DOMPoint(0+h,0).matrixTransform(d),p=new DOMPoint(0+h,0+c).matrixTransform(d),f=new DOMPoint(0,0+c).matrixTransform(d),m=Math.abs(p.x-u.x),b=Math.abs(p.y-u.y),v=Math.abs(f.x-g.x),y=Math.abs(f.y-g.y);r=Math.max(m,v),l=Math.max(b,y)}return{contentWidth:r,contentHeight:l}}setEdgeForce(){if(this.ignoreBounds||this.isDragging||this.panMode===M||this.targetScale<this.scale)return this.isBouncingX=!1,void(this.isBouncingY=!1);const{target:t}=this,{x:e,y:i,xDiff:s,yDiff:n}=this.checkBounds();const o=this.option("maxVelocity");let a=this.velocity.e,r=this.velocity.f;0!==s?(this.isBouncingX=!0,s*a<=0?a+=.14*s:(a=.14*s,e.min!==1/0&&(this.target.e=Math.max(t.e,e.min)),e.max!==1/0&&(this.target.e=Math.min(t.e,e.max))),o&&(a=Math.max(Math.min(a,o),-1*o))):this.isBouncingX=!1,0!==n?(this.isBouncingY=!0,n*r<=0?r+=.14*n:(r=.14*n,i.min!==1/0&&(this.target.f=Math.max(t.f,i.min)),i.max!==1/0&&(this.target.f=Math.min(t.f,i.max))),o&&(r=Math.max(Math.min(r,o),-1*o))):this.isBouncingY=!1,this.isBouncingX&&(this.velocity.e=a),this.isBouncingY&&(this.velocity.f=r)}enable(){const{content:t}=this,e=new DOMMatrixReadOnly(window.getComputedStyle(t).transform);for(const t of m)this.current[t]=this.target[t]=e[t];this.updateMetrics(),this.attachObserver(),this.attachEvents(),this.state=f.Ready,this.emit("ready")}onClick(t){var e;this.isDragging&&(null===(e=this.pointerTracker)||void 0===e||e.clear(),this.trackingPoints=[],this.startDecelAnim());const i=t.target;if(!i||t.defaultPrevented)return;if(i&&i.hasAttribute("disabled"))return t.preventDefault(),void t.stopPropagation();if((()=>{const t=window.getSelection();return t&&"Range"===t.type})()&&!i.closest("button"))return;const s=i.closest("[data-panzoom-action]"),n=i.closest("[data-panzoom-change]"),o=s||n,a=o&&y(o)?o.dataset:null;if(a){const e=a.panzoomChange,i=a.panzoomAction;if((e||i)&&t.preventDefault(),e){let t={};try{t=JSON.parse(e)}catch(t){console&&console.warn("The given data was not valid JSON")}return void this.applyChange(t)}if(i)return void(this[i]&&this[i]())}if(Math.abs(this.dragOffset.x)>3||Math.abs(this.dragOffset.y)>3)return t.preventDefault(),void t.stopPropagation();const r=this.content.getBoundingClientRect();if(this.dragStart.time&&!this.canZoomOut()&&(Math.abs(r.x-this.dragStart.x)>2||Math.abs(r.y-this.dragStart.y)>2))return;this.dragStart.time=0;const l=e=>{this.option("zoom")&&e&&"string"==typeof e&&/(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e)&&"function"==typeof this[e]&&(t.preventDefault(),this[e]({event:t}))},h=this.option("click",t),c=this.option("dblClick",t);c?(this.clicks++,1==this.clicks&&(this.clickTimer=setTimeout((()=>{1===this.clicks?(this.emit("click",t),!t.defaultPrevented&&h&&l(h)):(this.emit("dblClick",t),t.defaultPrevented||l(c)),this.clicks=0,this.clickTimer=null}),350))):(this.emit("click",t),!t.defaultPrevented&&h&&l(h))}addTrackingPoint(t){const e=this.trackingPoints.filter((t=>t.time>Date.now()-100));e.push(t),this.trackingPoints=e}onPointerDown(t,e,i){var s;if(!1===this.option("touch",t))return!1;this.pwt=0,this.dragOffset={x:0,y:0,time:0},this.trackingPoints=[];const n=this.content.getBoundingClientRect();if(this.dragStart={x:n.x,y:n.y,top:n.top,left:n.left,time:Date.now()},this.clickTimer)return!1;if(this.panMode===M&&this.targetScale>1)return t.preventDefault(),t.stopPropagation(),!1;const o=t.composedPath()[0];if(!i.length){if(["TEXTAREA","OPTION","INPUT","SELECT","VIDEO","IFRAME"].includes(o.nodeName)||o.closest("[contenteditable]")||o.closest("[data-selectable]")||o.closest("[data-draggable]")||o.closest("[data-clickable]")||o.closest("[data-panzoom-change]")||o.closest("[data-panzoom-action]"))return!1;null===(s=window.getSelection())||void 0===s||s.removeAllRanges()}if("mousedown"===t.type)["A","BUTTON"].includes(o.nodeName)||t.preventDefault();else if(Math.abs(this.velocity.a)>.3)return!1;return this.target.e=this.current.e,this.target.f=this.current.f,this.stop(),this.isDragging||(this.isDragging=!0,this.addTrackingPoint(e),this.emit("touchStart",t)),!0}onPointerMove(i,s,n){if(!1===this.option("touch",i))return;if(!this.isDragging)return;if(s.length<2&&this.panOnlyZoomed&&t(this.targetScale)<=t(this.minScale))return;if(this.emit("touchMove",i),i.defaultPrevented)return;this.addTrackingPoint(s[0]);const{content:o}=this,a=h(n[0],n[1]),r=h(s[0],s[1]);let c=0,d=0;if(s.length>1){const t=o.getBoundingClientRect();c=a.clientX-t.left-.5*t.width,d=a.clientY-t.top-.5*t.height}const u=l(n[0],n[1]),g=l(s[0],s[1]);let p=u?g/u:1,f=r.clientX-a.clientX,m=r.clientY-a.clientY;this.dragOffset.x+=f,this.dragOffset.y+=m,this.dragOffset.time=Date.now()-this.dragStart.time;let b=t(this.targetScale)===t(this.minScale)&&this.option("lockAxis");if(b&&!this.lockedAxis)if("xy"===b||"y"===b||"touchmove"===i.type){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void i.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockedAxis=t>45&&t<135?"y":"x",this.dragOffset.x=0,this.dragOffset.y=0,f=0,m=0}else this.lockedAxis=b;if(e(i.target,this.content)&&(b="x",this.dragOffset.y=0),b&&"xy"!==b&&this.lockedAxis!==b&&t(this.targetScale)===t(this.minScale))return;i.cancelable&&i.preventDefault(),this.container.classList.add(this.cn("isDragging"));const v=this.checkBounds(f,m);this.option("rubberband")?("x"!==this.isInfinite&&(v.xDiff>0&&f<0||v.xDiff<0&&f>0)&&(f*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitWidth*v.xDiff))),"y"!==this.isInfinite&&(v.yDiff>0&&m<0||v.yDiff<0&&m>0)&&(m*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitHeight*v.yDiff)))):(v.xDiff&&(f=0),v.yDiff&&(m=0));const y=this.targetScale,w=this.minScale,x=this.maxScale;y<.5*w&&(p=Math.max(p,w)),y>1.5*x&&(p=Math.min(p,x)),"y"===this.lockedAxis&&t(y)===t(w)&&(f=0),"x"===this.lockedAxis&&t(y)===t(w)&&(m=0),this.applyChange({originX:c,originY:d,panX:f,panY:m,scale:p,friction:this.option("dragFriction"),ignoreBounds:!0})}onPointerUp(t,i,s){if(s.length)return this.dragOffset.x=0,this.dragOffset.y=0,void(this.trackingPoints=[]);this.container.classList.remove(this.cn("isDragging")),this.isDragging&&(this.addTrackingPoint(i),this.panOnlyZoomed&&this.contentRect.width-this.contentRect.fitWidth<1&&this.contentRect.height-this.contentRect.fitHeight<1&&(this.trackingPoints=[]),e(t.target,this.content)&&"y"===this.lockedAxis&&(this.trackingPoints=[]),this.emit("touchEnd",t),this.isDragging=!1,this.lockedAxis=!1,this.state!==f.Destroy&&(t.defaultPrevented||this.startDecelAnim()))}startDecelAnim(){var e;const i=this.isScaling;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const t of m)this.velocity[t]=0;this.target.e=this.current.e,this.target.f=this.current.f,w(this.container,"is-scaling"),w(this.container,"is-animating"),this.isTicking=!1;const{trackingPoints:s}=this,n=s[0],o=s[s.length-1];let a=0,r=0,l=0;o&&n&&(a=o.clientX-n.clientX,r=o.clientY-n.clientY,l=o.time-n.time);const h=(null===(e=window.visualViewport)||void 0===e?void 0:e.scale)||1;1!==h&&(a*=h,r*=h);let c=0,d=0,u=0,g=0,p=this.option("decelFriction");const f=this.targetScale;if(l>0){u=Math.abs(a)>3?a/(l/30):0,g=Math.abs(r)>3?r/(l/30):0;const t=this.option("maxVelocity");t&&(u=Math.max(Math.min(u,t),-1*t),g=Math.max(Math.min(g,t),-1*t))}u&&(c=u/(1/(1-p)-1)),g&&(d=g/(1/(1-p)-1)),("y"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"y"===this.lockedAxis&&t(f)===this.minScale)&&(c=u=0),("x"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"x"===this.lockedAxis&&t(f)===this.minScale)&&(d=g=0);const b=this.dragOffset.x,v=this.dragOffset.y,y=this.option("dragMinThreshold")||0;Math.abs(b)<y&&Math.abs(v)<y&&(c=d=0,u=g=0),(f<this.minScale-1e-5||f>this.maxScale+1e-5||i&&!c&&!d)&&(p=.35),this.applyChange({panX:c,panY:d,friction:p}),this.emit("decel",u,g,b,v)}onWheel(t){var e=[-t.deltaX||0,-t.deltaY||0,-t.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const i=Math.max(-1,Math.min(1,e));if(this.emit("wheel",t,i),this.panMode===M)return;if(t.defaultPrevented)return;const s=this.option("wheel");"pan"===s?(t.preventDefault(),this.panOnlyZoomed&&!this.canZoomOut()||this.applyChange({panX:2*-t.deltaX,panY:2*-t.deltaY,bounce:!1})):"zoom"===s&&!1!==this.option("zoom")&&this.zoomWithWheel(t)}onMouseMove(t){this.panWithMouse(t)}onKeydown(t){"Escape"===t.key&&this.toggleFS()}onResize(){this.updateMetrics(),this.checkBounds().inBounds||this.requestTick()}setTransform(){this.emit("beforeTransform");const{current:e,target:i,content:s,contentRect:n}=this,o=Object.assign({},P);for(const s of m){const n="e"==s||"f"===s?S:T;o[s]=t(e[s],n),Math.abs(i[s]-e[s])<("e"==s||"f"===s?.51:.001)&&(e[s]=i[s])}let{a:a,b:r,c:l,d:h,e:c,f:d}=o,u=`matrix(${a}, ${r}, ${l}, ${h}, ${c}, ${d})`,g=s.parentElement instanceof HTMLPictureElement?s.parentElement:s;if(this.option("transformParent")&&(g=g.parentElement||g),g.style.transform===u)return;g.style.transform=u;const{contentWidth:p,contentHeight:f}=this.calculateContentDim();n.width=p,n.height=f,this.emit("afterTransform")}updateMetrics(e=!1){var i;if(!this||this.state===f.Destroy)return;if(this.isContentLoading)return;const s=Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1),{container:n,content:o}=this,a=o instanceof HTMLImageElement,r=n.getBoundingClientRect(),l=getComputedStyle(this.container);let h=r.width*s,c=r.height*s;const d=parseFloat(l.paddingTop)+parseFloat(l.paddingBottom),u=h-(parseFloat(l.paddingLeft)+parseFloat(l.paddingRight)),g=c-d;this.containerRect={width:h,height:c,innerWidth:u,innerHeight:g};let p=this.option("width")||"auto",m=this.option("height")||"auto";"auto"===p&&(p=parseFloat(o.dataset.width||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalWidth:t instanceof SVGElement?t.width.baseVal.value:Math.max(t.offsetWidth,t.scrollWidth),e||0})(o)),"auto"===m&&(m=parseFloat(o.dataset.height||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalHeight:t instanceof SVGElement?t.height.baseVal.value:Math.max(t.offsetHeight,t.scrollHeight),e||0})(o));let b=o.parentElement instanceof HTMLPictureElement?o.parentElement:o;this.option("transformParent")&&(b=b.parentElement||b);const v=b.getAttribute("style")||"";b.style.setProperty("transform","none","important"),a&&(b.style.width="",b.style.height=""),b.offsetHeight;const y=o.getBoundingClientRect();let w=y.width*s,x=y.height*s,P=0,T=0;a&&(Math.abs(p-w)>1||Math.abs(m-x)>1)&&({width:w,height:x,top:P,left:T}=((t,e,i,s)=>{const n=i/s;return n>t/e?(i=t,s=t/n):(i=e*n,s=e),{width:i,height:s,top:.5*(e-s),left:.5*(t-i)}})(w,x,p,m)),this.contentRect=Object.assign(Object.assign({},this.contentRect),{top:y.top-r.top+P,bottom:r.bottom-y.bottom+P,left:y.left-r.left+T,right:r.right-y.right+T,fitWidth:w,fitHeight:x,width:w,height:x,fullWidth:p,fullHeight:m}),b.style.cssText=v,a&&(b.style.width=`${w}px`,b.style.height=`${x}px`),this.setTransform(),!0!==e&&this.emit("refresh"),this.ignoreBounds||(t(this.targetScale)<t(this.minScale)?this.zoomTo(this.minScale,{friction:0}):this.targetScale>this.maxScale?this.zoomTo(this.maxScale,{friction:0}):this.state===f.Init||this.checkBounds().inBounds||this.requestTick()),this.updateControls()}getBounds(){const e=this.option("bounds");if("auto"!==e)return e;const{contentWidth:i,contentHeight:s}=this.calculateContentDim(this.target);let n=0,o=0,a=0,r=0;const l=this.option("infinite");if(!0===l||this.lockedAxis&&l===this.lockedAxis)n=-1/0,a=1/0,o=-1/0,r=1/0;else{let{containerRect:e,contentRect:l}=this,h=t(this.contentRect.fitWidth*this.targetScale,S),c=t(this.contentRect.fitHeight*this.targetScale,S),{innerWidth:d,innerHeight:u}=e;if(this.containerRect.width===h&&(d=e.width),this.containerRect.width===c&&(u=e.height),i>d){a=.5*(i-d),n=-1*a;let t=.5*(l.right-l.left);n+=t,a+=t}if(this.contentRect.fitWidth>d&&i<d&&(n-=.5*(this.contentRect.fitWidth-d),a-=.5*(this.contentRect.fitWidth-d)),s>u){r=.5*(s-u),o=-1*r;let t=.5*(l.bottom-l.top);o+=t,r+=t}this.contentRect.fitHeight>u&&s<u&&(n-=.5*(this.contentRect.fitHeight-u),a-=.5*(this.contentRect.fitHeight-u))}return{x:{min:n,max:a},y:{min:o,max:r}}}updateControls(){const e=this,i=e.container,{panMode:s,contentRect:o,fullScale:a,targetScale:r,coverScale:l,maxScale:h,minScale:c}=e;let d={toggleMax:r-c<.5*(h-c)?h:c,toggleCover:r-c<.5*(l-c)?l:c,toggleZoom:r-c<.5*(a-c)?a:c}[e.option("click")||""]||c,u=e.canZoomIn(),g=e.canZoomOut(),p=s===O&&!!this.option("touch"),f=g&&p;p&&(t(r)<t(c)&&!this.panOnlyZoomed&&(f=!0),(t(o.width,1)>t(o.fitWidth,1)||t(o.height,1)>t(o.fitHeight,1))&&(f=!0)),t(o.width*r,1)<t(o.fitWidth,1)&&(f=!1),s===M&&(f=!1);let m=u&&t(d)>t(r),b=!m&&!f&&g&&t(d)<t(r);n(i,this.cn("canZoomIn"),m),n(i,this.cn("canZoomOut"),b),n(i,this.cn("isDraggable"),f);for(const t of i.querySelectorAll('[data-panzoom-action="zoomIn"]'))u?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="zoomOut"]'))g?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')){u||g?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));const e=t.querySelector("g");e&&(e.style.display=u?"":"none")}}panTo({x:t=this.target.e,y:e=this.target.f,scale:i=this.targetScale,friction:s=this.option("friction"),angle:n=0,originX:o=0,originY:a=0,flipX:r=!1,flipY:l=!1,ignoreBounds:h=!1}){this.state!==f.Destroy&&this.applyChange({panX:t-this.target.e,panY:e-this.target.f,scale:i/this.targetScale,angle:n,originX:o,originY:a,friction:s,flipX:r,flipY:l,ignoreBounds:h})}applyChange({panX:e=0,panY:i=0,scale:s=1,angle:n=0,originX:o=-this.current.e,originY:a=-this.current.f,friction:r=this.option("friction"),flipX:l=!1,flipY:h=!1,ignoreBounds:c=!1,bounce:d=this.option("bounce")}){if(this.state===f.Destroy)return;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.friction=r||0,this.ignoreBounds=c;const{current:u}=this,g=u.e,p=u.f,b=this.getMatrix(this.target);let v=(new DOMMatrix).translate(g,p).translate(o,a).translate(e,i);if(this.option("zoom")){if(!c){const t=this.targetScale,e=this.minScale,i=this.maxScale;t*s<e&&(s=e/t),t*s>i&&(s=i/t)}v=v.scale(s)}v=v.translate(-o,-a).translate(-g,-p).multiply(b),n&&(v=v.rotate(n)),l&&(v=v.scale(-1,1)),h&&(v=v.scale(1,-1));for(const e of m)"e"!==e&&"f"!==e&&(v[e]>this.minScale+1e-5||v[e]<this.minScale-1e-5)?this.target[e]=v[e]:this.target[e]=t(v[e],S);(this.targetScale<this.scale||Math.abs(s-1)>.1||this.panMode===M||!1===d)&&!c&&this.clampTargetBounds(),this.isResting||(this.state=f.Panning,this.requestTick())}stop(t=!1){if(this.state===f.Init||this.state===f.Destroy)return;const e=this.isTicking;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const e of m)this.velocity[e]=0,"current"===t?this.current[e]=this.target[e]:"target"===t&&(this.target[e]=this.current[e]);this.setTransform(),w(this.container,"is-scaling"),w(this.container,"is-animating"),this.isTicking=!1,this.state=f.Ready,e&&(this.emit("endAnimation"),this.updateControls())}requestTick(){this.isTicking||(this.emit("startAnimation"),this.updateControls(),x(this.container,"is-animating"),this.isScaling&&x(this.container,"is-scaling")),this.isTicking=!0,this.rAF||(this.rAF=requestAnimationFrame((()=>this.animate())))}panWithMouse(e,i=this.option("mouseMoveFriction")){if(this.pmme=e,this.panMode!==M||!e)return;if(t(this.targetScale)<=t(this.minScale))return;this.emit("mouseMove",e);const{container:s,containerRect:n,contentRect:o}=this,a=n.width,r=n.height,l=s.getBoundingClientRect(),h=(e.clientX||0)-l.left,c=(e.clientY||0)-l.top;let{contentWidth:d,contentHeight:u}=this.calculateContentDim(this.target);const g=this.option("mouseMoveFactor");g>1&&(d!==a&&(d*=g),u!==r&&(u*=g));let p=.5*(d-a)-h/a*100/100*(d-a);p+=.5*(o.right-o.left);let f=.5*(u-r)-c/r*100/100*(u-r);f+=.5*(o.bottom-o.top),this.applyChange({panX:p-this.target.e,panY:f-this.target.f,friction:i})}zoomWithWheel(e){if(this.state===f.Destroy||this.state===f.Init)return;const i=Date.now();if(i-this.pwt<45)return void e.preventDefault();this.pwt=i;var s=[-e.deltaX||0,-e.deltaY||0,-e.detail||0].reduce((function(t,e){return Math.abs(e)>Math.abs(t)?e:t}));const n=Math.max(-1,Math.min(1,s)),{targetScale:o,maxScale:a,minScale:r}=this;let l=o*(100+45*n)/100;t(l)<t(r)&&t(o)<=t(r)?(this.cwd+=Math.abs(n),l=r):t(l)>t(a)&&t(o)>=t(a)?(this.cwd+=Math.abs(n),l=a):(this.cwd=0,l=Math.max(Math.min(l,a),r)),this.cwd>this.option("wheelLimit")||(e.preventDefault(),t(l)!==t(o)&&this.zoomTo(l,{event:e}))}canZoomIn(){return this.option("zoom")&&(t(this.contentRect.width,1)<t(this.contentRect.fitWidth,1)||t(this.targetScale)<t(this.maxScale))}canZoomOut(){return this.option("zoom")&&t(this.targetScale)>t(this.minScale)}zoomIn(t=1.25,e){this.zoomTo(this.targetScale*t,e)}zoomOut(t=.8,e){this.zoomTo(this.targetScale*t,e)}zoomToFit(t){this.zoomTo("fit",t)}zoomToCover(t){this.zoomTo("cover",t)}zoomToFull(t){this.zoomTo("full",t)}zoomToMax(t){this.zoomTo("max",t)}toggleZoom(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.fullScale-this.minScale)?"full":"fit",t)}toggleMax(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.maxScale-this.minScale)?"max":"fit",t)}toggleCover(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.coverScale-this.minScale)?"cover":"fit",t)}iterateZoom(t){this.zoomTo("next",t)}zoomTo(t=1,{friction:e="auto",originX:i="auto",originY:s="auto",event:n}={}){if(this.isContentLoading||this.state===f.Destroy)return;const{targetScale:o}=this;this.stop();let a=1;if(this.panMode===M&&(n=this.pmme||n),n||"auto"===i||"auto"===s){const t=this.content.getBoundingClientRect(),e=this.container.getBoundingClientRect(),o=n?n.clientX:e.left+.5*e.width,a=n?n.clientY:e.top+.5*e.height;i=o-t.left-.5*t.width,s=a-t.top-.5*t.height}const r=this.fullScale,l=this.maxScale;let h=this.coverScale;"number"==typeof t?a=t/o:("next"===t&&(r-h<.2&&(h=r),t=o<r-1e-5?"full":o<l-1e-5?"max":"fit"),a="full"===t?r/o||1:"cover"===t?h/o||1:"max"===t?l/o||1:1/o||1),e="auto"===e?a>1?.15:.25:e,this.applyChange({scale:a,originX:i,originY:s,friction:e}),n&&this.panMode===M&&this.panWithMouse(n,e)}rotateCCW(){this.applyChange({angle:-90})}rotateCW(){this.applyChange({angle:90})}flipX(){this.applyChange({flipX:!0})}flipY(){this.applyChange({flipY:!0})}fitX(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.height-(e.top+.5*e.fitHeight)-i.f,scale:t.width/e.fitWidth/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}fitY(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.innerHeight-(e.top+.5*e.fitHeight)-i.f,scale:t.height/e.fitHeight/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}toggleFS(){const{container:t}=this,e=this.cn("inFullscreen"),i=this.cn("htmlHasFullscreen");t.classList.toggle(e);const s=t.classList.contains(e);s?(document.documentElement.classList.add(i),document.addEventListener("keydown",this.onKeydown,!0)):(document.documentElement.classList.remove(i),document.removeEventListener("keydown",this.onKeydown,!0)),this.updateMetrics(),this.emit(s?"enterFS":"exitFS")}getMatrix(t=this.current){const{a:e,b:i,c:s,d:n,e:o,f:a}=t;return new DOMMatrix([e,i,s,n,o,a])}reset(t){if(this.state!==f.Init&&this.state!==f.Destroy){this.stop("current");for(const t of m)this.target[t]=P[t];this.target.a=this.minScale,this.target.d=this.minScale,this.clampTargetBounds(),this.isResting||(this.friction=void 0===t?this.option("friction"):t,this.state=f.Panning,this.requestTick())}}destroy(){this.stop(),this.state=f.Destroy,this.detachEvents(),this.detachObserver();const{container:t,content:e}=this,i=this.option("classes")||{};for(const e of Object.values(i))t.classList.remove(e+"");e&&(e.removeEventListener("load",this.onLoad),e.removeEventListener("error",this.onError)),this.detachPlugins()}}Object.defineProperty(R,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:b}),Object.defineProperty(R,"Plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}});const L=function(t,e){let i=!0;return(...s)=>{i&&(i=!1,t(...s),setTimeout((()=>{i=!0}),e))}},A=(t,e)=>{let i=[];return t.childNodes.forEach((t=>{t.nodeType!==Node.ELEMENT_NODE||e&&!t.matches(e)||i.push(t)})),i},C={viewport:null,track:null,enabled:!0,slides:[],axis:"x",transition:"fade",preload:1,slidesPerPage:"auto",initialPage:0,friction:.12,Panzoom:{decelFriction:.12},center:!0,infinite:!0,fill:!0,dragFree:!1,adaptiveHeight:!1,direction:"ltr",classes:{container:"f-carousel",viewport:"f-carousel__viewport",track:"f-carousel__track",slide:"f-carousel__slide",isLTR:"is-ltr",isRTL:"is-rtl",isHorizontal:"is-horizontal",isVertical:"is-vertical",inTransition:"in-transition",isSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide #%d"}};var D;!function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Destroy=2]="Destroy"}(D||(D={}));const j=t=>{if("string"==typeof t||t instanceof HTMLElement)t={html:t};else{const e=t.thumb;void 0!==e&&("string"==typeof e&&(t.thumbSrc=e),e instanceof HTMLImageElement&&(t.thumbEl=e,t.thumbElSrc=e.src,t.thumbSrc=e.src),delete t.thumb)}return Object.assign({html:"",el:null,isDom:!1,class:"",customClass:"",index:-1,dim:0,gap:0,pos:0,transition:!1},t)},F=(t={})=>Object.assign({index:-1,slides:[],dim:0,pos:-1},t);class I extends g{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:t})}attach(){}detach(){}}const H={classes:{list:"f-carousel__dots",isDynamic:"is-dynamic",hasDots:"has-dots",dot:"f-carousel__dot",isBeforePrev:"is-before-prev",isPrev:"is-prev",isCurrent:"is-current",isNext:"is-next",isAfterNext:"is-after-next"},dotTpl:'<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',dynamicFrom:11,maxCount:1/0,minCount:2};class B extends I{constructor(){super(...arguments),Object.defineProperty(this,"isDynamic",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"list",{enumerable:!0,configurable:!0,writable:!0,value:null})}onRefresh(){this.refresh()}build(){let t=this.list;return t||(t=document.createElement("ul"),x(t,this.cn("list")),t.setAttribute("role","tablist"),this.instance.container.appendChild(t),x(this.instance.container,this.cn("hasDots")),this.list=t),t}refresh(){var t;const e=this.instance.pages.length,i=Math.min(2,this.option("minCount")),s=Math.max(2e3,this.option("maxCount")),o=this.option("dynamicFrom");if(e<i||e>s)return void this.cleanup();const a="number"==typeof o&&e>5&&e>=o,r=!this.list||this.isDynamic!==a||this.list.children.length!==e;r&&this.cleanup();const l=this.build();if(n(l,this.cn("isDynamic"),!!a),r)for(let t=0;t<e;t++)l.append(this.createItem(t));let h,c=0;for(const e of[...l.children]){const i=c===this.instance.page;i&&(h=e),n(e,this.cn("isCurrent"),i),null===(t=e.children[0])||void 0===t||t.setAttribute("aria-selected",i?"true":"false");for(const t of["isBeforePrev","isPrev","isNext","isAfterNext"])w(e,this.cn(t));c++}if(h=h||l.firstChild,a&&h){const t=h.previousElementSibling,e=t&&t.previousElementSibling;x(t,this.cn("isPrev")),x(e,this.cn("isBeforePrev"));const i=h.nextElementSibling,s=i&&i.nextElementSibling;x(i,this.cn("isNext")),x(s,this.cn("isAfterNext"))}this.isDynamic=a}createItem(t=0){var e;const s=document.createElement("li");s.setAttribute("role","presentation");const n=i(this.instance.localize(this.option("dotTpl"),[["%d",t+1]]).replace(/\%i/g,t+""));return s.appendChild(n),null===(e=s.children[0])||void 0===e||e.setAttribute("role","tab"),s}cleanup(){this.list&&(this.list.remove(),this.list=null),this.isDynamic=!1,w(this.instance.container,this.cn("hasDots"))}attach(){this.instance.on(["refresh","change"],this.onRefresh)}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup()}}Object.defineProperty(B,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:H});const N="disabled",W="next",X="prev";class Y extends I{constructor(){super(...arguments),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"prev",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"next",{enumerable:!0,configurable:!0,writable:!0,value:null})}onRefresh(){const t=this.instance,e=t.pages.length,i=t.page;if(e<2)return void this.cleanup();this.build();let s=this.prev,n=this.next;s&&n&&(s.removeAttribute(N),n.removeAttribute(N),t.isInfinite||(i<=0&&s.setAttribute(N,""),i>=e-1&&n.setAttribute(N,"")))}createButton(t){const e=this.instance,i=document.createElement("button");i.setAttribute("tabindex","0"),i.setAttribute("title",e.localize(`{{${t.toUpperCase()}}}`)),x(i,this.cn("button")+" "+this.cn(t===W?"isNext":"isPrev"));const s=e.isRTL?t===W?X:W:t;var n;return i.innerHTML=e.localize(this.option(`${s}Tpl`)),i.dataset[`carousel${n=t,n?n.match("^[a-z]")?n.charAt(0).toUpperCase()+n.substring(1):n:""}`]="true",i}build(){let t=this.container;t||(this.container=t=document.createElement("div"),x(t,this.cn("container")),this.instance.container.appendChild(t)),this.next||(this.next=t.appendChild(this.createButton(W))),this.prev||(this.prev=t.appendChild(this.createButton(X)))}cleanup(){this.prev&&this.prev.remove(),this.next&&this.next.remove(),this.container&&this.container.remove(),this.prev=null,this.next=null,this.container=null}attach(){this.instance.on(["refresh","change"],this.onRefresh)}detach(){this.instance.off(["refresh","change"],this.onRefresh),this.cleanup()}}Object.defineProperty(Y,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{classes:{container:"f-carousel__nav",button:"f-button",isNext:"is-next",isPrev:"is-prev"},nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'}});class $ extends I{constructor(){super(...arguments),Object.defineProperty(this,"selectedIndex",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"nav",{enumerable:!0,configurable:!0,writable:!0,value:null})}addAsTargetFor(t){this.target=this.instance,this.nav=t,this.attachEvents()}addAsNavFor(t){this.nav=this.instance,this.target=t,this.attachEvents()}attachEvents(){this.nav&&this.target&&(this.nav.options.initialSlide=this.target.options.initialPage,this.nav.on("ready",this.onNavReady),this.nav.state===D.Ready&&this.onNavReady(this.nav),this.target.on("ready",this.onTargetReady),this.target.state===D.Ready&&this.onTargetReady(this.target))}onNavReady(t){t.on("createSlide",this.onNavCreateSlide),t.on("Panzoom.click",this.onNavClick),t.on("Panzoom.touchEnd",this.onNavTouch),this.onTargetChange()}onTargetReady(t){t.on("change",this.onTargetChange),t.on("Panzoom.refresh",this.onTargetChange),this.onTargetChange()}onNavClick(t,e,i){this.onNavTouch(t,t.panzoom,i)}onNavTouch(t,e,i){var s,n;if(Math.abs(e.dragOffset.x)>3||Math.abs(e.dragOffset.y)>3)return;const o=i.target,{nav:a,target:r}=this;if(!a||!r||!o)return;const l=o.closest("[data-index]");if(i.stopPropagation(),i.preventDefault(),!l)return;const h=parseInt(l.dataset.index||"",10)||0,c=r.getPageForSlide(h),d=a.getPageForSlide(h);a.slideTo(d),r.slideTo(c,{friction:(null===(n=null===(s=this.nav)||void 0===s?void 0:s.plugins)||void 0===n?void 0:n.Sync.option("friction"))||0}),this.markSelectedSlide(h)}onNavCreateSlide(t,e){e.index===this.selectedIndex&&this.markSelectedSlide(e.index)}onTargetChange(){const{target:t,nav:e}=this;if(!t||!e)return;if(e.state!==D.Ready||t.state!==D.Ready)return;const i=t.pages[t.page].slides[0].index,s=e.getPageForSlide(i);this.markSelectedSlide(i),e.slideTo(s)}markSelectedSlide(t){const e=this.nav;e&&e.state===D.Ready&&(this.selectedIndex=t,[...e.slides].map((e=>{e.el&&e.el.classList[e.index===t?"add":"remove"]("is-nav-selected")})))}attach(){const t=this;let e=t.options.target,i=t.options.nav;e?t.addAsNavFor(e):i&&t.addAsTargetFor(i)}detach(){const t=this,e=t.nav,i=t.target;e&&(e.off("ready",t.onNavReady),e.off("createSlide",t.onNavCreateSlide),e.off("Panzoom.click",t.onNavClick),e.off("Panzoom.touchEnd",t.onNavTouch)),t.nav=null,i&&(i.off("ready",t.onTargetReady),i.off("refresh",t.onTargetChange),i.off("change",t.onTargetChange)),t.target=null}}Object.defineProperty($,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{friction:.35}});const Z={Navigation:Y,Dots:B,Sync:$};class V extends p{get axis(){return this.isHorizontal?"e":"f"}get isEnabled(){return this.state===D.Ready}get isInfinite(){let t=!1;const{contentDim:e,viewportDim:i,pages:s,slides:n}=this;return s.length>=2&&e+n[0].dim>=i&&(t=this.option("infinite")),t}get isRTL(){return"rtl"===this.option("direction")}get isHorizontal(){return"x"===this.option("axis")}constructor(t,e={},i={}){if(super(),Object.defineProperty(this,"userOptions",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"userPlugins",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"bp",{enumerable:!0,configurable:!0,writable:!0,value:""}),Object.defineProperty(this,"lp",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:D.Init}),Object.defineProperty(this,"page",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"prevPage",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"viewport",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"track",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"slides",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"pages",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"panzoom",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"inTransition",{enumerable:!0,configurable:!0,writable:!0,value:new Set}),Object.defineProperty(this,"contentDim",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"viewportDim",{enumerable:!0,configurable:!0,writable:!0,value:0}),"string"==typeof t&&(t=document.querySelector(t)),!t||!y(t))throw new Error("No Element found");this.container=t,this.slideNext=L(this.slideNext.bind(this),150),this.slidePrev=L(this.slidePrev.bind(this),150),this.userOptions=e,this.userPlugins=i,queueMicrotask((()=>{this.processOptions()}))}processOptions(){const t=d({},V.defaults,this.userOptions);let e="";const i=t.breakpoints;if(i&&c(i))for(const[s,n]of Object.entries(i))window.matchMedia(s).matches&&c(n)&&(e+=s,d(t,n));e===this.bp&&this.state!==D.Init||(this.bp=e,this.state===D.Ready&&(t.initialSlide=this.pages[this.page].slides[0].index),this.state!==D.Init&&this.destroy(),super.setOptions(t),!1===this.option("enabled")?this.attachEvents():setTimeout((()=>{this.init()}),0))}init(){this.state=D.Init,this.emit("init"),this.attachPlugins(Object.assign(Object.assign({},V.Plugins),this.userPlugins)),this.initLayout(),this.initSlides(),this.updateMetrics(),this.setInitialPosition(),this.initPanzoom(),this.attachEvents(),this.state=D.Ready,this.emit("ready")}initLayout(){const{container:t}=this,e=this.option("classes");x(t,this.cn("container")),n(t,e.isLTR,!this.isRTL),n(t,e.isRTL,this.isRTL),n(t,e.isVertical,!this.isHorizontal),n(t,e.isHorizontal,this.isHorizontal);let i=this.option("viewport")||t.querySelector(`.${e.viewport}`);i||(i=document.createElement("div"),x(i,e.viewport),i.append(...A(t,`.${e.slide}`)),t.prepend(i));let s=this.option("track")||t.querySelector(`.${e.track}`);s||(s=document.createElement("div"),x(s,e.track),s.append(...Array.from(i.childNodes))),s.setAttribute("aria-live","polite"),i.contains(s)||i.prepend(s),this.viewport=i,this.track=s,this.emit("initLayout")}initSlides(){const{track:t}=this;if(t){this.slides=[],[...A(t,`.${this.cn("slide")}`)].forEach((t=>{if(y(t)){const e=j({el:t,isDom:!0,index:this.slides.length});this.slides.push(e),this.emit("initSlide",e,this.slides.length)}}));for(let t of this.option("slides",[])){const e=j(t);e.index=this.slides.length,this.slides.push(e),this.emit("initSlide",e,this.slides.length)}this.emit("initSlides")}}setInitialPage(){let t=0;const e=this.option("initialSlide");t="number"==typeof e?this.getPageForSlide(e):parseInt(this.option("initialPage",0)+"",10)||0,this.page=t}setInitialPosition(){if(!this.track||!this.pages.length)return;const t=this.isHorizontal;let e=this.page;this.pages[e]||(this.page=e=0);const i=this.pages[e].pos*(this.isRTL&&t?1:-1),s=t?`${i}px`:"0",n=t?"0":`${i}px`;this.track.style.transform=`translate3d(${s}, ${n}, 0) scale(1)`,this.option("adaptiveHeight")&&this.setViewportHeight()}initPanzoom(){this.panzoom&&(this.panzoom.destroy(),this.panzoom=null);const t=this.option("Panzoom")||{};this.panzoom=new R(this.viewport,d({},{content:this.track,zoom:!1,panOnlyZoomed:!1,lockAxis:this.isHorizontal?"x":"y",infinite:this.isInfinite,click:!1,dblClick:!1,touch:t=>!(this.pages.length<2&&!t.options.infinite),bounds:()=>this.getBounds(),maxVelocity:t=>Math.abs(t.target[this.axis]-t.current[this.axis])<2*this.viewportDim?100:0},t)),this.panzoom.on("*",((t,e,...i)=>{this.emit(`Panzoom.${e}`,t,...i)})),this.panzoom.on("decel",this.onDecel),this.panzoom.on("refresh",this.onRefresh),this.panzoom.on("beforeTransform",this.onBeforeTransform),this.panzoom.on("endAnimation",this.onEndAnimation)}attachEvents(){const t=this.container;t&&(t.addEventListener("click",this.onClick,{passive:!1,capture:!1}),t.addEventListener("slideTo",this.onSlideTo)),window.addEventListener("resize",this.onResize)}createPages(){let t=[];const{contentDim:e,viewportDim:i}=this;let s=this.option("slidesPerPage");("number"!=typeof s||e<=i)&&(s=1/0);let n=0,o=0,a=0;for(const e of this.slides)(!t.length||o+e.dim>i||a===s)&&(t.push(F()),n=t.length-1,o=0,a=0),t[n].slides.push(e),o+=e.dim+e.gap,a++;return t}processPages(){const e=this.pages,{contentDim:i,viewportDim:s}=this,n=this.option("center"),o=this.option("fill"),a=o&&n&&i>s&&!this.isInfinite;if(e.forEach(((t,e)=>{t.index=e,t.pos=t.slides[0].pos,t.dim=0;for(const[e,i]of t.slides.entries())t.dim+=i.dim,e<t.slides.length-1&&(t.dim+=i.gap);a&&t.pos+.5*t.dim<.5*s?t.pos=0:a&&t.pos+.5*t.dim>=i-.5*s?t.pos=i-s:n&&(t.pos+=-.5*(s-t.dim))})),e.forEach(((e,n)=>{o&&!this.isInfinite&&i>s&&(e.pos=Math.max(e.pos,0),e.pos=Math.min(e.pos,i-s)),e.pos=t(e.pos,1e3),e.dim=t(e.dim,1e3),Math.abs(e.pos)<=.1&&(e.pos=0)})),this.isInfinite)return e;const r=[];let l;return e.forEach((t=>{const e=Object.assign({},t);l&&e.pos===l.pos?(l.dim+=e.dim,l.slides=[...l.slides,...e.slides]):(e.index=r.length,l=e,r.push(e))})),r}getPageFromIndex(t=0){const e=this.pages.length;let i;return t=parseInt((t||0).toString())||0,i=this.isInfinite?(t%e+e)%e:Math.max(Math.min(t,e-1),0),i}getSlideMetrics(e){var i,s;const n=this.isHorizontal?"width":"height";let o=0,a=0,r=e.el;const l=r&&!r.parentNode;if(r?o=parseFloat(r.dataset[n]||"")||0:(r=document.createElement("div"),r.style.visibility="hidden",(this.track||document.body).prepend(r)),x(r,this.cn("slide")+" "+e.class+" "+e.customClass),o)r.style[n]=`${o}px`,r.style["width"===n?"height":"width"]="";else{l&&(this.track||document.body).prepend(r);const t=Math.max(1,(null===(i=window.visualViewport)||void 0===i?void 0:i.scale)||1);o=r.getBoundingClientRect()[n]*t}const h=getComputedStyle(r);return"content-box"===h.boxSizing&&(this.isHorizontal?(o+=parseFloat(h.paddingLeft)||0,o+=parseFloat(h.paddingRight)||0):(o+=parseFloat(h.paddingTop)||0,o+=parseFloat(h.paddingBottom)||0)),a=parseFloat(h[this.isHorizontal?"marginRight":"marginBottom"])||0,l?null===(s=r.parentElement)||void 0===s||s.removeChild(r):e.el||r.remove(),{dim:t(o,1e3),gap:t(a,1e3)}}getBounds(){const{isInfinite:t,isRTL:e,isHorizontal:i,pages:s}=this;let n={min:0,max:0};if(t)n={min:-1/0,max:1/0};else if(s.length){const t=s[0].pos,o=s[s.length-1].pos;n=e&&i?{min:t,max:o}:{min:-1*o,max:-1*t}}return{x:i?n:{min:0,max:0},y:i?{min:0,max:0}:n}}repositionSlides(){let e,{isHorizontal:i,isRTL:s,isInfinite:n,viewport:o,viewportDim:a,contentDim:r,page:l,pages:h,slides:c,panzoom:d}=this,u=0,g=0,p=0,f=0;d?f=-1*d.current[this.axis]:h[l]&&(f=h[l].pos||0),e=i?s?"right":"left":"top",s&&i&&(f*=-1);for(const i of c)i.el?("top"===e?(i.el.style.right="",i.el.style.left=""):i.el.style.top="",i.index!==u?i.el.style[e]=0===g?"":`${t(g,1e3)}px`:i.el.style[e]="",p+=i.dim+i.gap,u++):g+=i.dim+i.gap;if(n&&p&&o){let s=getComputedStyle(o),n="padding",l=i?"Right":"Bottom",h=parseFloat(s[n+(i?"Left":"Top")]);f-=h,a+=h,a+=parseFloat(s[n+l]);for(const i of c)i.el&&(t(i.pos)<t(a)&&t(i.pos+i.dim+i.gap)<t(f)&&t(f)>t(r-a)&&(i.el.style[e]=`${t(g+p,1e3)}px`),t(i.pos+i.gap)>=t(r-a)&&t(i.pos)>t(f+a)&&t(f)<t(a)&&(i.el.style[e]=`-${t(p,1e3)}px`))}let m,b,v=[...this.inTransition];if(v.length>1&&(m=h[v[0]],b=h[v[1]]),m&&b){let i=0;for(const s of c)s.el?this.inTransition.has(s.index)&&m.slides.indexOf(s)<0&&(s.el.style[e]=`${t(i+(m.pos-b.pos),1e3)}px`):i+=s.dim+s.gap}}createSlideEl(t){const{track:e,slides:i}=this;if(!e||!t)return;if(t.el&&t.el.parentNode)return;const s=t.el||document.createElement("div");x(s,this.cn("slide")),x(s,t.class),x(s,t.customClass);const n=t.html;n&&(n instanceof HTMLElement?s.appendChild(n):s.innerHTML=t.html+"");const o=[];i.forEach(((t,e)=>{t.el&&o.push(e)}));const a=t.index;let r=null;if(o.length){r=i[o.reduce(((t,e)=>Math.abs(e-a)<Math.abs(t-a)?e:t))]}const l=r&&r.el&&r.el.parentNode?r.index<t.index?r.el.nextSibling:r.el:null;e.insertBefore(s,e.contains(l)?l:null),t.el=s,this.emit("createSlide",t)}removeSlideEl(t,e=!1){const i=t.el;if(!i||!i.parentNode)return;if(w(i,this.cn("isSelected")),t.isDom&&!e)return i.removeAttribute("aria-hidden"),i.removeAttribute("data-index"),w(i,this.cn("isSelected")),void(i.style.left="");this.emit("removeSlide",t);const s=new CustomEvent("animationend");i.dispatchEvent(s),t.el&&(t.el.remove(),t.el=null)}transitionTo(t=0,e=this.option("transition")){if(!e)return!1;const{pages:i,panzoom:s}=this;t=parseInt((t||0).toString())||0;const n=this.getPageFromIndex(t);if(!s||!i[n]||i.length<2||Math.abs(i[this.page].slides[0].dim-this.viewportDim)>1)return!1;const o=t>this.page?1:-1,a=this.pages[n].pos*(this.isRTL?1:-1);if(this.page===n&&Math.abs(a-s.target[this.axis])<1)return!1;this.clearTransitions();const r=s.isResting;x(this.container,this.cn("inTransition"));const l=this.pages[this.page].slides[0],h=this.pages[n].slides[0];this.inTransition.add(h.index),this.createSlideEl(h);let c=l.el,d=h.el;r||"slide"===e||(e="fadeFast",c=null);const u=this.isRTL?"next":"prev",g=this.isRTL?"prev":"next";return c&&(this.inTransition.add(l.index),l.transition=e,c.addEventListener("animationend",this.onAnimationEnd),c.classList.add(`f-${e}Out`,`to-${o>0?g:u}`)),d&&(h.transition=e,d.addEventListener("animationend",this.onAnimationEnd),d.classList.add(`f-${e}In`,`from-${o>0?u:g}`)),s.panTo({x:this.isHorizontal?a:0,y:this.isHorizontal?0:a,friction:0}),this.onChange(n),!0}manageSlideVisiblity(){const t=new Set,e=new Set,i=this.getVisibleSlides(parseFloat(this.option("preload",0)+"")||0);for(const s of this.slides)i.has(s)?t.add(s):e.add(s);for(const e of this.inTransition)t.add(this.slides[e]);for(const e of t)this.createSlideEl(e),this.lazyLoadSlide(e);for(const i of e)t.has(i)||this.removeSlideEl(i);this.markSelectedSlides(),this.repositionSlides()}markSelectedSlides(){if(!this.pages[this.page]||!this.pages[this.page].slides)return;const t="aria-hidden";let e=this.cn("isSelected");if(e)for(const i of this.slides)i.el&&(i.el.dataset.index=`${i.index}`,this.pages[this.page].slides.includes(i)?(i.el.classList.contains(e)||(x(i.el,e),this.emit("selectSlide",i)),i.el.removeAttribute(t)):(i.el.classList.contains(e)&&(w(i.el,e),this.emit("unselectSlide",i)),i.el.setAttribute(t,"true")))}flipInfiniteTrack(){const t=this.panzoom;if(!t||!this.isInfinite)return;const e="x"===this.option("axis")?"e":"f",{viewportDim:i,contentDim:s}=this;let n=t.current[e],o=t.target[e]-n,a=0,r=.5*i,l=s;this.isRTL&&this.isHorizontal?(n<-r&&(a=-1,n+=l),n>l-r&&(a=1,n-=l)):(n>r&&(a=1,n-=l),n<-l+r&&(a=-1,n+=l)),a&&(t.current[e]=n,t.target[e]=n+o)}lazyLoadSlide(t){const e=this,s=t&&t.el;if(!s)return;const n=new Set,o="f-fadeIn";s.querySelectorAll("[data-lazy-srcset]").forEach((t=>{t instanceof HTMLImageElement&&n.add(t)}));let a=Array.from(s.querySelectorAll("[data-lazy-src]"));s.dataset.lazySrc&&a.push(s),a.map((t=>{t instanceof HTMLImageElement?n.add(t):y(t)&&(t.style.backgroundImage=`url('${t.dataset.lazySrc||""}')`,delete t.dataset.lazySrc)}));const r=(t,i,s)=>{s&&(s.remove(),s=null),i.complete&&(i.classList.add(o),setTimeout((()=>{i.classList.remove(o)}),350),i.style.display=""),this.option("adaptiveHeight")&&t.el&&this.pages[this.page].slides.indexOf(t)>-1&&(e.updateMetrics(),e.setViewportHeight()),this.emit("load",t)};for(const e of n){let s=null;e.src=e.dataset.lazySrcset||e.dataset.lazySrc||"",delete e.dataset.lazySrc,delete e.dataset.lazySrcset,e.style.display="none",e.addEventListener("error",(()=>{r(t,e,s)})),e.addEventListener("load",(()=>{r(t,e,s)})),setTimeout((()=>{e.parentNode&&t.el&&(e.complete?r(t,e,s):(s=i(v),e.parentNode.insertBefore(s,e)))}),300)}}onAnimationEnd(t){var e;const i=t.target,s=i?parseInt(i.dataset.index||"",10)||0:-1,n=this.slides[s],o=t.animationName;if(!i||!n||!o)return;const a=!!this.inTransition.has(s)&&n.transition;a&&o.substring(0,a.length+2)===`f-${a}`&&this.inTransition.delete(s),this.inTransition.size||this.clearTransitions(),s===this.page&&(null===(e=this.panzoom)||void 0===e?void 0:e.isResting)&&this.emit("settle")}onDecel(t,e=0,i=0,s=0,n=0){const{isRTL:o,isHorizontal:a,axis:r,pages:l}=this,h=l.length,c=Math.abs(Math.atan2(i,e)/(Math.PI/180));let d=0;if(d=c>45&&c<135?a?0:i:a?e:0,!h)return;const u=this.option("dragFree");let g=this.page,p=o&&a?1:-1;const f=t.target[r]*p,m=t.current[r]*p;let{pageIndex:b}=this.getPageFromPosition(f),{pageIndex:v}=this.getPageFromPosition(m);u?this.onChange(b):(Math.abs(d)>5?(l[g].dim<document.documentElement["client"+(this.isHorizontal?"Width":"Height")]-1&&(g=v),g=o&&a?d<0?g-1:g+1:d<0?g+1:g-1):g=0===s&&0===n?g:v,this.slideTo(g,{transition:!1,friction:t.option("decelFriction")}))}onClick(t){const e=t.target,i=e&&y(e)?e.dataset:null;let s,n;i&&(void 0!==i.carouselPage?(n="slideTo",s=i.carouselPage):void 0!==i.carouselNext?n="slideNext":void 0!==i.carouselPrev&&(n="slidePrev")),n?(t.preventDefault(),t.stopPropagation(),e&&!e.hasAttribute("disabled")&&this[n](s)):this.emit("click",t)}onSlideTo(t){const e=t.detail||0;this.slideTo(this.getPageForSlide(e),{friction:0})}onChange(t,e=0){const i=this.page;this.prevPage=i,this.page=t,this.option("adaptiveHeight")&&this.setViewportHeight(),t!==i&&(this.markSelectedSlides(),this.emit("change",t,i,e))}onRefresh(){let t=this.contentDim,e=this.viewportDim;this.updateMetrics(),this.contentDim===t&&this.viewportDim===e||this.slideTo(this.page,{friction:0,transition:!1})}onResize(){this.option("breakpoints")&&this.processOptions()}onBeforeTransform(t){this.lp!==t.current[this.axis]&&(this.flipInfiniteTrack(),this.manageSlideVisiblity()),this.lp=t.current.e}onEndAnimation(){this.inTransition.size||this.emit("settle")}reInit(t=null,e=null){this.destroy(),this.state=D.Init,this.userOptions=t||this.userOptions,this.userPlugins=e||this.userPlugins,this.processOptions()}slideTo(t=0,{friction:e=this.option("friction"),transition:i=this.option("transition")}={}){if(this.state===D.Destroy)return;const{axis:s,isHorizontal:n,isRTL:o,pages:a,panzoom:r}=this,l=a.length,h=o&&n?1:-1;if(!r||!l)return;if(this.transitionTo(t,i))return;const c=this.getPageFromIndex(t);let d=a[c].pos;if(this.isInfinite){const e=this.contentDim,i=r.target[s]*h;if(2===l)d+=e*Math.floor(parseFloat(t+"")/2);else{const t=i;d=[d,d-e,d+e].reduce((function(e,i){return Math.abs(i-t)<Math.abs(e-t)?i:e}))}}d*=h,Math.abs(r.target[s]-d)<.1||(r.panTo({x:n?d:0,y:n?0:d,friction:e}),this.onChange(c))}slideToClosest(t){if(this.panzoom){const{pageIndex:e}=this.getPageFromPosition(this.panzoom.current[this.isHorizontal?"e":"f"]);this.slideTo(e,t)}}slideNext(){this.slideTo(this.page+1)}slidePrev(){this.slideTo(this.page-1)}clearTransitions(){this.inTransition.clear(),w(this.container,this.cn("inTransition"));const t=["to-prev","to-next","from-prev","from-next"];for(const e of this.slides){const i=e.el;if(i){i.removeEventListener("animationend",this.onAnimationEnd),i.classList.remove(...t);const s=e.transition;s&&i.classList.remove(`f-${s}Out`,`f-${s}In`)}}this.manageSlideVisiblity()}prependSlide(t){var e,i;let s=Array.isArray(t)?t:[t];for(const t of s.reverse())this.slides.unshift(j(t));for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;const n=(null===(e=this.pages[this.page])||void 0===e?void 0:e.pos)||0;this.page+=s.length,this.updateMetrics();const o=(null===(i=this.pages[this.page])||void 0===i?void 0:i.pos)||0;if(this.panzoom){const t=this.isRTL?n-o:o-n;this.panzoom.target.e-=t,this.panzoom.current.e-=t,this.panzoom.requestTick()}}appendSlide(t){let e=Array.isArray(t)?t:[t];for(const t of e){const e=j(t);e.index=this.slides.length,this.slides.push(e),this.emit("initSlide",e,this.slides.length)}this.updateMetrics()}removeSlide(t){const e=this.slides.length;t=(t%e+e)%e,this.removeSlideEl(this.slides[t],!0),this.slides.splice(t,1);for(let t=0;t<this.slides.length;t++)this.slides[t].index=t;this.updateMetrics(),this.slideTo(this.page,{friction:0,transition:!1})}updateMetrics(){const{panzoom:e,viewport:i,track:s,isHorizontal:n}=this;if(!s)return;const o=n?"width":"height",a=n?"offsetWidth":"offsetHeight";if(i){let e=Math.max(i[a],t(i.getBoundingClientRect()[o],1e3)),s=getComputedStyle(i),r="padding",l=n?"Right":"Bottom";e-=parseFloat(s[r+(n?"Left":"Top")])+parseFloat(s[r+l]),this.viewportDim=e}let r,l=this.pages.length,h=0;for(const[e,i]of this.slides.entries()){let s=0,n=0;!i.el&&r?(s=r.dim,n=r.gap):(({dim:s,gap:n}=this.getSlideMetrics(i)),r=i),s=t(s,1e3),n=t(n,1e3),i.dim=s,i.gap=n,i.pos=h,h+=s,(this.isInfinite||e<this.slides.length-1)&&(h+=n)}const c=this.contentDim;h=t(h,1e3),this.contentDim=h,e&&(e.contentRect[o]=h,e.contentRect["e"===this.axis?"fullWidth":"fullHeight"]=h),this.pages=this.createPages(),this.pages=this.processPages(),this.state===D.Init&&this.setInitialPage(),this.page=Math.max(0,Math.min(this.page,this.pages.length-1)),e&&l===this.pages.length&&Math.abs(h-c)>.5&&(e.target[this.axis]=-1*this.pages[this.page].pos,e.current[this.axis]=-1*this.pages[this.page].pos,e.stop()),this.manageSlideVisiblity(),this.emit("refresh")}getProgress(e,i=!1){void 0===e&&(e=this.page);const s=this,n=s.panzoom,o=s.pages[e]||0;if(!o||!n)return 0;let a=-1*n.current.e,r=s.contentDim;var l=[t((a-o.pos)/(1*o.dim),1e3),t((a+r-o.pos)/(1*o.dim),1e3),t((a-r-o.pos)/(1*o.dim),1e3)].reduce((function(t,e){return Math.abs(e)<Math.abs(t)?e:t}));return i?l:Math.max(-1,Math.min(1,l))}setViewportHeight(){const{page:t,pages:e,viewport:i,isHorizontal:s}=this;if(!i||!e[t])return;let n=0;s&&this.track&&(this.track.style.height="auto",e[t].slides.forEach((t=>{t.el&&(n=Math.max(n,t.el.offsetHeight))}))),i.style.height=n?`${n}px`:""}getPageForSlide(t){for(const e of this.pages)for(const i of e.slides)if(i.index===t)return e.index;return-1}getVisibleSlides(t=0){var e;const i=new Set;let{contentDim:s,viewportDim:n,pages:o,page:a}=this;s=s+(null===(e=this.slides[this.slides.length-1])||void 0===e?void 0:e.gap)||0;let r=0;r=this.panzoom?-1*this.panzoom.current[this.axis]:o[a]&&o[a].pos||0,this.isInfinite&&(r-=Math.floor(r/s)*s),this.isRTL&&this.isHorizontal&&(r*=-1);const l=r-n*t,h=r+n*(t+1),c=this.isInfinite?[-1,0,1]:[0];for(const t of this.slides)for(const e of c){const n=t.pos+e*s,o=t.pos+t.dim+t.gap+e*s;n<h&&o>l&&i.add(t)}return i}getPageFromPosition(t){const{viewportDim:e,contentDim:i}=this,s=this.pages.length,n=this.slides.length,o=this.slides[n-1];let a=0,r=0,l=0;const h=this.option("center");h&&(t+=.5*e),this.isInfinite||(t=Math.max(this.slides[0].pos,Math.min(t,o.pos)));const c=i+o.gap;l=Math.floor(t/c)||0,t-=l*c;let d=o,u=this.slides.find((e=>{const i=t+(d&&!h?.5*d.dim:0);return d=e,e.pos<=i&&e.pos+e.dim+e.gap>i}));return u||(u=o),r=this.getPageForSlide(u.index),a=r+l*s,{page:a,pageIndex:r}}destroy(){if([D.Destroy].includes(this.state))return;this.state=D.Destroy;const{container:t,viewport:e,track:i,slides:s,panzoom:n}=this,o=this.option("classes");t.removeEventListener("click",this.onClick,{passive:!1,capture:!1}),t.removeEventListener("slideTo",this.onSlideTo),window.removeEventListener("resize",this.onResize),n&&(n.destroy(),this.panzoom=null),s&&s.forEach((t=>{this.removeSlideEl(t)})),this.detachPlugins(),e&&e.offsetParent&&i&&i.offsetParent&&e.replaceWith(...i.childNodes);for(const[e,i]of Object.entries(o))"container"!==e&&i&&t.classList.remove(i);this.track=null,this.viewport=null,this.page=0,this.slides=[];const a=this.events.get("ready");this.events=new Map,a&&this.events.set("ready",a)}}Object.defineProperty(V,"Panzoom",{enumerable:!0,configurable:!0,writable:!0,value:R}),Object.defineProperty(V,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:C}),Object.defineProperty(V,"Plugins",{enumerable:!0,configurable:!0,writable:!0,value:Z});

;// CONCATENATED MODULE: ./node_modules/@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js
const carousel_autoplay_esm_e=(t,...s)=>{const n=s.length;for(let i=0;i<n;i++){const n=s[i]||{};Object.entries(n).forEach((([s,n])=>{const i=Array.isArray(n)?[]:{};var o;t[s]||Object.assign(t,{[s]:i}),"object"==typeof(o=n)&&null!==o&&o.constructor===Object&&"[object Object]"===Object.prototype.toString.call(o)?Object.assign(t[s],carousel_autoplay_esm_e(i,n)):Array.isArray(n)?Object.assign(t,{[s]:[...n]}):Object.assign(t,{[s]:n})}))}return t},carousel_autoplay_esm_t=function(e,t){return e.split(".").reduce(((e,t)=>"object"==typeof e?e[t]:void 0),t)};class carousel_autoplay_esm_s{constructor(e={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(e);for(const e of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))e.startsWith("on")&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}setOptions(t){this.options=t?carousel_autoplay_esm_e({},this.constructor.defaults,t):{};for(const[e,t]of Object.entries(this.option("on")||{}))this.on(e,t)}option(e,...s){let n=carousel_autoplay_esm_t(e,this.options);return n&&"function"==typeof n&&(n=n.call(this,this,...s)),n}optionFor(e,s,n,...i){let o=carousel_autoplay_esm_t(s,e);var r;"string"!=typeof(r=o)||isNaN(r)||isNaN(parseFloat(r))||(o=parseFloat(o)),"true"===o&&(o=!0),"false"===o&&(o=!1),o&&"function"==typeof o&&(o=o.call(this,this,e,...i));let a=carousel_autoplay_esm_t(s,this.options);return a&&"function"==typeof a?o=a.call(this,this,e,...i,o):void 0===o&&(o=a),void 0===o?n:o}cn(e){const t=this.options.classes;return t&&t[e]||""}localize(e,t=[]){e=String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g,((e,t,s)=>{let n="";return s?n=this.option(`${t[0]+t.toLowerCase().substring(1)}.l10n.${s}`):t&&(n=this.option(`l10n.${t}`)),n||(n=e),n}));for(let s=0;s<t.length;s++)e=e.split(t[s][0]).join(t[s][1]);return e=e.replace(/\{\{(.*?)\}\}/g,((e,t)=>t))}on(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),this.events||(this.events=new Map),s.forEach((e=>{let s=this.events.get(e);s||(this.events.set(e,[]),s=[]),s.includes(t)||s.push(t),this.events.set(e,s)}))}off(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),s.forEach((e=>{const s=this.events.get(e);if(Array.isArray(s)){const e=s.indexOf(t);e>-1&&s.splice(e,1)}}))}emit(e,...t){[...this.events.get(e)||[]].forEach((e=>e(this,...t))),"*"!==e&&this.emit("*",e,...t)}}Object.defineProperty(carousel_autoplay_esm_s,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.22"}),Object.defineProperty(carousel_autoplay_esm_s,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class carousel_autoplay_esm_n extends carousel_autoplay_esm_s{constructor(e,t){super(t),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:e})}attach(){}detach(){}}const carousel_autoplay_esm_i=e=>`${e||""}`.split(" ").filter((e=>!!e)),carousel_autoplay_esm_o=(e,t)=>{e&&carousel_autoplay_esm_i(t).forEach((t=>{e.classList.add(t)}))},carousel_autoplay_esm_r="play",carousel_autoplay_esm_a="pause",carousel_autoplay_esm_l="ready";class carousel_autoplay_esm_c extends carousel_autoplay_esm_n{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:carousel_autoplay_esm_l}),Object.defineProperty(this,"inHover",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null})}get isActive(){return this.state!==carousel_autoplay_esm_l}onReady(e){this.option("autoStart")&&(e.isInfinite||e.page<e.pages.length-1)&&this.start()}onChange(){var e;(null===(e=this.instance.panzoom)||void 0===e?void 0:e.isResting)||(this.removeProgressBar(),this.pause())}onSettle(){this.resume()}onVisibilityChange(){"visible"===document.visibilityState?this.resume():this.pause()}onMouseEnter(){this.inHover=!0,this.pause()}onMouseLeave(){var e;this.inHover=!1,(null===(e=this.instance.panzoom)||void 0===e?void 0:e.isResting)&&this.resume()}onTimerEnd(){const e=this.instance;"play"===this.state&&(e.isInfinite||e.page!==e.pages.length-1?e.slideNext():e.slideTo(0))}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}createProgressBar(){var e;if(!this.option("showProgress"))return null;this.removeProgressBar();const t=this.instance,s=(null===(e=t.pages[t.page])||void 0===e?void 0:e.slides)||[];let n=this.option("progressParentEl");if(n||(n=(1===s.length?s[0].el:null)||t.viewport),!n)return null;const i=document.createElement("div");return carousel_autoplay_esm_o(i,"f-progress"),n.prepend(i),this.progressBar=i,i.offsetHeight,i}set(){const e=this,t=e.instance;if(t.pages.length<2)return;if(e.timer)return;const s=e.option("timeout");e.state=carousel_autoplay_esm_r,carousel_autoplay_esm_o(t.container,"has-autoplay");let n=e.createProgressBar();n&&(n.style.transitionDuration=`${s}ms`,n.style.transform="scaleX(1)"),e.timer=setTimeout((()=>{e.timer=null,e.inHover||e.onTimerEnd()}),s),e.emit("set")}clear(){const e=this;e.timer&&(clearTimeout(e.timer),e.timer=null),e.removeProgressBar()}start(){const e=this;if(e.set(),e.state!==carousel_autoplay_esm_l){if(e.option("pauseOnHover")){const t=e.instance.container;t.addEventListener("mouseenter",e.onMouseEnter,!1),t.addEventListener("mouseleave",e.onMouseLeave,!1)}document.addEventListener("visibilitychange",e.onVisibilityChange,!1),e.emit("start")}}stop(){const e=this,t=e.state,s=e.instance.container;var n,o;e.clear(),e.state=carousel_autoplay_esm_l,s.removeEventListener("mouseenter",e.onMouseEnter,!1),s.removeEventListener("mouseleave",e.onMouseLeave,!1),document.removeEventListener("visibilitychange",e.onVisibilityChange,!1),o="has-autoplay",(n=s)&&carousel_autoplay_esm_i(o).forEach((e=>{n.classList.remove(e)})),t!==carousel_autoplay_esm_l&&e.emit("stop")}pause(){const e=this;e.state===carousel_autoplay_esm_r&&(e.state=carousel_autoplay_esm_a,e.clear(),e.emit(carousel_autoplay_esm_a))}resume(){const e=this,t=e.instance;if(t.isInfinite||t.page!==t.pages.length-1)if(e.state!==carousel_autoplay_esm_r){if(e.state===carousel_autoplay_esm_a&&!e.inHover){const t=new Event("resume",{bubbles:!0,cancelable:!0});e.emit("resume",t),t.defaultPrevented||e.set()}}else e.set();else e.stop()}toggle(){this.state===carousel_autoplay_esm_r||this.state===carousel_autoplay_esm_a?this.stop():this.start()}attach(){const e=this,t=e.instance;t.on("ready",e.onReady),t.on("Panzoom.startAnimation",e.onChange),t.on("Panzoom.endAnimation",e.onSettle),t.on("Panzoom.touchMove",e.onChange)}detach(){const e=this,t=e.instance;t.off("ready",e.onReady),t.off("Panzoom.startAnimation",e.onChange),t.off("Panzoom.endAnimation",e.onSettle),t.off("Panzoom.touchMove",e.onChange),e.stop()}}Object.defineProperty(carousel_autoplay_esm_c,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{autoStart:!0,pauseOnHover:!0,progressParentEl:null,showProgress:!0,timeout:3e3}});

;// CONCATENATED MODULE: ./src/js/modules/fancyapps.js



const fRU = {
	NEXT: " ",
	PREV: " ",
	GOTO: "Перейти к слайду #%d",
};

V.defaults = {
	...V.defaults,
	infinite: false,
	l10n: fRU,
	// adaptiveHeight: true,
};

addEventListener("DOMContentLoaded", () => {
	const carousels = document.querySelectorAll('[data-carousel="carousel"]');
	carousels.forEach((el) => {
		if (el) {
			let options = {};
			let autoplay = {};
			// console.log(Object.keys( el.dataset ));

			if (el.dataset.options) {
				options = JSON.parse(el.dataset.options);
			}

			if (el.dataset.autoplay) {
				autoplay = Object.assign(autoplay, { Autoplay: { timeout: parseInt(el.dataset.autoplay) } });
			}

			let opt = Object.assign(options, autoplay);

			if (Object.keys(autoplay).length > 0 && autoplay.constructor === Object) {
				new V(el, opt, { Autoplay: carousel_autoplay_esm_c });
			} else {
				new V(el, opt);
			}
		}
	});
});

;// CONCATENATED MODULE: ./src/js/app.js






addEventListener("DOMContentLoaded", () => {
	stickyHeader();
	// functions.isTouchEnabled();
	// functions.dropdownByTouch();
	mobileCatalog();
	searchForm();
	closeModal();
	accordion();
	useDynamicAdapt();
});

/******/ })()
;