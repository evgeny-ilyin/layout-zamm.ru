import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";

addEventListener("DOMContentLoaded", () => {
	// Карусели
	Carousel.defaults = {
		...Carousel.defaults,
		infinite: false,
		// adaptiveHeight: true,
	};

	// Карусели
	const carousels = document.querySelectorAll('[data-carousel="carousel"]');
	carousels.forEach((el) => {
		if (el) {
			// console.log(Object.keys( el.dataset ));
			let options = JSON.parse(el.dataset.options);
			// console.log(options);
			new Carousel(el, options);
		}
	});

	// // Карусель в детальной новости
	// const newsElementContainer = document.getElementById("newsElementCarousel");
	// if (newsElementContainer) {
	// 	new Carousel(newsElementContainer);
	// }
});
