import { showSkeleton, useLoader, btnLoader, getScrollbarWidth } from "./functions.js";
import { carouselsInit } from "./fancyapps.js";
import { rangeSlidersInit } from "./nouislider.js";

/** products at catalog list */
export function addToFavourites() {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-fav"),
			isActiveClass = "is-active";
		if (!btn) return;

		const id = btn.dataset.id,
			url = btn.dataset.url,
			data = { id: id };

		(async () => {
			try {
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
					btn.parentElement.classList.toggle(isActiveClass);
				}
			} catch (e) {
				console.log(e);
				return;
			}
		})();
	});
}

export function catalogItemGalleriesInit(item = false) {
	const isActiveClass = "is-active";

	if (item) {
		item.querySelector(".item__gallery-item").classList.add(isActiveClass);
		return;
	}

	const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel");

	galleryItems.forEach((el) => {
		if (!el) return;

		let items = el.querySelectorAll(".item");
		// if (!items) return;
		items.forEach((i) => {
			i.querySelector(".item__gallery-item").classList.add(isActiveClass);
		});
	});
}

export function catalogItemGallery() {
	const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel"),
		isActiveClass = "is-active";

	galleryItems.forEach((el) => {
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

export function catalogItemPropsHover() {
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
				try {
					let response = await fetch(url);
					if (!response.ok) {
						return;
					}
					let result = await response.text();
					details.innerHTML = "";
					details.innerHTML = result;
					productPropCollapseHandler(item);
				} catch (e) {
					console.log(e);
					return;
				}
			})();
		});
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
	}

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

			if (checked.length > 0) {
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

export function productProps() {
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
					useLoader([item, details], "start");

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
					productPropCollapseHandler(item);

					useLoader([item, details], "stop");
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
					useLoader([card], "start");
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
					// catalogItemGalleriesInit(card);
					// productPropCollapseHandler(card);
					useLoader([card], "stop");
				} catch (e) {
					console.log(e);
					return;
				}
			})();
		}

		let update = (result, where) => {
			Object.entries(result.chunks).forEach(([key, value]) => {
				if (value.length > 0) {
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
}

export function productFetches() {
	const filter = document.querySelector(".filter"),
		filterForm = document.getElementById("filter-form"),
		filterReset = document.querySelector(".js-filter-reset"),
		sortBtns = document.querySelectorAll("input[name='sort']"),
		itemsContainer = document.querySelector(".content_columns"),
		productPage = document.querySelector(".product");

	if (!filter && !productPage) return;

	let fetchByFilter = async () => {
		let filterMobile = document.querySelector(".filter.is-active"),
			formData = new FormData(filterForm),
			url = filterForm.action;

		let formDataObject = Object.fromEntries(formData.entries());

		// loader start +++ filter @mobile
		useLoader([itemsContainer, filterMobile], "start");

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

		try {
			if (result.url) filterForm.action = result.url;
			else throw new Error("url is empty");
		} catch (e) {
			console.log(e);
			useLoader(itemsContainer, "stop");
			return;
		}

		setWindowLocation(result.url);

		// step 2: get page chunks
		response = await fetch(result.url);
		result = await response.json();

		// step 3: update page chunks
		try {
			if (result.status === true && result.chunks) updateChunks(result.chunks);
			else throw new Error("chunks response is incorrect");
		} catch (e) {
			console.log(e);
			useLoader(itemsContainer, "stop");
			return;
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
		useLoader(itemsContainer, "start");

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

			if (result.chunks) {
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

		reinitFetchesResults();

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

	let reinitFetchesResults = () => {
		carouselsInit();
		catalogItemGalleriesInit();
		catalogItemGallery();
		rangeSlidersInit();
	};

	let addToCart = (btn) => {
		const form = btn.closest("form") || btn.closest(".item__props").querySelector("form"),
			inCartClass = "in-cart";

		let formData = new FormData(form),
			data = {},
			params = {},
			url = btn.dataset.url,
			id = btn.dataset.id;

		let formDataObject = Object.fromEntries(formData.entries());

		data = { id: id };

		if (btn.dataset.params) {
			params = JSON.parse(btn.dataset.params);
		}

		Object.assign(data, params, formDataObject);

		(async () => {
			try {
				btnLoader(btn);

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
					btn.classList.add(inCartClass);

					let target = document.querySelector(`[data-id="amount"]`);
					if (!target) {
						console.log(`data-id amount not found`);
						return;
					}
					target.dataset.amount = result.amount;
				}

				btnLoader(btn, "stop");
			} catch (e) {
				console.log(e);
				return;
			}
		})();
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
			if (checked.length > 0) {
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

	// btn "add to cart"
	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-add-to-cart")) {
			let btn = e.target.closest(".js-add-to-cart"),
				inCartClass = "in-cart";
			if (!btn) return;

			if (btn.classList.contains(inCartClass)) {
				if (btn.dataset.cart) {
					window.location.assign(btn.dataset.cart);
					return;
				}
			}

			addToCart(btn);
		}
	});

	// amount to cart
	document.addEventListener("change", (e) => {
		if (e.target.name == "amount") {
			let btn = e.target.closest(".product__purchase").querySelector(".js-add-to-cart");
			if (!btn) return;
			addToCart(btn);
		}
	});
}

export function productAmount() {
	const product = document.querySelector(".product");
	if (!product) return;

	product.addEventListener("click", (e) => {
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

export function productBlockCollapseHandler(el) {
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
}

export function productAllPhotosShow() {
	const isActiveClass = "is-active";

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-product-gallery");
		if (!el) return;

		const show = el.dataset.show;
		if (show) {
			const body = document.body,
				header = document.querySelector(".header"),
				target = document.querySelector(`.${show}`),
				offsetTop = target.closest(".container").offsetTop,
				containers = document.querySelectorAll(".container"),
				sw = getScrollbarWidth();

			body.classList.add("noscroll");
			header.classList.remove("is-hidden");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});

			target.classList.add(isActiveClass);
			target.style.top = `${offsetTop}px`;
		}
	});

	window.addEventListener("resize", () => {
		const galleryBtn = document.querySelector(`.js-product-gallery`);
		if (!galleryBtn) return;
		const show = galleryBtn.dataset.show,
			target = document.querySelector(`.${show}`),
			containers = document.querySelectorAll(".container");
		if (target) {
			target.classList.remove(isActiveClass);
			document.body.classList.remove("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = "";
			});
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

function setWindowLocation(url) {
	// TODO @ prod:
	// window.history.pushState("", "", url);
	window.history.pushState("", "", url.replace("https://deviart.ru/zamm/", ""));
}
