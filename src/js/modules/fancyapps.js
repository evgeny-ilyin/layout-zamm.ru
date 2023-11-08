import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";

const fRU = {
	NEXT: " ",
	PREV: " ",
	GOTO: "Перейти к слайду #%d",
};

Carousel.defaults = {
	...Carousel.defaults,
	infinite: false,
	center: false,
	slidesPerPage: 1,
	l10n: fRU,
	Thumbs: {
		type: "classic",
	},
};

export function carouselsInit(el = false) {
	const next = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M10.452 1 18 9m0 0-7.548 8M18 9H0"/></svg>`,
		prev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M8.548 1 1 9m0 0 7.548 8M1 9h18"/></svg>`;

	const carousels = el ? el.querySelectorAll('[data-carousel="carousel"]') : document.querySelectorAll('[data-carousel="carousel"]');

	carousels.forEach((carousel) => {
		let options = {};
		let autoplay = {};
		let thumbs = {};
		let plugins = {};
		let navigation = {};
		let breakpoints = {};
		// console.log(Object.keys( carousel.dataset ));

		if (carousel.dataset.options) {
			options = JSON.parse(carousel.dataset.options);
		}

		if (carousel.dataset.autoplay) {
			Object.assign(autoplay, { Autoplay: { timeout: parseInt(carousel.dataset.autoplay) } });
			Object.assign(plugins, { Autoplay });
		}

		// thumbs only for breakpoint
		if (carousel.dataset.thumbs == "true" && carousel.dataset.thumbsMedia) {
			Object.assign(options, { Thumbs: false });
			Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.thumbsMedia})`]: { Thumbs: {} } } });
			Object.assign(plugins, { Thumbs });
		}

		// thumbs when data-thumbs="true"
		if (carousel.dataset.thumbs == "true" && !carousel.dataset.thumbsMedia) {
			Object.assign(thumbs, { Thumbs: {} });
			Object.assign(plugins, { Thumbs });
		}

		if (carousel.dataset.disabled) {
			Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.disabled})`]: { enabled: false } } });
		}

		if (carousel.classList.contains("carousel-top-nav")) {
			Object.assign(navigation, { Navigation: { nextTpl: next, prevTpl: prev } });
		}

		Object.assign(options, autoplay, thumbs, navigation, breakpoints);

		if (Object.keys(plugins).length > 0 && plugins.constructor === Object) {
			new Carousel(carousel, options, plugins);
		} else {
			new Carousel(carousel, options);
		}
	});

	const productPhotos = document.getElementById("productPhotos");

	if (!productPhotos || productPhotos.classList.contains("is-ltr")) {
		// not exist or already initialized
		return;
	}

	new Carousel(
		productPhotos,
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
		},
		{ Thumbs }
	);
}
