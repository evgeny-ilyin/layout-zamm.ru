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
	l10n: fRU,
	// adaptiveHeight: true,
};

addEventListener("DOMContentLoaded", () => {
	const carousels = document.querySelectorAll('[data-carousel="carousel"]');
	carousels.forEach((el) => {
		if (el) {
			let options = {};
			let autoplay = {};
			// console.log(Object.keys( el.dataset ));

			if (el.dataset.options) {
				options = JSON.parse(el.dataset.options);
			}

			if (el.dataset.autoplay) {
				autoplay = Object.assign(autoplay, { Autoplay: { timeout: parseInt(el.dataset.autoplay) } });
			}

			let opt = Object.assign(options, autoplay);

			if (Object.keys(autoplay).length > 0 && autoplay.constructor === Object) {
				new Carousel(el, opt, { Autoplay });
			} else {
				new Carousel(el, opt);
			}
		}
	});
});
