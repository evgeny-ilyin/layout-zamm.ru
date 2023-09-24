import * as functions from "./modules/functions.js";
import * as product from "./modules/product.js";

import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";
import "./modules/fancyapps.js";


addEventListener("DOMContentLoaded", () => {
	functions.mobileCheck();
	functions.stickyHeader();
	// functions.isTouchEnabled();
	// functions.dropdownByTouch();
	functions.mobileCatalog();
	functions.searchForm();
	functions.closeModal();
	functions.accordion();
	functions.ideaMarkerShow();
	functions.ideaPopupPlace();
	useDynamicAdapt();
	

	product.productGallery();
	product.productFavourite();
	product.productLoadProps();
	product.productProps();
	// product helpers
	product.setGalleryActive();
	product.isPropOverflowX();
	product.productPropCollapseHandler();
});


