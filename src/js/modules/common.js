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
	let createModal = (type = false) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`);
		if (modalExist) modalExist.remove();

		const modal = document.createElement("div"),
			btn = document.createElement("button");

		modal.classList.add(modalClass, "scrollblock");
		if (type) modal.classList.add(`is-${type}`);
		btn.classList.add("btn", "btn_close", "btn_close-modal", "js-modal-close");
		btn.ariaLabel = "Закрыть";
		modal.appendChild(btn);
		document.body.appendChild(modal);
		return modal;
	};

	let fetchByUrl = async (url, origin) => {
		if (!url) return;

		let boxWidth = origin.dataset.boxWidth || false,
			boxType = origin.dataset.boxType || false;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				if (result.nocache === true) {
					setModalContent(result.content, { width: boxWidth, type: boxType });
				} else {
					const key = getRandomStr(8);
					setModalContent(result.content, { width: boxWidth, type: boxType, origin: origin, key: key });
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

	let setModalContent = (content, arg) => {
		const modalWrapper = createModal(arg.type),
			menuToggler = document.getElementById("menu-toggle"),
			isActiveClass = "is-active";

		if (arg.width) modalWrapper.style.width = `${parseInt(arg.width)}px`;
		modalWrapper.insertAdjacentHTML("beforeend", content);

		if (modalWrapper.getBoundingClientRect().height + modalWrapper.getBoundingClientRect().top > window.innerHeight) {
			modalWrapper.style.bottom = "50px";
		}

		reinitModalResults(modalWrapper);

		setTimeout(() => {
			menuToggler.checked = false;
			modalWrapper.classList.add(isActiveClass);
			overlay(1);
		}, 10);

		if (arg.origin && arg.key) {
			arg.origin.dataset.storageKey = arg.key;
			localStorage.setItem(arg.key, content);
		}
	};

	// let setModalContent = (content, width = false, origin = false, key = false) => {
	// 	const modalWrapper = createModal(),
	// 		menuToggler = document.getElementById("menu-toggle"),
	// 		isActiveClass = "is-active";

	// 	if (width) modalWrapper.style.maxWidth = `${parseInt(width)}px`;
	// 	modalWrapper.insertAdjacentHTML("beforeend", content);

	// 	if (modalWrapper.getBoundingClientRect().height + modalWrapper.getBoundingClientRect().top > window.innerHeight) {
	// 		modalWrapper.style.bottom = "50px";
	// 	}

	// 	reinitModalResults(modalWrapper);

	// 	setTimeout(() => {
	// 		menuToggler.checked = false;
	// 		modalWrapper.classList.add(isActiveClass);
	// 		overlay(1);
	// 	}, 10);

	// 	if (origin && key) {
	// 		origin.dataset.storageKey = key;
	// 		localStorage.setItem(key, content);
	// 	}
	// };

	let reinitModalResults = (target) => {
		// inputFetch(target);
		inputQuickSearch(target);
		selectsInit();
		globalForm.validation();
	};

	let videoIframe = async (url, origin) => {
		if (!url) return;

		let boxWidth = origin.dataset.boxWidth || false,
			boxType = origin.dataset.boxType || false;

		// шаблон iframe
		const iframe = document.createElement("div");
		iframe.classList.add("modal__body", "_player");
		iframe.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`;

		setModalContent(iframe.outerHTML, { width: boxWidth, type: boxType });
	};

	// modal by click
	document.addEventListener("click", (e) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`),
			modalShow = e.target.closest(".js-modal-show"),
			modalClose = e.target.closest([".js-modal-close", ".overlay"]);

		if (modalShow) {
			e.preventDefault();
			let url = "",
				boxWidth = modalShow.dataset.boxWidth,
				boxType = modalShow.dataset.boxType,
				storageKey = modalShow.dataset.storageKey;

			// from storage
			if (storageKey) {
				let content = localStorage.getItem(storageKey);
				if (content) {
					setModalContent(content, { width: boxWidth, type: boxType });
					return;
				}
			}

			// yt video
			if (boxType == "video") {
				url = modalShow.href;
				if (!url) return;
				videoIframe(url, modalShow);
				return;
			}

			// other - fetch
			url = modalShow.dataset.url;
			if (!url) return;
			fetchByUrl(url, modalShow);
		}

		if (modalExist && (!modalExist.contains(e.target) || modalClose)) {
			modalExist.remove();
			overlay(0);
		}
	});

	// modal by form submit
	document.addEventListener("submit", (e) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`),
			modalShow = e.target.closest(".js-modal-submit"),
			modalClose = e.target.closest([".js-modal-close", ".overlay"]);

		if (modalShow) {
			e.preventDefault();
			let url = "",
				boxWidth = modalShow.dataset.boxWidth,
				storageKey = modalShow.dataset.storageKey;

			// from storage
			if (storageKey) {
				let content = localStorage.getItem(storageKey);
				if (content) {
					setModalContent(content, { width: boxWidth });
					return;
				}
			}

			// fetch
			url = modalShow.dataset.url;
			if (!url) return;

			let data = new FormData(e.target),
				amp = url.includes("?") ? "&" : "?",
				queryStr = amp + new URLSearchParams(data).toString();

			url += queryStr;

			fetchByUrl(url, modalShow);
		}

		if (modalExist && (!modalExist.contains(e.target) || modalClose)) {
			modalExist.remove();
			overlay(0);
		}
	});
}

export function edgePopupHandler() {
	const popupClass = "popup-edge",
		popupShowClass = "js-popup-show",
		popupCloseClass = "js-popup-close",
		isActiveClass = "is-active";

	let createPopup = (hide = false) => {
		const popupExist = document.querySelector(`.${popupClass}`);
		setTimeout(() => {
			if (popupExist) popupExist.remove();
		}, 250);

		const popup = document.createElement("div"),
			btn = document.createElement("button");

		popup.classList.add(popupClass, "content", "scrollblock");
		hide ? popup.classList.add(`hidden-${hide}`) : "";

		btn.classList.add("btn", "btn_close", `${popupCloseClass}`);
		btn.ariaLabel = "Закрыть";

		popup.appendChild(btn);
		document.body.appendChild(popup);
		return popup;
	};

	let closePopup = (popup) => {
		let popupBtn = document.querySelector(`.${popupShowClass}.${isActiveClass}`);
		if (popupBtn) popupBtn.classList.remove(isActiveClass);
		popup.classList.remove(isActiveClass);
	};

	let fetchByUrl = async (url, origin) => {
		if (!url) return;

		let hide;
		hide = origin.dataset.hide;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				if (result.nocache === true) {
					setPopupContent(result.content, hide);
				} else {
					const key = getRandomStr(8);
					setPopupContent(result.content, hide, origin, key);
				}
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.error(e);
			return;
		}
	};

	let setPopupContent = (content, hide = false, origin = false, key = false) => {
		const popupWrapper = createPopup(hide);

		popupWrapper.insertAdjacentHTML("beforeend", content);
		// popupWrapper.append(content);

		setTimeout(() => {
			popupWrapper.classList.add(isActiveClass);
		}, 10);

		if (origin && key) {
			origin.dataset.storageKey = key;
			localStorage.setItem(key, content);
		}
	};

	document.addEventListener("click", (e) => {
		const popupExist = document.querySelector(`.${popupClass}`),
			popupShow = e.target.closest(`.${popupShowClass}`),
			popupClose = e.target.closest(`.${popupCloseClass}`);

		if (popupShow) {
			e.preventDefault();

			if (popupShow.classList.contains(isActiveClass) && popupExist) {
				closePopup(popupExist);
				return;
			}

			if (!popupShow.classList.contains(isActiveClass) && popupExist) {
				closePopup(popupExist);
			}

			let content, hide, target, url, storageKey;

			hide = popupShow.dataset.hide;
			target = popupShow.dataset.target;
			url = popupShow.dataset.url;
			storageKey = popupShow.dataset.storageKey;
			popupShow.classList.add(isActiveClass);

			// from storage
			if (storageKey) {
				content = localStorage.getItem(storageKey);
				if (content) {
					setPopupContent(content, hide);
					return;
				}
			}

			// fetch to popup
			if (url) {
				fetchByUrl(url, popupShow);
				return;
			}

			// clone target to popup
			if (target) {
				content = popupShow.parentElement.querySelector(`.${target}`).cloneNode(true).outerHTML;
				// content.removeAttribute("class");
			}

			// just clone self to popup
			if (!target && !url) {
				content = popupShow.cloneNode(true).outerHTML;
				// content.removeAttribute("class");
			}

			// set content
			if (content) {
				setPopupContent(content, hide);
				return;
			}
		}

		if (popupExist) {
			if (popupExist.classList.contains(isActiveClass) && (!popupExist.contains(e.target) || popupClose)) {
				closePopup(popupExist);
				return;
			}
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

export function collapseTargetHandler() {
	const isCollapsedClass = "is-collapsed",
		targetCollapseClass = "is-collapsible";

	let toggleTarget = (trigger) => {
		const parent = trigger.dataset.parent,
			section = trigger.closest(`.${parent}`).querySelector(`.${targetCollapseClass}`),
			sectionH = section.scrollHeight;

		if (section.classList.contains(isCollapsedClass)) {
			section.style.height = sectionH + "px";
			section.classList.remove(isCollapsedClass);
			trigger.setAttribute("aria-expanded", true);
		} else {
			section.style.height = 0;
			section.classList.add(isCollapsedClass);
			trigger.setAttribute("aria-expanded", false);
		}
	};

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-target-collapse");
		if (!trigger) return;
		toggleTarget(trigger);
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
					if (result.chunks) updateChunks(result.chunks);
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

			if (e.target.dataset.value.length > 0 && e.target.dataset.target.length > 0) {
				let target = document.querySelectorAll(`input[name="${e.target.dataset.target}"]`);
				target.forEach((t) => {
					t.value = e.target.dataset.value;
				});
			}

			let customEvent = new Event("queryResult", { bubbles: true });
			wrapper.querySelector("input").dispatchEvent(customEvent);
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
		const accordionParent = trigger.parentElement,
			accordionContent = trigger.nextElementSibling;
		trigger.addEventListener("click", () => {
			if (accordionParent.classList.contains(isEnabledClass)) {
				accordionParent.classList.toggle(isOpenedClass);
				if (accordionContent.style.maxHeight) {
					accordionContent.style.maxHeight = null;
				} else {
					accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
				}
			}
		});

		["load", "resize"].forEach((evt) =>
			window.addEventListener(evt, () => {
				if (accordionContent.style.maxHeight) {
					accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
				}
			})
		);
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
			body.style.top = `-${scrollY}px`;
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

export function getContent() {
	let fetchByUrl = async (el) => {
		const url = el.dataset.url,
			loader = false || document.querySelector(`.${el.dataset.loader}`);
		if (!url) return;

		try {
			fetchLoader([loader], "start");
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}

			let result = await response.json();
			if (result.status === true) {
				if (result.chunks) updateChunks(result.chunks);
				if (result.modal == "close") document.querySelector(".js-modal-close").click();
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
			fetchLoader([loader], "stop");
		} catch (e) {
			console.error(e);
			return;
		}
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-get");
		if (!el) return;
		fetchByUrl(el);
	});
}

export function clickAndDrag() {
	document.addEventListener("mousedown", (e) => {
		const scroll_speed = 1,
			draggableClass = "js-draggable",
			draggingClass = "js-dragging", // flag for other functions
			el = e.target.closest(`.${draggableClass}`);

		if (!el) return;

		let isDown = false,
			startX,
			scrollLeft;

		e.preventDefault();

		isDown = true;
		startX = e.pageX - el.offsetLeft;
		scrollLeft = el.scrollLeft;

		// prevent default child behavior
		document.addEventListener("click", function (e) {
			if (el.contains(e.target)) {
				e.preventDefault();
			}
		});

		el.addEventListener("mouseleave", () => {
			isDown = false;
		});

		el.addEventListener("mouseup", () => {
			isDown = false;

			// remove the dragging class after a short delay to prevent other click events
			setTimeout(() => {
				el.classList.remove(draggingClass);
			}, 250);
		});

		el.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft,
				walk = (x - startX) * scroll_speed; // scroll fast
			el.scrollLeft = scrollLeft - walk;

			if (scrollLeft !== el.scrollLeft) {
				el.classList.add(draggingClass);
			}
		});
	});
}
