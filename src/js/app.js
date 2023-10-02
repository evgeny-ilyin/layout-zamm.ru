import * as functions from "./modules/functions.js";
import * as product from "./modules/product.js";



addEventListener("DOMContentLoaded", () => {
	functions.stickyHeader();
	// functions.mobileCheck();
	// functions.isTouchEnabled();
	// functions.dropdownByTouch();
	functions.mobileCatalog();
	functions.searchForm();
	functions.sectionClose();
	functions.sectionShow();
	functions.dropdownClose();
	functions.dropdownShow();
	functions.overlayClick();
	functions.collapse();
	functions.accordion();
	functions.accordionFooter();
	functions.ideaMarkerShow();
	functions.ideaPopupPlace();
	useDynamicAdapt();

	product.productGallery();
	product.productFavourite();
	product.productLoadProps();
	product.productProps();
	product.showFilterReset();
	product.resetFilter();

	// product helpers
	product.productGallerySetActive();
	// присутствуют в билде и не требуют импорта?
	// product.isPropOverflowX();
	// product.productPropCollapseHandler();
	// product.showLoader();

	// temp? нужна ли функция для дозагрузки списка товаров на битре?
	product.fetchMoreProducts();
});

import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";
import "./modules/fancyapps.js";
import "./modules/nouislider.js";