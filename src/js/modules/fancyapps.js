import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

addEventListener("DOMContentLoaded", () => {
	// Карусели
	Carousel.defaults = {
		...Carousel.defaults,
		infinite: false,
		adaptiveHeight: true,
	};

	// // Карусели в модальных окнах
	// const modalCarousels = document.querySelectorAll(".modal_carousel .f-carousel");
	// modalCarousels.forEach((el) => {
	// 	let carousel = document.getElementById(el.id);
	// 	if (carousel) {
	// 		new Carousel(carousel);
	// 	}
	// });

	// // Карусель в детальной новости
	// const newsElementContainer = document.getElementById("newsElementCarousel");
	// if (newsElementContainer) {
	// 	new Carousel(newsElementContainer);
	// }
});
