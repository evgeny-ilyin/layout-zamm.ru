import * as functions from "./modules/functions.js";
import * as fancyapps from "./modules/fancyapps.js";
import { productGalleriesInit, productGallery, productFavourite } from "./modules/product.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";

// catalog
import { rangeSlidersInit } from "./modules/nouislider.js";
import { productPropsHover, productProps, productFetches, filterTagsSet, filterTagsRemove } from "./modules/product.js";

// card
import { productAmount, productBlockCollapseHandler } from "./modules/product.js";


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
	functions.tabsInit();
	functions.tabsHandler();
	functions.ideaMarkerShow();
	functions.ideaPopupPlace();
	functions.blockObserver();
	functions.tabsInit();

	fancyapps.carouselsInit();

	productGalleriesInit();
	productGallery();
	productFavourite();


	// catalog
	rangeSlidersInit();
	productPropsHover();
	productProps();
	productFetches();
	filterTagsSet();
	filterTagsRemove();

	// card
	productAmount();
	productBlockCollapseHandler();
});
