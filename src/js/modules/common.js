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

export function modalHandler() {
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
				if (result.nocache === true) {
					setModalContent(result.content, width);
				} else {
					const key = getRandomStr(8);
					setModalContent(result.content, width, origin, key);
				}
				if (result.svg) {
					addToSvgSprite(result.svg);
				}
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.error(e);
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
		// inputFetch(target);
		inputQuickSearch(target);
		selectsInit();
		globalForm.validation();
	};

	document.addEventListener("click", (e) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`),
			modalShow = e.target.closest(".js-modal-show"),
			modalClose = e.target.closest([".js-modal-close", ".overlay"]);

		if (modalShow) {
			e.preventDefault();
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

export function sectionClose() {
	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-close"),
			isActiveClass = "is-active";
		if (!el) return;
		const target = el.closest(`.${isActiveClass}`);
		if (target) {
			overlay(0);
			resetTopOffset();
			target.classList.remove(isActiveClass);
		}
	});
}

export function collapseHandler() {
	const isCollapsedClass = "is-collapsed";

	let collapseSection = (trigger) => {
		const section = trigger.nextElementSibling,
			sectionH = section.scrollHeight,
			elTransition = section.style.transition;
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
			sectionH = section.scrollHeight;
		section.style.height = sectionH + "px";
		trigger.classList.remove(isCollapsedClass);
	};

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-collapse");
		if (!trigger) return;

		const isCollapsed = trigger.classList.contains(isCollapsedClass);

		if (isCollapsed) {
			expandSection(trigger);
		} else {
			collapseSection(trigger);
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

export function inputFetch() {
	const writeClass = "js-write",
		isActiveClass = "is-active",
		queryWrapperClass = "js-query-wrapper",
		queryResultClass = "js-query-result",
		minQueryLen = 2;

	let fetchByQuery = async (input) => {
		let url = input.dataset.url,
			query = { [input.name]: input.value },
			onFocus = input.dataset.onFocus,
			wrapper = input.closest(`.${queryWrapperClass}`),
			results = wrapper.querySelector(`.${queryResultClass}`);

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
					wrapper.classList.add(isActiveClass);
				} else {
					console.error(`Error: ${JSON.stringify(result)}`);
				}
			} catch (e) {
				console.error(e);
				return;
			}
		}
	};

	["focus", "input"].forEach((evt) =>
		document.addEventListener(
			evt,
			(e) => {
				if (e.target.dataset.query == "true") {
					fetchByQuery(e.target);
				}
			},
			true
		)
	);

	document.addEventListener("click", (e) => {
		if (!e.target.closest(`.${queryWrapperClass}.${isActiveClass}`)) {
			let wrapper = document.querySelector(`.${queryWrapperClass}.${isActiveClass}`);
			if (wrapper) {
				wrapper.classList.remove(isActiveClass);
			}
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.classList.contains(writeClass)) {
			let wrapper = document.querySelector(`.${queryWrapperClass}.${isActiveClass}`);
			wrapper.querySelector("input").value = e.target.innerText;
			wrapper.classList.remove(isActiveClass);
		}
	});
}

export function inputQuickSearch(el = false) {
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
					const media = mediaMatch("767");
					media ? accordionBuildFooter() : accordionDestroyFooter();
				}, 200);
			}
		})
	);
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

export function contentGalleryPopup() {
	const isActiveClass = "is-active",
		targetCommonClass = "popup-gallery";

	document.addEventListener("click", (e) => {
		let el = e.target.closest(".js-popup-gallery"),
			body = document.body,
			headerAlert = document.querySelector(".header-alert"),
			header = document.querySelector(".header"),
			containers = document.querySelectorAll(".container"),
			offsetTop = header.getBoundingClientRect().height,
			scrollY = window.scrollY,
			sw = getScrollbarWidth(),
			media = mediaMatch("1023");

		if (headerAlert) offsetTop += headerAlert.getBoundingClientRect().height;

		if (!el || media) return;

		let showGallery = (target) => {
			// body.style.top = `-${scrollY}px`;
			body.classList.add("noscroll");
			// header.style.top = `${scrollY}px`;
			header.classList.remove("is-hidden");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});
			target.classList.add(isActiveClass);
			target.style.top = `${offsetTop}px`;
		};

		const targetClass = el.dataset.target,
			url = el.dataset.url;

		// загрузить по урлу
		if (targetClass && url) {
			const targetExists = document.querySelector(`.${targetClass}`);

			// если такой элемент ещё не создан — создать
			if (!targetExists) {
				const target = document.createElement("div");
				target.classList.add(targetCommonClass, targetClass);
				body.append(target);

				(async () => {
					try {
						let response = await fetch(url);
						if (!response.ok) {
							return;
						}
						let result = await response.text();
						target.innerHTML = result;
						carouselsInit();
						showGallery(target);
					} catch (e) {
						console.error(e);
						return;
					}
				})();
			} else {
				showGallery(targetExists);
			}
		} else if (targetClass && !url) {
			const target = document.querySelector(`.${targetClass}`);
			showGallery(target);
		}
	});

	window.addEventListener("resize", () => {
		const activeGallery = document.querySelector(`.${targetCommonClass}.${isActiveClass}`);
		if (!activeGallery) return;

		activeGallery.classList.remove(isActiveClass);
		document.body.classList.remove("noscroll");

		const containers = document.querySelectorAll(".container");
		containers.forEach((c) => {
			c.style.paddingRight = "";
		});

		resetTopOffset();
	});
}

export function changeAmount() {
	document.addEventListener("click", (e) => {
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
