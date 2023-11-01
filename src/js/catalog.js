import * as functions from "./modules/functions.js";
import * as fancyapps from "./modules/fancyapps.js";
import { catalogItemGalleriesInit, catalogItemGallery, addToFavourites } from "./modules/product.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";

// catalog
import { rangeSlidersInit } from "./modules/nouislider.js";
import { catalogItemPropsHover, productProps, productFetches, filterTagsSet, filterTagsRemove } from "./modules/product.js";

// card
import { productAmount, productBlockCollapseHandler, productAllPhotosShow } from "./modules/product.js";


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
	functions.ideaPopupShow();
	functions.ideaPopupPlace();
	functions.blockObserver();

	fancyapps.carouselsInit();

	catalogItemGalleriesInit();
	catalogItemGallery();
	addToFavourites();


	// catalog
	rangeSlidersInit();
	catalogItemPropsHover();
	productProps();
	productFetches();
	filterTagsSet();
	filterTagsRemove();

	// card
	productAmount();
	productBlockCollapseHandler();
	productAllPhotosShow();
});
