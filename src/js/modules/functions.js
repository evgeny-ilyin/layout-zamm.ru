export function stickyHeader() {
	const header = document.querySelector("header"),
		isOntopClass = "is-ontop",
		isStickyClass = "is-sticky",
		isHiddenClass = "is-hidden";

	if (!header) return;

	const handleScroll = () => {
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
	};

	window.addEventListener("scroll", handleScroll);
}

export function sectionShow() {
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

export function overlayClick() {
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
		isActiveClass = "is-active";
	if (action) {
		const o = document.createElement("div"),
			scrollY = window.scrollY;
		o.classList.add("overlay");

		origin ? (o.dataset.origin = origin) : "";
		body.prepend(o);
		body.style.top = `-${scrollY}px`;
		body.classList.add("noscroll");

		setTimeout(() => {
			o.classList.add(isActiveClass);
		}, 0);
	} else {
		const o = document.querySelector(".overlay"),
			scrollY = body.style.top;
		o.classList.remove(isActiveClass);
		body.classList.remove("noscroll");
		body.style.top = "";

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

export function mobileCheck(w) {
	if (!w) return;
	let mq = window.matchMedia(`(max-width: ${w}px)`);
	return mq.matches ? true : false;
}

export function mobileCatalog() {
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
// export function isTouchEnabled() {
// 	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
// }

// export function dropdownByTouch() {
// 	if (!isTouchEnabled()) {
// 		return;
// 	}

// 	const dropdownTouch = document.querySelectorAll(".dropdown-touch"),
// 		isActiveClass = "is-active";

// 	dropdownTouch.forEach((link) => {
// 		link.addEventListener("click", (e) => {
// 			e.stopPropagation();
// 			const dropdown = link.nextElementSibling;
// 			if (!dropdown.classList.contains(isActiveClass)) {
// 				dropdownClose(e);
// 			}
// 			dropdown.classList.toggle(isActiveClass);
// 		});
// 	});

// 	document.addEventListener("click", (e) => {
// 		dropdownClose(e);
// 	});

// 	let dropdownClose = (e) => {
// 		const dropdownTouchActive = document.querySelectorAll(`.dropdown-touch + .${isActiveClass}`);
// 		if (dropdownTouchActive) {
// 			dropdownTouchActive.forEach((dropdown) => {
// 				if (!dropdown.contains(e.target)) {
// 					dropdown.classList.remove(isActiveClass);
// 				}
// 			});
// 		}
// 	};
// }
// не используются <

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

// collapse через data
// export function collapse() {
// 	const triggers = document.querySelectorAll(".js-collapse"),
// 		collapsed = document.querySelectorAll(".collapsed");

// 	// set collapsed on load
// 	collapsed.forEach((el) => {
// 		el.dataset.collapsed = "true";
// 	});

// 	triggers.forEach((trigger) => {
// 		trigger.addEventListener("click", () => {
// 			const section = trigger.nextElementSibling,
// 				isCollapsed = section.dataset.collapsed === "true";

// 			if (isCollapsed) {
// 				expandSection(section);
// 				section.dataset.collapsed = "false";
// 			} else {
// 				collapseSection(section);
// 			}
// 		});
// 	});
// }

// function collapseSection(el) {
// 	const sectionH = el.scrollHeight,
// 		elTransition = el.style.transition;
// 	el.style.transition = "";
// 	requestAnimationFrame(function () {
// 		el.style.height = sectionH + "px";
// 		el.style.transition = elTransition;
// 		requestAnimationFrame(function () {
// 			el.style.height = 0 + "px";
// 		});
// 	});
// 	el.dataset.collapsed = "true";
// }

// function expandSection(el) {
// 	const sectionH = el.scrollHeight;
// 	el.style.height = sectionH + "px";
// 	el.dataset.collapsed = "false";
// }

export function collapseHandler() {
	const triggers = document.querySelectorAll(".js-collapse"),
		collapsed = document.querySelectorAll(".collapsed"),
		isClosedClass = "is-closed",
		isCollapsedClass = "collapsed";

	// set closed state on load
	collapsed.forEach((el) => {
		el.previousElementSibling.classList.add(isClosedClass);
	});

	triggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const section = trigger.nextElementSibling,
				isCollapsed = section.classList.contains(isCollapsedClass);

			if (isCollapsed) {
				expandSection(section);
				trigger.classList.remove(isClosedClass);
				section.classList.remove(isCollapsedClass);
			} else {
				collapseSection(section);
				trigger.classList.add(isClosedClass);
			}
		});
	});
}

function collapseSection(el) {
	const sectionH = el.scrollHeight,
		elTransition = el.style.transition,
		isCollapsedClass = "collapsed";
	el.style.transition = "";
	requestAnimationFrame(function () {
		el.style.height = sectionH + "px";
		el.style.transition = elTransition;
		requestAnimationFrame(function () {
			el.style.height = 0 + "px";
			el.classList.add(isCollapsedClass);
		});
	});
}

function expandSection(el) {
	const sectionH = el.scrollHeight,
		isCollapsedClass = "collapsed";
	el.style.height = sectionH + "px";
	el.classList.remove(isCollapsedClass);
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

export function ideaMarkerShow() {
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

export function useLoader(where, action = false) {
	if (!where) return;
	let whereArr = [];

	if (!Array.isArray(where)) {
		whereArr = [where];
	} else {
		whereArr = where;
	}

	if (action == "stop") {
		whereArr.forEach((ww) => {
			let loaders = ww.querySelectorAll(".fetch");
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

	whereArr.forEach((w) => {
		let loader = document.createElement("div");
		loader.classList.add("fetch");
		let child = document.createElement("div");
		child.classList.add("fetch__ring");
		loader.appendChild(child);

		w.appendChild(loader);

		setTimeout(() => {
			loader.style.opacity = 1;
		}, 0);
	});
}

export function btnLoader(where, action = false) {
	if (!where) return;
	const btnLoaderClass = "btn-loader",
		label = where.querySelector('span');

	if (action == "stop") {
	where.classList.remove(btnLoaderClass);
	label.style.opacity = 1;
		return;
	}

	where.classList.add(btnLoaderClass);
	label.style.opacity = 0;
}
