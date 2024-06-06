if (!window.carouselsInit) {
	window.carouselsInit = (el = false) => {
		const fRU = {
			NEXT: " ",
			PREV: " ",
			GOTO: "Перейти к слайду #%d",
		};

		Carousel.defaults.infinite = false;
		Carousel.defaults.center = false;
		Carousel.defaults.preload = 1;
		Carousel.defaults.slidesPerPage = 1;
		// Carousel.defaults.dragFree = true;
		Carousel.defaults.l10n = fRU;
		Carousel.defaults.Thumbs = {
			type: "classic",
		};

		const next = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M10.452 1 18 9m0 0-7.548 8M18 9H0"/></svg>`,
			prev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M8.548 1 1 9m0 0 7.548 8M1 9h18"/></svg>`;

		let carousels = el ? el.querySelectorAll('[data-carousel="carousel"]') : document.querySelectorAll('[data-carousel="carousel"]');

		carousels.forEach((carousel) => {
			if (carousel.classList.contains("is-ltr")) {
				// already initialized
				return;
			}

			let options = {};
			let autoplay = {};
			let thumbs = {};
			let plugins = {};
			let navigation = {};
			let breakpoints = {};
			let on = {
				on: {
					initLayout: (c) => {
						realDragDetect(c.container);
					},
				},
			};
			let thumbsOptions = {};
			let thumbsOptionsVertical = {
				Carousel: {
					axis: "y",
				},
			};

			// console.log(Object.keys( carousel.dataset ));

			if (carousel.dataset.options) {
				options = JSON.parse(carousel.dataset.options);
			}

			if (carousel.dataset.autoplay) {
				Object.assign(autoplay, { Autoplay: { timeout: parseInt(carousel.dataset.autoplay) } });
				Object.assign(plugins, { Autoplay });
			}

			if (carousel.dataset.thumbsVertical == "true") {
				thumbsOptions = thumbsOptionsVertical;
			}

			// thumbs only for breakpoint
			if (carousel.dataset.thumbs == "true" && carousel.dataset.thumbsMedia) {
				Object.assign(options, { Thumbs: false });
				Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.thumbsMedia})`]: { Thumbs: thumbsOptions } } });
				Object.assign(plugins, { Thumbs });
			}

			// thumbs when data-thumbs="true"
			if (carousel.dataset.thumbs == "true" && !carousel.dataset.thumbsMedia) {
				Object.assign(thumbs, { Thumbs: thumbsOptions });
				Object.assign(plugins, { Thumbs });
			}

			if (carousel.dataset.disabled) {
				Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.disabled})`]: { enabled: false } } });
			}

			if (carousel.dataset.dotsMediaDisable) {
				Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.dotsMediaDisable})`]: { Dots: false } } });
			}

			if (carousel.classList.contains("carousel-top-nav")) {
				Object.assign(navigation, { Navigation: { nextTpl: next, prevTpl: prev } });
			}

			Object.assign(options, autoplay, thumbs, navigation, breakpoints, on);

			if (Object.keys(plugins).length > 0 && plugins.constructor === Object) {
				new Carousel(carousel, options, plugins);
			} else {
				new Carousel(carousel, options);
			}
		});

		// product main photo gallery
		let productPhotos = document.getElementById("productPhotos");

		if (productPhotos && !productPhotos.classList.contains("is-ltr")) {
			// exist and not initialized yet
			new Carousel(
				productPhotos,
				{
					transition: "classic",
					slidesPerPage: 1,
					preload: 3,
					Navigation: true,
					Dots: true,
					Thumbs: false,
					breakpoints: {
						"(min-width: 1280px)": {
							Navigation: false,
							Dots: false,
							Thumbs: {
								type: "classic",
								Carousel: {
									Navigation: {
										nextTpl: next,
										prevTpl: prev,
									},
									axis: "y",
								},
							},
						},
					},
					on: {
						load: (instance) => {
							thumbIcon(productPhotos, instance)
						},
					},
				},
				{ Thumbs }
			);
		}

		// popup galleries like a product main photo gallery
		let popupGalleries = document.querySelectorAll(".js-popup-gallery-wrap");

		popupGalleries.forEach((gallery) => {
			if (gallery.classList.contains("is-ltr")) {
				// already initialized
				return;
			}

			new Carousel(
				gallery,
				{
					transition: "classic",
					preload: 3,
					Navigation: false,
					Thumbs: false,
					breakpoints: {
						"(min-width: 1024px)": {
							Dots: false,
							Thumbs: {
								type: "classic",
								Carousel: {
									Navigation: {
										nextTpl: next,
										prevTpl: prev,
									},
									axis: "y",
								},
							},
						},
					},
					on: {
						"*": (instance) => {
							thumbIcon(gallery, instance)
						},
					},
				},
				{ Thumbs }
			);
		});
	};
}

function thumbIcon(gallery, instance) {
	let slides = instance.slides;
	slides.forEach((slide) => {
		if (slide.el.getAttribute("data-video") === "true") {
			let index = slide.el.getAttribute("data-index");
			gallery.parentElement.querySelectorAll(`.f-thumbs__slide[data-index="${index}"]`).forEach((e) => e.classList.add("thumb-video"));
		}
	});
}

/**
 * Функция для фильтрации ложного срабатывания перетаскивания на карусели продуктов.
 * Нужна для правильной отработки скрытия item__details в момент начала перетаскивания слайда.
 * Иначе случаются ложно-позитивные срабатывания перетаскивания при кликах на sku.
 */
function realDragDetect(carousel) {
	if (carousel.classList.contains("product-carousel")) {
		const target = carousel.querySelector(".f-carousel__viewport"),
			isDraggingClass = "is-dragging",
			realDraggingClass = "is-real-dragging";

		const config = {
			attributes: true,
		};

		const realDragging = function () {
			if (target.classList.contains(isDraggingClass)) {
				target.classList.add(realDraggingClass);
			} else {
				target.classList.remove(realDraggingClass);
			}
		};

		const callback = function (mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.attributeName === "class") {
					if (mutation.target.classList.contains(isDraggingClass)) {
						setTimeout(realDragging, 100);
					}
				}
			}
		};

		const observer = new MutationObserver(callback);

		observer.observe(target, config);

		// observer.disconnect();
	}
}
