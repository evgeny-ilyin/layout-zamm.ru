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
						console.error(e);
						return;
					}
				})();
			}

			let update = (result, where) => {
				Object.entries(result.chunks).forEach(([key, value]) => {
					if (value.length) {
						let target = where.querySelector(`[data-id=${key}]`);
						if (!target) {
							// console.log(`data-id ${key} not found`);
							return;
						}
						target.innerHTML = value;
					}
				});
			};
		});
	};
}