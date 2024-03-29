import "./product-card-global.js";
import "./product-props.js";
import "./tabs.js";

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
