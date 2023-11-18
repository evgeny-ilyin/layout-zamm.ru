import * as fn from "./modules/product-card.js";
import "./modules/product-card-global.js";

addEventListener("DOMContentLoaded", () => {
	fn.productAmount();
	fn.productAllPhotosShow();
	productBlockCollapseHandler();
});
