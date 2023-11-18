/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/common-global.js
if (!window.overlay) {
	window.overlay = (action, origin = false) => {
		const body = document.body,
			sw = getScrollbarWidth(),
			containers = document.querySelectorAll(".container"),
			isActiveClass = "is-active";
		if (action) {
			overlay(0);
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
				c.style.paddingRight = "";
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
	};
}

if (!window.getScrollbarWidth) {
	window.getScrollbarWidth = () => {
		let div = document.createElement("div");
		div.style.overflowY = "scroll";
		div.style.width = "50px";
		div.style.height = "50px";
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	};
}

if (!window.getRandomStr) {
	window.getRandomStr = (len) => {
		let res = "",
			symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
		len = len || Math.floor(Math.random() * symbols.length);
		for (let i = 0; i < len; i++) res += symbols[Math.floor(Math.random() * symbols.length)];
		return res;
	};
}

if (!window.mobileCheck) {
	window.mobileCheck = (w) => {
		if (!w) return;
		let mq = window.matchMedia(`(max-width: ${w}px)`);
		return mq.matches ? true : false;
	};
}

if (!window.fetchLoader) {
	window.fetchLoader = (where, action, options = {}) => {
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
	};
}

if (!window.btnLoader) {
	window.btnLoader = (where, action = false) => {
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
	};
}

if (!window.showSkeleton) {
	window.showSkeleton = (where, tpl) => {
		if (!where || !tpl) return;
		const template = document.getElementById(tpl);
		if (!template) return;
		where.innerHTML = "";
		where.appendChild(template.content.cloneNode(true));
	};
}

if (!window.setWindowLocation) {
	window.setWindowLocation = (url) => {
		// TODO @ prod:
		// window.history.pushState("", "", url);
		window.history.pushState("", "", url.replace("https://deviart.ru/zamm/", ""));
	};
}

if (!window.catalogItemGalleriesInit) {
	window.catalogItemGalleriesInit = (item = false) => {
		const isActiveClass = "is-active";

		if (item) {
			item.querySelector(".item__gallery-item").classList.add(isActiveClass);
			return;
		}

		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel");

		galleryItems.forEach((el) => {
			if (!el) return;

			let items = el.querySelectorAll(".item");
			items.forEach((i) => {
				i.querySelector(".item__gallery-item").classList.add(isActiveClass);
			});
		});
	};
}

if (!window.catalogItemGalleryHandler) {
	window.catalogItemGalleryHandler = () => {
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
	};
}

if (!window.isPropOverflowX) {
	window.isPropOverflowX = (el) => {
		return el ? el.scrollWidth > el.clientWidth : false;
	};
}

;// CONCATENATED MODULE: ./src/js/modules/common.js
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

function hamburgerMenu() {
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
			// overlay(0);
			backBtn.classList.remove(isActiveClass);
			subMenuWrapper.classList.remove(isActiveClass);
			navMenu.classList.remove(hideNavClass);
			subMenuWrapper.innerHTML = "";
		} else {
			// overlay(1);
		}
	});

	window.addEventListener("resize", () => {
		if (menuToggler.checked) {
			menuToggler.click();
		}
	});

	document.addEventListener("click", (e) => {
		if (!navMenu.contains(e.target) && menuToggler.checked) {
			menuToggler.click();
		}
	});
}

function modalHandler() {
	let createModal = () => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`);
		if (modalExist) modalExist.remove();

		const modal = document.createElement("div"),
			btn = document.createElement("button");

		modal.classList.add(modalClass, "scrollblock");
		btn.classList.add("btn", "btn_close", "btn_close-modal", "js-modal-close");
		btn.ariaLabel = "Закрыть";
		modal.appendChild(btn);
		document.body.appendChild(modal);
		return modal;
	};

	let fetchByUrl = async (url, origin) => {
		if (!url) return;

		let width = origin.dataset.boxWidth || false;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				const key = getRandomStr(8);
				setModalContent(result.content, width, origin, key);
			} else {
				console.log(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.log(e);
			return;
		}
	};

	let setModalContent = (content, width = false, origin = false, key = false) => {
		const modalWrapper = createModal(),
			menuToggler = document.getElementById("menu-toggle"),
			isActiveClass = "is-active";

		if (width) modalWrapper.style.maxWidth = `${parseInt(width)}px`;
		modalWrapper.insertAdjacentHTML("beforeend", content);

		reinitModalResults(modalWrapper);

		setTimeout(() => {
			menuToggler.checked = false;
			modalWrapper.classList.add(isActiveClass);
			overlay(1);
		}, 10);

		if (origin && key) {
			origin.dataset.storageKey = key;
			localStorage.setItem(key, content);
		}
	};

	let reinitModalResults = (target) => {
		inputFetch(target);
		inputQuickSearch(target);
	};

	document.addEventListener("click", (e) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`),
			modalShow = e.target.closest(".js-modal-show"),
			modalClose = e.target.closest([".js-modal-close", ".overlay"]);

		if (modalShow) {
			const url = modalShow.dataset.url,
				width = modalShow.dataset.boxWidth,
				storageKey = modalShow.dataset.storageKey;

			if (!url) return;

			if (storageKey) {
				const content = localStorage.getItem(storageKey);
				if (content) {
					setModalContent(content, width);
					return;
				}
			}
			fetchByUrl(url, modalShow);
		}

		if (modalExist && (!modalExist.contains(e.target) || modalClose)) {
			modalExist.remove();
			overlay(0);
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

function inputFetch(el = false) {
	const inputs = el ? el.querySelectorAll("[data-query='true']") : document.querySelectorAll("[data-query='true']"),
		queryWrapperClass = "js-query-wrapper",
		queryResultClass = "js-query-result",
		minQueryLen = 2;

	let fetchByQuery = async (input) => {
		let url = input.dataset.url,
			query = { [input.name]: input.value },
			onFocus = input.dataset.onFocus,
			results = input.closest(`.${queryWrapperClass}`).querySelector(`.${queryResultClass}`);

		if (!url) return;

		let amp = url.includes("?") ? "&" : "?",
			queryStr = amp + new URLSearchParams(query).toString();

		url += queryStr;

		if (input.value.length >= minQueryLen || (onFocus && input.value.length == 0)) {
			try {
				let response = await fetch(url);
				if (!response.ok) {
					return;
				}
				let result = await response.json();
				if (result.status === true) {
					results.innerHTML = result.content;
				} else {
					console.log(`Error: ${JSON.stringify(result)}`);
				}
			} catch (e) {
				console.log(e);
				return;
			}
		}
	};

	inputs.forEach((input) => {
		["focus", "input"].forEach((evt) =>
			input.addEventListener(evt, () => {
				fetchByQuery(input);
			})
		);
	});
}

function inputQuickSearch(el = false) {
	const inputs = el ? el.querySelectorAll("[data-quick-search='true']") : document.querySelectorAll("[data-quick-search='true']");

	let quickSearch = (input) => {
		let target = input.dataset.target,
			filter = input.value.toUpperCase(),
			area = document.querySelector(`.${target}`),
			items = area.querySelectorAll("a", "span"),
			text = "";

		if (!area) return;

		if (items.length) {
			for (let i = 0; i < items.length; i++) {
				text = items[i].textContent || items[i].innerText;
				if (text.toUpperCase().indexOf(filter) > -1) {
					items[i].style.display = "";
				} else {
					items[i].style.display = "none";
				}
			}
		}
	};

	inputs.forEach((input) => {
		["input"].forEach((evt) =>
			input.addEventListener(evt, () => {
				quickSearch(input);
			})
		);
	});
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

function filterCollapseHandler() {
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

;// CONCATENATED MODULE: ./src/js/modules/common-dynamicAdapt.js
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

;// CONCATENATED MODULE: ./src/js/modules/common-cookies.js
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

if (cookieForm && cookieAccept) {
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

if (headerAlert && closeAlert) {
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

;// CONCATENATED MODULE: ./src/js/common.js





addEventListener("DOMContentLoaded", () => {
	catalogItemGalleriesInit();
	catalogItemGalleryHandler();
	useDynamicAdapt();

	stickyHeader();
	hamburgerMenu();
	modalHandler();
	sectionClose();
	searchForm();
	inputFetch();
	inputQuickSearch();
	accordion();
	accordionFooter();
	dropdownClose();
	dropdownShow();
});

/******/ })()
;