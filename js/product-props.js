/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
						fetchLoader([item, details], "start");

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

						catalogItemGalleriesInit(item);
						productPropsCollapseHandler(item);

						fetchLoader([item, details], "stop");
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
						fetchLoader([card], "start");
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

						fetchLoader([card], "stop");
					} catch (e) {
						console.log(e);
						return;
					}
				})();
			}

			let update = (result, where) => {
				Object.entries(result.chunks).forEach(([key, value]) => {
					if (value.length) {
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
	};
}

if (!window.productPropsHoverHandler) {
	window.productPropsHoverHandler = () => {
		const catalogItems = document.querySelectorAll(".catalog-items, .product-carousel");
		if (!catalogItems.length) return;

		catalogItems.forEach((block) => {
			block.addEventListener("mouseover", (e) => {
				const item = e.target.closest(".item");
				if (!item) return;

				item.addEventListener("mouseenter", () => {
					const url = item.dataset.url,
						details = item.querySelector(".item__details"),
						skeleton = item.querySelector(".skeleton");

					if (details.innerHTML.trim().length && !skeleton) return;

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
							productPropsCollapseHandler(item);
						} catch (e) {
							console.log(e);
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

			if (!parent.classList.contains(isOpenedClass) && !isPropOverflowX(parent)) {
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

;// CONCATENATED MODULE: ./src/js/product-props.js


addEventListener("DOMContentLoaded", () => {
	productProps();
	productPropsHoverHandler();
});

/******/ })()
;