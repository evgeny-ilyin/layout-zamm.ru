import * as functions from "./modules/functions.js";
import * as fancyapps from "./modules/fancyapps.js";
import { productGalleriesInit, productGallery, productFavourite } from "./modules/product.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";

addEventListener("DOMContentLoaded", () => {
	useDynamicAdapt();
	
	functions.stickyHeader();
	functions.mobileCatalog();
	functions.searchForm();
	functions.sectionClose();
	functions.sectionShow();
	functions.dropdownClose();
	functions.dropdownShow();
	functions.overlayClick();
	functions.collapseHandler();
	functions.accordion();
	functions.accordionFooter();
	functions.ideaMarkerShow();
	functions.ideaPopupPlace();

	fancyapps.carouselsInit();

	productGalleriesInit();
	productGallery();
	productFavourite();
});
