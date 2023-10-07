import { showSkeleton, useLoader, btnLoader } from "./functions.js";
import { carouselsInit } from "./fancyapps.js";
import { rangeSlidersInit } from "./nouislider.js";

/** products at catalog list */
export function productGalleriesInit(item = false) {
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

		Object.assign(data, params, formDataObject);

		(async () => {
			useLoader([item, details]);

			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(data),
			});

			useLoader([item, details], "stop");

			let result = await response.json();

			if (result.status === true) {
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

			productGalleriesInit(item);
			productPropCollapseHandler(item);
		})();
	});
}

export function productFetches() {
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

		if (!result.hasOwnProperty("url")) return;
		filterForm.action = result.url;

		// step 2: get page chunks
		response = await fetch(result.url);
		result = await response.json();

		// step 3: update page chunks
		if (result.status === true) {
			if (result.hasOwnProperty("chunks")) {
				updateChunks(result.chunks);
			}
		}

		reinitFetchesResults();

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

			if (result.hasOwnProperty("chunks")) {
				updateChunks(result.chunks);
			}
		}

		reinitFetchesResults();

		// loader finish
		useLoader(itemsContainer, "stop");
	};

	let fetchByMoreBtn = async (btn) => {
		if (!btn) return;
		const url = btn.dataset.url,
			target = document.querySelector(`.${btn.dataset.target}`);
		if (!target || !url) return;

		btnLoader(btn);

		// step 1: fetch get
		let response = await fetch(url);
		let result = await response.json();

		// step 2: update page chunks
		if (result.status === true) {
			// update action if new url recieved
			if (result.hasOwnProperty("url")) {
				filterForm.action = result.url;
			}

			if (result.hasOwnProperty("products")) {
				// target.innerHTML += result; -- bad solution (target div flickering)
				let div = document.createElement("div");
				div.innerHTML = result.products;

				div.childNodes.forEach((i) => {
					target.appendChild(i);
				});
			}

			if (result.hasOwnProperty("chunks")) {
				updateChunks(result.chunks);
			}
		}

		reinitFetchesResults();

		btnLoader(btn, "stop");
	};

	let updateChunks = (obj) => {
		if (!obj) return;

		Object.entries(obj).forEach(([key, value]) => {
			if (value.length > 0) {
				let target = document.querySelector(`[data-id=${key}]`);
				if (!target) {
					console.log(`data-id ${key} not found`);
					return;
				}
				target.innerHTML = value;
			}
		});
	};

	let reinitFetchesResults = () => {
		carouselsInit();
		productGalleriesInit();
		rangeSlidersInit();
	};

	// filter on change
	filterForm.addEventListener("input", () => {
		filterReset.classList.remove("invisible");
		fetchByFilter();
		filterTagsSet();
	});

	// filter on reset
	filterReset.addEventListener("click", () => {
		const resetFlag = document.getElementById("filter-reset"),
			checked = document.querySelectorAll(`input[type='checkbox']:checked`);
		if (checked.length > 0) {
			checked.forEach((el) => (el.checked = false));
		}
		resetFlag.value = "Y";
		fetchByFilter();
		filterTagsSet();
		resetFlag.value = "N";
		filterReset.classList.add("invisible");
	});

	// filter on submit
	filterForm.addEventListener("submit", (e) => {
		e.preventDefault();
		fetchByFilter();
		filterTagsSet();
	});

	// dropdown sorter
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

	// btn "load more"
	document.body.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-load-more");
		if (!btn) return;
		fetchByMoreBtn(btn);
	});
}

export function filterTagsSet() {
	const filterForm = document.getElementById("filter-form"),
		fGroups = filterForm.querySelectorAll(".filter-group"),
		tagsContainer = document.querySelector(".catalog-bar__tags"),
		tagsObj = {};

	fGroups.forEach((gr) => {
		const header = gr.querySelector(".filter-group__header").textContent,
			checkboxes = gr.querySelectorAll("input[type='checkbox']:checked"),
			rangesliders = gr.querySelectorAll(".rangeslider"),
			rangeArr = [],
			checkedArr = [];

		if (checkboxes.length + rangesliders.length == 0) return;

		rangesliders.forEach((el) => {
			const slider = el.querySelector("[data-range='rangeslider']"),
				elGroup = el.closest(".filter-group").dataset.propId,
				iMin = el.querySelector(".input-min"),
				iMax = el.querySelector(".input-max"),
				rangeMin = parseInt(slider.dataset.min),
				rangeMax = parseInt(slider.dataset.max),
				valueMin = iMin.value,
				valueMax = iMax.value,
				labelMin = iMin.previousElementSibling.textContent,
				labelMax = iMax.previousElementSibling.textContent;

			if (rangeMin == parseInt(valueMin.replace(/[^0-9]+/g, "")) && rangeMax == parseInt(valueMax.replace(/[^0-9]+/g, ""))) return;

			rangeArr.push({ title: `${labelMin} ${valueMin} ${labelMax} ${valueMax}`, group: elGroup, name: "" });
			if (rangeArr.length > 0) Object.assign(tagsObj, { [header]: rangeArr });
		});

		checkboxes.forEach((el) => {
			const elGroup = el.closest(".filter-group").dataset.propId,
				elName = el.name,
				elTitle = el.parentNode.title;
			checkedArr.push({ title: elTitle, group: elGroup, name: elName });
		});

		if (checkedArr.length > 0) Object.assign(tagsObj, { [header]: checkedArr });
	});

	tagsContainer.innerHTML = createTagsList(tagsObj);
}

export function filterTagsRemove() {
	document.body.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-remove-tag");
		if (!btn) return;

		if (btn.dataset.name) {
			document.querySelector(`[name=${btn.dataset.name}]`).click();
		}

		if (btn.dataset.group) {
			const filterForm = document.getElementById("filter-form"),
				group = document.querySelector(`[data-prop-id=${btn.dataset.group}]`),
				checked = group.querySelectorAll(`input[type='checkbox']:checked`),
				rangeSlider = group.querySelector('[data-range="rangeslider"]');

			if (checked.length > 0) {
				checked.forEach((el) => (el.checked = false));
			}

			if (rangeSlider) {
				rangeSlider.noUiSlider.set([0, 999999999]);
			}

			filterTagsSet();
			filterForm.dispatchEvent(new Event("submit"));
			filterForm.requestSubmit();
		}
	});
}

// product helpers
function isPropOverflowX(el) {
	return el ? el.scrollWidth > el.clientWidth : false;
}

function productPropCollapseHandler(el) {
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
}

function createTagsList(obj) {
	let tagItems = "";

	Object.entries(obj).forEach(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			let count = Object.keys(value).length;
			if (count == 1) {
				tagItems += `<div class="tag"><div class="tag__head"><div class="tag__val">${key}: ${value[0].title}</div><div class="tag__remove js-remove-tag" data-group="${value[0].group}"></div></div></div>`;
			} else {
				tagItems += `<div class="tag"><div class="tag__head"><div class="tag__val">${key}: ${count} знач.</div><div class="tag__remove js-remove-tag" data-group="${value[0].group}"></div></div>`;
				tagItems += `<div class="tag__list">`;
				Object.values(value).forEach((v) => {
					tagItems += `<div class="tag__item"><div class="tag__val">${v.title}</div><div class="tag__remove js-remove-tag" data-name="${v.name}"></div></div>`;
				});
				tagItems += `</div></div>`;
			}
		}
	});

	return tagItems;
}
