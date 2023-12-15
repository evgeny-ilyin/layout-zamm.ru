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
						}

						catalogItemGalleriesInit(item);
						productPropsCollapseHandler(item);

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
						}

						tabsInit();
						carouselsInit();

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
