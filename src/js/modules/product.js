/** product item at catalog list */
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
		const fav = e.target.closest(".js-fav"),
			isActiveClass = "is-active";
		if (!fav) return;

		const url = fav.dataset.url;

		(async () => {
			let response = await fetch(url);
			let result = await response.json();

			if (result.status === true) {
				fav.parentElement.classList.toggle(isActiveClass);
			}
		})();
	});
}

export function productLoadProps() {
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
					let result = await response.text();
					if (!result) return;
					details.innerHTML = "";
					details.innerHTML = result;
				} catch (err) {
					return;
				}
				productPropCollapseHandler(item);
			})();
		});
	});
}

export function productProps() {
	document.body.addEventListener("change", (e) => {
		const prop = e.target,
			item = prop.closest(".item"),
			form = prop.closest("form");

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
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(body),
			});

			let result = await response.json();

			if (result.status === true) {
				if (Object.keys(result.chunks).length == 0) return;

				Object.entries(result.chunks).forEach(([key, value]) => {
					if (value.length > 0) item.querySelector(`[data-id=${key}]`).innerHTML = value;
				});
			}
			productGallerySetActive(item);
			productPropCollapseHandler(item);
		})();
	});
}

export function productGallerySetActive(item = false) {
	const isActiveClass = "is-active";

	if (item) {
		item.querySelector(".item__gallery-item").classList.add(isActiveClass);
		return;
	}

	// for onload and fetchMoreProducts
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

// product helpers
export function isPropOverflowX(el) {
	return el ? el.scrollWidth > el.clientWidth : false;
}

export function productPropCollapseHandler(item) {
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

export function showSkeleton(where, tpl) {
	if (!where || !tpl) return;
	const template = document.getElementById(tpl);
	where.innerHTML = "";
	where.append(template.content.cloneNode(true));
}

export function showLoader(where) {
	if (!where) return;
	let loader = document.createElement("div");
	loader.classList.add("loader");
	where.innerHTML = "";
	where.append(loader);
}

export function showFilterReset() {
	const form = document.querySelector(".filter form");

	if (!form) return;

	const resetBtn = form.querySelector('button[type="reset"]');
	form.addEventListener("change", () => {
		resetBtn.classList.remove("invisible");
	});
}


//? нужен ли fetch при ресете фильтра
export function resetFilter() {
	const resetBtn = document.querySelector(".js-reset-form"),
		hiddenClass = "invisible";

	if (!resetBtn) return;

	resetBtn.addEventListener("click", () => {
		resetBtn.classList.add(hiddenClass);
	});
}

//? нужна ли функция для дозагрузки списка товаров на битре?
export function fetchMoreProducts() {
	const btn = document.querySelector(".js-load-more");
	if (!btn) return;

	btn.addEventListener("click", () => {
		const url = btn.dataset.url,
			target = document.querySelector(`.${btn.dataset.target}`);

		if (!target) return;

		(async () => {
			let response = await fetch(url);
			let result = await response.text();
			if (!result) return;

			// target.innerHTML += result; -- bad solution (target div flickering)
			let div = document.createElement("div");
			div.innerHTML = result;

			div.childNodes.forEach((i) => {
				target.appendChild(i);
			});

			productGallerySetActive();
		})();
	});
}
