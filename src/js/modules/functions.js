export function stickyHeader() {
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
export function isTouchEnabled() {
	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

export function dropdownByTouch() {
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

export function closeModal() {
	const closeButtons = document.querySelectorAll(".js-close"),
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

export function mobileCheck(w) {
	if (!w) return;
	let mq = window.matchMedia(`(max-width: ${w}px)`);
	return mq.matches ? true : false;
}

export function accordion() {
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

// canvas.offsetLeft		-- родитель от левого края браузера
// canvas.offsetWidth		-- длина родителя

// marker.offsetLeft		-- маркер до левого края
// marker.offsetWidth		-- длина маркера
// box.offsetWidth			-- длина попапа
