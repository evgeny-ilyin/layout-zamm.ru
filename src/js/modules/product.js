import { collapseHandler, showSkeleton, useLoader, btnLoader } from "./functions.js";
import { rangeSlidersInit } from "./nouislider.js";

/** products at catalog list */
export function productGalleryInit(item = false) {
	const isActiveClass = "is-active";

	if (item) {
		item.querySelector(".item__gallery-item").classList.add(isActiveClass);
		return;
	}

	// onload
	const catalogItems = document.querySelector(".catalog-items"),
		carouselItems = document.querySelector(".product-carousel");

	[catalogItems, carouselItems].forEach((el) => {
		if (!el) return;

		let items = el.querySelectorAll(".item");
		if (!items) return;
		items.forEach((i) => {
			i.querySelector(".item__gallery-item").classList.add(isActiveClass);
		});
	});
}

export function productGallery() {
	const catalogItems = document.querySelector(".catalog-items"),
		carouselItems = document.querySelector(".product-carousel"),
		isActiveClass = "is-active";

	[catalogItems, carouselItems].forEach((el) => {
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
}

export function productFavourite() {
	document.body.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-fav"),
			isActiveClass = "is-active";
		if (!btn) return;

		const url = btn.dataset.url;

		(async () => {
			let response = await fetch(url);
			let result = await response.json();
			if (!result) return;

			if (result.status === true) {
				btn.parentElement.classList.toggle(isActiveClass);
			}
		})();
	});
}

export function productPropsHover() {
	const catalogItems = document.querySelector(".catalog-items");
	if (!catalogItems) return;

	catalogItems.addEventListener("mouseover", (e) => {
		const item = e.target.closest(".item");
		if (!item) return;

		item.addEventListener("mouseenter", () => {
			const url = item.dataset.url,
				details = item.querySelector(".item__details"),
				skeleton = item.querySelector(".skeleton");

			if (details.innerHTML.trim().length > 0 && !skeleton) return;

			showSkeleton(details, "tpl-props");

			(async () => {
				let response = await fetch(url);
				let result = await response.text();
				if (!result) return;
				details.innerHTML = "";
				details.innerHTML = result;
				productPropCollapseHandler(item);
			})();
		});
	});
}

export function productProps() {
	document.addEventListener("change", (e) => {
		const prop = e.target,
			item = prop.closest(".item"),
			details = prop.closest(".item__details"),
			form = prop.closest(".props form");

		if (!form || !item) return;

		let formData = new FormData(form),
			data = {},
			params = {},
			url = prop.dataset.url;

		let formDataObject = Object.fromEntries(formData.entries());

		data = { name: prop.name, checked: true };

		if (prop.dataset.params) {
			params = JSON.parse(prop.dataset.params);
		}

		let body = Object.assign(data, params, formDataObject);

		(async () => {
			useLoader([item, details]);

			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(body),
			});

			useLoader([item, details], "stop");

			let result = await response.json();

			if (result.status === true) {
				if (Object.keys(result.chunks).length == 0) return;

				Object.entries(result.chunks).forEach(([key, value]) => {
					if (value.length > 0) {
						let target = item.querySelector(`[data-id=${key}]`);
						if (!target) {
							console.log(`data-id ${key} not found`);
							return;
						}
						target.innerHTML = value;
					}
				});
			}
			productGalleryInit(item);
			productPropCollapseHandler(item);
		})();
	});
}

export function productFilter() {
	const filterForm = document.getElementById("filter-form"),
		filterReset = document.querySelector(".js-filter-reset"),
		sortBtns = document.querySelectorAll("input[name='sort']"),
		itemsContainer = document.querySelector(".content_columns");

	if (!filterForm) return;

	let fetchByFilter = async () => {
		let formData = new FormData(filterForm),
			url = filterForm.action;

		let formDataObject = Object.fromEntries(formData.entries());

		// loader start +++ filter @mobile
		useLoader(itemsContainer);

		// step 1: get filter url based on filter selected
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(formDataObject),
		});

		// break if new url not recieved
		let result = await response.json();
		if (Object.keys(result.url).length == 0) return;
		filterForm.action = result.url;

		// step 2: get page chunks
		response = await fetch(result.url);
		result = await response.json();

		// step 3: update page chunks
		if (result.status === true) {
			if (Object.keys(result.chunks).length == 0) return;
			updateChunks(result.chunks);
		}

		// loader finish
		useLoader(itemsContainer, "stop");
	};

	let fetchByUrl = async (obj) => {
		if (!obj) return;

		let amp = filterForm.action.includes("?") ? "&" : "?",
			query = amp + new URLSearchParams(obj).toString(),
			url = filterForm.action + query;

		// loader start +++ filter @mobile
		useLoader(itemsContainer);

		// step 1: fetch get
		let response = await fetch(url);
		let result = await response.json();

		// step 2: update page chunks
		if (result.status === true) {
			// update action if new url recieved
			if (result.hasOwnProperty("url")) {
				filterForm.action = result.url;
			}

			if (Object.keys(result.chunks).length == 0) return;
			updateChunks(result.chunks);
		}

		// loader finish
		useLoader(itemsContainer, "stop");
	};

	let updateChunks = (obj) => {
		if (!obj) return;

		Object.entries(obj).forEach(([key, value]) => {
			if (value.length > 0) {
				let target = itemsContainer.querySelector(`[data-id=${key}]`);
				if (!target) {
					console.log(`data-id ${key} not found`);
					return;
				}
				target.innerHTML = value;
			}
		});

		productGalleryInit();
		rangeSlidersInit();
		collapseHandler();
	};

	filterReset.addEventListener("click", () => {
		const resetFlag = document.getElementById("filter-reset");
		filterForm.reset();
		resetFlag.value = "Y";
		fetchByFilter();
		resetFlag.value = "N";
		filterReset.classList.add("invisible");
	});

	filterForm.addEventListener("submit", (e) => {
		e.preventDefault();
		fetchByFilter();
	});

	filterForm.addEventListener("change", () => {
		filterReset.classList.remove("invisible");
		fetchByFilter();
	});

	sortBtns.forEach((btn) => {
		btn.addEventListener("change", () => {
			const sortFlag = document.getElementById("filter-sort"),
				sortBlock = btn.closest(".js-drop-down.is-active"),
				sortLabel = sortBlock.querySelector(".drop-down__head"),
				object = {};
			sortFlag.value = btn.value;
			sortLabel.textContent = btn.nextElementSibling.textContent;
			sortBlock.classList.remove("is-active");
			object[btn.name] = parseInt(btn.value);
			fetchByUrl(object);
		});
	});
}

export function productLoadMore() {
	document.body.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-load-more");
		if (!btn) return;

		const url = btn.dataset.url,
			target = document.querySelector(`.${btn.dataset.target}`);
		if (!target) return;

		(async () => {
			btnLoader(btn);

			let response = await fetch(url);
			let result = await response.text();
			if (!result) return;

			// target.innerHTML += result; -- bad solution (target div flickering)
			let div = document.createElement("div");
			div.innerHTML = result;

			div.childNodes.forEach((i) => {
				target.appendChild(i);
			});

			productGalleryInit();
			btnLoader(btn, "stop");
		})();
	});
}

// product helpers
function isPropOverflowX(el) {
	return el ? el.scrollWidth > el.clientWidth : false;
}

function productPropCollapseHandler(item) {
	if (!item) return;
	const propsBtns = item.querySelectorAll(".js-prop-collapse"),
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
}
