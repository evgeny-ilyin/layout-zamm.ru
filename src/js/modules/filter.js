import noUiSlider from "nouislider";
import wNumb from "wnumb";

export function rangeSlidersInit() {
	const rangeSliders = document.querySelectorAll('[data-range="rangeslider"]');
	if (!rangeSliders.length) return;
	rangeSliders.forEach((el) => {
		if (el.noUiSlider) {
			// already initialized
			return;
		}

		if (el) {
			let min = parseInt(el.dataset.min),
				max = parseInt(el.dataset.max),
				from = parseInt(el.dataset.from),
				to = parseInt(el.dataset.to),
				step = parseInt(el.dataset.step);

			noUiSlider.create(el, {
				start: [from ? from : min, to ? to : max],
				range: { min: min, max: max },
				step: step ? step : 500,
				connect: true,
				behaviour: "none",
				format: wNumb({
					decimals: 0,
					thousand: " ",
				}),
			});

			let inputs = [el.parentNode.querySelector(".input-min"), el.parentNode.querySelector(".input-max")];

			el.noUiSlider.on("update", (values, handle) => {
				inputs[handle].value = values[handle];
			});

			// fire change event for form after value set
			el.noUiSlider.on("end", (values, handle) => {
				const evt = new Event("input", { bubbles: true }),
					input = inputs[handle];
				input.dispatchEvent(evt);
				// const evt = new Event("change"),
				// 	form = el.closest("form");
				// form.dispatchEvent(evt);
			});
		}
	});

	// reset on filter clear
	const resetBtn = document.querySelector(".js-filter-reset");
	if (!resetBtn) return;

	resetBtn.addEventListener("click", () => {
		const form = resetBtn.closest("form"),
			rangeSliders = form.querySelectorAll('[data-range="rangeslider"]');
		if (!rangeSliders.length) return;
		rangeSliders.forEach((el) => {
			if (el) {
				el.noUiSlider.set([0, 999999999]);
				// el.noUiSlider.reset();
			}
		});
	});
}

export function filterShow() {
	document.addEventListener("click", (e) => {
		const filterClass = "filter",
			filterBlock = document.querySelector(`.${filterClass}`),
			filterShow = e.target.closest(".js-filter-show"),
			isActiveClass = "is-active";

		if (!filterBlock) return;

		if (filterShow) {
			overlay(1);
			filterBlock.classList.add(isActiveClass);
			return;
		}

		if (filterBlock.classList.contains(isActiveClass) && !filterBlock.contains(e.target)) {
			filterBlock.classList.remove(isActiveClass);
			overlay(0);
		}
	});
}

export function filterTagsSet() {
	const filterForm = document.getElementById("filter-form"),
		fGroups = document.querySelectorAll(".filter-group"),
		tagsContainer = document.querySelector(".catalog-bar__tags"),
		tagsObj = {};

	if (!filterForm) return;

	fGroups.forEach((gr) => {
		const header = gr.querySelector(".filter-group__header").textContent,
			checkboxes = gr.querySelectorAll("input[type='checkbox']:checked"),
			rangesliders = gr.querySelectorAll(".rangeslider"),
			rangeArr = [],
			checkedArr = [];

		if (checkboxes.length + rangesliders.length == 0) return;

		if (rangesliders.length) {
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
				if (rangeArr.length) Object.assign(tagsObj, { [header]: rangeArr });
			});
		}

		if (checkboxes.length) {
			checkboxes.forEach((el) => {
				const elGroup = el.closest(".filter-group").dataset.propId,
					elName = el.name,
					elTitle = el.parentNode.title;
				checkedArr.push({ title: elTitle, group: elGroup, name: elName });
			});
		}

		if (checkedArr.length) Object.assign(tagsObj, { [header]: checkedArr });
	});

	let createTagsList = (obj) => {
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
	};

	tagsContainer.innerHTML = createTagsList(tagsObj);
}

export function filterTagsRemove() {
	document.addEventListener("click", (e) => {
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

			if (checked.length) {
				checked.forEach((el) => (el.checked = false));
			}

			if (rangeSlider) {
				rangeSlider.noUiSlider.set([0, 999999999]);
			}

			filterTagsSet();
			filterForm.dispatchEvent(new Event("submit"));
			// filterForm.requestSubmit(); 90.46% supported
		}
	});
}

export function filterCollapseHandler() {
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

export function filterFetches() {
	const filter = document.querySelector(".filter"),
		filterForm = document.getElementById("filter-form"),
		filterReset = document.querySelector(".js-filter-reset"),
		sortBtns = document.querySelectorAll("input[name='sort']"),
		itemsContainer = document.querySelector(".content_columns");

	if (!filter) return;

	let fetchByFilter = async () => {
		let filterMobile = document.querySelector(".filter.is-active"),
			formData = new FormData(filterForm),
			url = filterForm.action;

		let ranges = filterForm.querySelectorAll(".input-min, .input-max");

		ranges.forEach((el) => {
			if(el.value.replace(/[^0-9]+/g, "") == el.dataset.default) {
				formData.delete(el.name);
			}
		});

		// loader start +++ filter @mobile
		fetchLoader([itemsContainer, filterMobile], "start");

		// step 1: get filter url based on filter selected
		let response = await fetch(url, {
			method: "POST",
			body: formData,
		});

		// break if new url not recieved
		let result = await response.json();

		try {
			if (result.url) filterForm.action = result.url;
			else throw new Error("url is empty");
		} catch (e) {
			console.log(e);
			fetchLoader(itemsContainer, "stop");
			return;
		}

		setWindowLocation(result.url);

		// step 2: get page chunks
		let postData = new FormData();
		postData.append("trigger", "filterGetInfo");
		response = await fetch(result.url, {
			method: "POST",
			body: postData,
		});
		result = await response.json();

		// step 3: update page chunks
		try {
			if (result.status === true && result.chunks) updateChunks(result.chunks);
			else throw new Error("chunks response is incorrect");
		} catch (e) {
			console.log(e);
			fetchLoader(itemsContainer, "stop");
			return;
		}

		reinitFilterResults();

		// loader finish
		fetchLoader(itemsContainer, "stop");
	};

	let fetchByUrl = async (obj) => {
		if (!obj) return;

		// let amp = filterForm.action.includes("?") ? "&" : "?",
		// 	query = amp + new URLSearchParams(obj).toString(),
		// 	url = filterForm.action + query;

		let url = filterForm.action;

		fetchLoader(itemsContainer, "start");

		// step 1: fetch get
		let postData = new FormData();
		postData.append("trigger", "sort");

		Object.keys(obj).forEach((key) => {
			postData.append(key, obj[key]);
		});

		let response = await fetch(url, {
			method: "POST",
			body: postData,
		});
		let result = await response.json();

		// step 2: update page chunks
		if (result.status === true) {
			// update action if new url recieved
			if (result.url) {
				filterForm.action = result.url;
				setWindowLocation(result.url);
			}

			if (result.chunks) {
				updateChunks(result.chunks);
			}
		}

		reinitFilterResults();

		// loader finish
		fetchLoader(itemsContainer, "stop");
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
			if (result.url) {
				filterForm.action = result.url;
				setWindowLocation(result.url);
			}

			if (result.products) {
				// target.innerHTML += result; -- bad solution (target div flickering)
				let div = document.createElement("div");
				div.innerHTML = result.products;

				div.childNodes.forEach((i) => {
					target.appendChild(i);
				});
			}

			if (result.chunks) {
				updateChunks(result.chunks);
			}
		}

		reinitFilterResults();

		btnLoader(btn, "stop");
	};

	let updateChunks = (obj) => {
		if (!obj) return;

		Object.entries(obj).forEach(([key, value]) => {
			let target = document.querySelector(`[data-id=${key}]`);
			if (!target) {
				console.log(`data-id ${key} not found`);
				return;
			}
			target.innerHTML = value;
		});
	};

	let reinitFilterResults = () => {
		try {
			carouselsInit();
			catalogItemGalleriesInit();
			catalogItemGalleryHandler();
			rangeSlidersInit();
			productProps();
			productPropsHoverHandler();
		} catch (e) {}
	};

	if (filter) {
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
			if (checked.length) {
				checked.forEach((el) => (el.checked = false));
			}
			filterTagsSet();
			resetFlag.value = "Y";
			fetchByFilter();
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
		document.addEventListener("click", (e) => {
			const btn = e.target.closest(".js-load-more");
			if (!btn) return;
			fetchByMoreBtn(btn);
		});
	}
}
