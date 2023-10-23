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
	// adaptiveHeight: true,
};

export function carouselsInit(el = false) {
	const carousels = el ? el.querySelectorAll('[data-carousel="carousel"]') : document.querySelectorAll('[data-carousel="carousel"]');

	carousels.forEach((carousel) => {
		if (carousel) {
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

			if (carousel.dataset.thumbs) {
				Object.assign(thumbs, { Thumbs: { type: carousel.dataset.thumbs } });
				Object.assign(plugins, { Thumbs });
			}

			if (carousel.dataset.disabled) {
				Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.disabled})`]: { enabled: false } } });
			}

			if (carousel.dataset.thumbsOn && carousel.dataset.thumbsType) {
				Object.assign(breakpoints, { breakpoints: { [`(${carousel.dataset.thumbsOn})`]: { Thumbs: { type: carousel.dataset.thumbsType } } } });
				Object.assign(plugins, { Thumbs });
			}

			if (carousel.classList.contains("carousel-top-nav")) {
				const n = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M10.452 1 18 9m0 0-7.548 8M18 9H0"/></svg>`,
					p = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M8.548 1 1 9m0 0 7.548 8M1 9h18"/></svg>`;
				Object.assign(navigation, { Navigation: { nextTpl: n, prevTpl: p } });
			}

			Object.assign(options, autoplay, thumbs, navigation, breakpoints);

			if (Object.keys(plugins).length > 0 && plugins.constructor === Object) {
				new Carousel(carousel, options, plugins);
			} else {
				new Carousel(carousel, options);
			}
		}
	});
}
