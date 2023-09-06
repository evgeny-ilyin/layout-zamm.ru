export function stickyHeader() {
	const header = document.querySelector("header");

	let handleScroll = () => {
		if (window.scrollY > 0) {
			header.classList.add("header_fixed");
		} else {
			header.classList.remove("header_fixed");
		}
	};
	window.addEventListener("scroll", handleScroll);
	handleScroll();
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
		closeSearchBtn = document.querySelector(".close-search"),
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
