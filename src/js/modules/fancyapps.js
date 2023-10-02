import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";

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

addEventListener("DOMContentLoaded", () => {
	const carousels = document.querySelectorAll('[data-carousel="carousel"]');
	carousels.forEach((el) => {
		if (el) {
			let options = {};
			let autoplay = {};
			let navigation = {};
			let breakpoints = {};
			// console.log(Object.keys( el.dataset ));

			if (el.dataset.options) {
				options = JSON.parse(el.dataset.options);
			}

			if (el.dataset.autoplay) {
				autoplay = Object.assign(autoplay, { Autoplay: { timeout: parseInt(el.dataset.autoplay) } });
			}

			if (el.dataset.disabled) {
				breakpoints = Object.assign(breakpoints, { breakpoints: { [`(${el.dataset.disabled})`]: { enabled: false } } });
			}

			if (el.classList.contains("carousel-top-nav")) {
				const n = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M10.452 1 18 9m0 0-7.548 8M18 9H0"/></svg>`,
					p = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path d="M8.548 1 1 9m0 0 7.548 8M1 9h18"/></svg>`;
				navigation = Object.assign(navigation, { Navigation: { nextTpl: n, prevTpl: p } });
			}

			let opt = Object.assign(options, autoplay, navigation, breakpoints);

			if (Object.keys(autoplay).length > 0 && autoplay.constructor === Object) {
				new Carousel(el, opt, { Autoplay });
			} else {
				new Carousel(el, opt);
			}
		}
	});
});
