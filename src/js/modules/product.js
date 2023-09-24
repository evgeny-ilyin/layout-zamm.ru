/** product item at catalog list */
export function productGallery() {
	const catalogItems = document.querySelector(".catalog-items"),
		carouselItems = document.querySelector(".product-carousel"),
		gBlocks = document.querySelectorAll(".item__gallery-wrapper"),
		isActiveClass = "is-active";

	if (!gBlocks) return;
	gBlocks.forEach((b) => {
		window.addEventListener("load", () => {
			setGalleryActive(b);
		});
	});

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

	catalogItems.addEventListener("mouseover", (e) => {
		const item = e.target.closest(".item");
		if (!item) return;

		item.addEventListener("mouseenter", () => {
			const url = item.dataset.url,
				details = item.querySelector(".item__details");

			if (details.innerHTML.trim().length > 0) return;

			(async () => {
				let response = await fetch(url);
				let result = await response.text();

				details.innerHTML = result;

				if (!result) return;

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
			setGalleryActive(item);
			productPropCollapseHandler(item);
		})();
	});
}

export function setGalleryActive(item) {
	if (!item) return;
	const isActiveClass = "is-active";
	item.querySelector(".item__gallery-item").classList.add(isActiveClass);
}

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
