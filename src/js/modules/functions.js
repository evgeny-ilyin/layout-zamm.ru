import { productBlockCollapseHandler, catalogItemGalleriesInit, catalogItemGallery } from "./product.js";
import { carouselsInit } from "./fancyapps.js";

export function stickyHeader() {
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

// export function sectionShow() {
// 	document.addEventListener("click", (e) => {
// 		const el = e.target.closest(".js-show"),
// 			isActiveClass = "is-active";
// 		if (!el) return;
// 		const target = el.dataset.target;
// 		if (target) {
// 			overlay(1, target);
// 			document.querySelector(`.${target}`).classList.add(isActiveClass);
// 		}
// 	});
// }

export function sectionClose() {
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

export function modalHandler() {
	let createModal = () => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`);
		if (modalExist) modalExist.remove();

		const modal = document.createElement("div"),
			btn = document.createElement("button");

		modal.classList.add(modalClass, "scrollblock");
		btn.classList.add("btn", "btn_close", "btn_close-modal", "js-modal-close");
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
		userInputQuery(target);
		userInputQuickSearch(target);
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

// export function overlayClick() {
// 	document.addEventListener("click", (e) => {
// 		const o = e.target,
// 			isActiveClass = "is-active";
// 		if (o.classList.contains("overlay")) {
// 			const origin = document.querySelectorAll(`.${o.dataset.origin}`);
// 			origin.forEach((el) => {
// 				el.classList.remove(isActiveClass);
// 			});
// 			overlay(0);
// 		}
// 	});
// }

export function dropdownShow() {
	const dds = document.querySelectorAll(".js-drop-down"),
		isActiveClass = "is-active";
	dds.forEach((dd) => {
		dd.addEventListener("click", (e) => {
			e.stopPropagation();
			dd.classList.toggle(isActiveClass);
		});
	});
}

export function dropdownClose() {
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

export function mobileCheck(w) {
	if (!w) return;
	let mq = window.matchMedia(`(max-width: ${w}px)`);
	return mq.matches ? true : false;
}

export function hamburgerMenu() {
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

export function searchForm() {
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

export function collapseHandler() {
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

export function accordion() {
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

export function accordionFooter() {
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

export function tabsInit() {
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

export function tabsHandler(observe) {
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

export function ideaPopupShow() {
	const isActiveClass = "is-active";

	let ideasClose = () => {
		const active = document.querySelectorAll(`.idea-marker.${isActiveClass}, .idea-mobile-content.${isActiveClass}`);
		if (!active.length) return;
		active.forEach((e) => {
			e.classList.remove(isActiveClass);
		});
	};

	let ideasMobile = (el) => {
		const ideaMobile = document.querySelector(".idea-mobile-content div");
		if (ideaMobile) {
			const cloneContent = el.nextElementSibling.cloneNode(true);
			ideaMobile.innerHTML = "";
			ideaMobile.parentElement.classList.add(isActiveClass);
			ideaMobile.append(cloneContent);
		}
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-idea");
		if (el) {
			if (el.parentElement.classList.contains(isActiveClass)) {
				ideasClose();
			} else {
				ideasClose();
				el.parentElement.classList.toggle(isActiveClass);
				ideasMobile(el);
			}
		} else {
			if (!e.target.closest(".idea-marker__content")) {
				ideasClose();
			}
		}
	});
}

// canvas.offsetLeft		-- родитель от левого края браузера
// canvas.offsetWidth		-- длина родителя
// marker.offsetLeft		-- маркер до левого края
// marker.offsetWidth		-- длина маркера
// box.offsetWidth			-- длина попапа
export function ideaPopupPlace() {
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

export function showSkeleton(where, tpl) {
	if (!where || !tpl) return;
	const template = document.getElementById(tpl);
	where.innerHTML = "";
	where.appendChild(template.content.cloneNode(true));
}

export function useLoader(where, action, options = {}) {
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

export function btnLoader(where, action = false) {
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
export function blockObserver(el = false) {
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
		catalogItemGalleriesInit();
		catalogItemGallery();
		tabsInit();
		tabsHandler(target);
	};
}

// fetch on input
export function userInputQuery(el = false) {
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

export function userInputQuickSearch(el = false) {
	const inputs = el ? el.querySelectorAll("[data-quick-search='true']") : document.querySelectorAll("[data-quick-search='true']");

	let quickSearch = (input) => {
		let target = input.dataset.target,
			filter = input.value.toUpperCase(),
			area = document.querySelector(`.${target}`),
			items = area.querySelectorAll("a", "span"),
			text = "";

		if (!area) return;

		if (items.length > 0) {
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

export function getScrollbarWidth() {
	let div = document.createElement("div");
	div.style.overflowY = "scroll";
	div.style.width = "50px";
	div.style.height = "50px";
	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();
	return scrollWidth;
}

export function overlay(action, origin = false) {
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
}

function getRandomStr(len) {
	let res = "",
		symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
	len = len || Math.floor(Math.random() * symbols.length);
	for (let i = 0; i < len; i++) res += symbols[Math.floor(Math.random() * symbols.length)];
	return res;
}

// function removeOverlaps() {
// 	const modalExist = document.querySelector(".modal.is-active");

// 	if (modalExist) modalExist.remove();
// }