/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/product-card-global.js
if (!window.productBlockCollapseHandler) {
	window.productBlockCollapseHandler = (el = false) => {
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
	};
}

;// CONCATENATED MODULE: ./src/js/modules/product-props.js
if (!window.productProps) {
	window.productProps = () => {
		document.addEventListener("change", (e) => {
			if (!e.target.closest(".prop")) {
				return;
			}

			const prop = e.target,
				item = prop.closest(".item"),
				details = prop.closest(".item__details"),
				card = prop.closest(".product"),
				form = prop.closest("form");

			if (!form) return;

			let formData = new FormData(form),
				data = {},
				params = {},
				url = prop.dataset.url;

			data = { name: prop.name, checked: true };

			if (prop.dataset.params) {
				params = { params: JSON.parse(prop.dataset.params) };
			}

			Object.assign(data, params);
			formData.append("element", JSON.stringify(data));

			// product list
			if (item) {
				(async () => {
					try {
						fetchLoader([item, details], "start");

						let response = await fetch(url, {
							method: "POST",
							body: formData,
						});
						if (!response.ok) {
							return;
						}
						let result = await response.json();

						if (result.status === true) {
							updateChunks(result.chunks, item);

							catalogItemGalleriesInit(item);
							productPropsCollapseHandler(item);
						}

						fetchLoader([item, details], "stop");
					} catch (e) {
						console.error(e);
						return;
					}
				})();
			}

			// product card
			if (card) {
				(async () => {
					try {
						fetchLoader([card], "start");
						let response = await fetch(url, {
							method: "POST",
							body: formData,
						});
						if (!response.ok) {
							return;
						}
						let result = await response.json();
						if (result.status === true) {
							updateChunks(result.chunks, card);

							tabsInit();
							carouselsInit();
						}

						if (result.url) {
							setWindowLocation(result.url);
						}

						fetchLoader([card], "stop");
					} catch (e) {
						console.error(e);
						return;
					}
				})();
			}
		});
	};
}

if (!window.productPropsHoverHandler) {
	window.productPropsHoverHandler = () => {
		const catalogItems = document.querySelectorAll(".catalog-items, .product-carousel");
		if (!catalogItems.length) return;

		catalogItems.forEach((block) => {
			block.addEventListener("mouseover", (e) => {
				const item = e.target.closest(".item");
				if (!item || document.body.classList.contains("is-touch")) return;

				item.addEventListener("mouseenter", () => {
					const url = item.dataset.url,
						details = item.querySelector(".item__details"),
						skeleton = item.querySelector(".skeleton");

					if (!details || (details.innerHTML.trim().length && !skeleton) || item.classList.contains("loading")) return;
					item.classList.add("loading");
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
							item.classList.remove("loading");
							productPropsCollapseHandler(item);
						} catch (e) {
							console.error(e);
							return;
						}
					})();
				});
			});
		});
	};
}

if (!window.productPropsCollapseHandler) {
	window.productPropsCollapseHandler = (el) => {
		if (!el) return;
		const propsBtns = el.querySelectorAll(".js-prop-collapse"),
			isOpenedClass = "is-opened";

		propsBtns.forEach((btn) => {
			let parent = btn.parentElement,
				flag = parent.querySelector(`input[type="hidden"]`);

			if (!parent.classList.contains(isOpenedClass) && !isStrOverflowX(parent)) {
				btn.classList.add("hidden");
			} else {
				btn.addEventListener("click", () => {
					parent.classList.toggle(isOpenedClass);
					flag.value = flag.value == 1 ? 0 : 1;
				});
			}
		});
	};
}

;// CONCATENATED MODULE: ./src/js/modules/tabs.js
if (!window.tabsInit) {
	window.tabsInit = () => {
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
	};
}

if (!window.tabsHandler) {
	window.tabsHandler = (observe = false) => {
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
	};
}

;// CONCATENATED MODULE: ./src/js/modules/observer-global.js




if (!window.blockObserver) {
	window.blockObserver = (el = false) => {
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
							fetchLoader(target, "start", { class: "_sm" });

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

							if (result.svg) {
								addToSvgSprite(result.svg);
							}

							reinitObserverResults(target);

							fetchLoader(target, "stop");
						} catch (e) {
							console.error(e);
							return;
						}
					})();

					observer.unobserve(entry.target);
				}
			});
		}, {});

		const blocks = el ? el.querySelectorAll("[data-observer='true']") : document.querySelectorAll("[data-observer='true']");
		blocks.forEach((block) => fetchObserver.observe(block));

		let reinitObserverResults = (target) => {
			try {
				productBlockCollapseHandler();
				carouselsInit(target);
				catalogItemGalleriesInit();
				catalogItemGalleryHandler();
				tabsInit();
				tabsHandler(target);
				productPropsHoverHandler();
				overflowTags();
				setFavourites();
				selectsInit();
				globalForm.validation();
			} catch (e) {
				console.error(e);
			}
		};
	};
}

;// CONCATENATED MODULE: ./src/js/observer.js


addEventListener("DOMContentLoaded", () => {
	blockObserver();
});

/******/ })()
;