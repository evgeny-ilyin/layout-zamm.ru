import * as functions from "./modules/functions.js";
import * as fancyapps from "./modules/fancyapps.js";
import { catalogItemGalleriesInit, catalogItemGallery, addToFavourites } from "./modules/product.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";

addEventListener("DOMContentLoaded", () => {
	useDynamicAdapt();

	functions.stickyHeader();
	functions.hamburgerMenu();
	functions.searchForm();
	functions.modalHandler();
	// functions.sectionShow();
	functions.sectionClose();
	functions.dropdownClose();
	functions.dropdownShow();
	// functions.overlayClick();
	functions.collapseHandler();
	functions.accordion();
	functions.accordionFooter();
	functions.tabsInit();
	functions.tabsHandler();
	functions.ideaPopupShow();
	functions.ideaPopupPlace();
	functions.blockObserver();
	functions.userInputQuery();
	functions.userInputQuickSearch();

	fancyapps.carouselsInit();

	catalogItemGalleriesInit();
	catalogItemGallery();
	addToFavourites();
});
