import * as functions from "./modules/functions.js";
import * as product from "./modules/product.js";
import * as fancyapps from "./modules/fancyapps.js";
import * as rangeslider from "./modules/nouislider.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";
import "./modules/modal.js";

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

	fancyapps.carouselsInit();
	rangeslider.rangeSlidersInit();

	product.productGalleriesInit();
	product.productGallery();
	product.productFavourite();
	product.productPropsHover();
	product.productProps();
	product.productFetches();

	product.filterTagsSet();
	product.filterTagsRemove();
});
