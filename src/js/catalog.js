import { productPropsHover, productProps, productFetches, filterTagsSet, filterTagsRemove } from "./modules/product.js";
import { rangeSlidersInit } from "./modules/nouislider.js";

addEventListener("DOMContentLoaded", () => {
	rangeSlidersInit();

	productPropsHover();
	productProps();
	productFetches();

	filterTagsSet();
	filterTagsRemove();
});
