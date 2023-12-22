import { addToCart } from "./modules/product-add-to-cart.js";
import { addToFavourites } from "./modules/product-add-to-favourites.js";

addEventListener("DOMContentLoaded", () => {
	addToCart();
	addToFavourites();
});
