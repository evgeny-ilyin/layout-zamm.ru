import "./modules/common-global.js";
import { useDynamicAdapt } from "./modules/common-dynamicAdapt.js";
import { fileInputInit } from "./modules/form-custom-file-input.js";
import "./modules/form-custom-select.js";
import * as fn from "./modules/common.js";
import * as form from "./modules/form-submit.js";
import "./modules/common-cookies.js";

addEventListener("DOMContentLoaded", () => {
	isTouchDevice();
	showHidden();
	catalogItemGalleriesInit();
	catalogItemGalleryHandler();
	useDynamicAdapt();
	setFavourites();
	selectsInit();
	fileInputInit();

	fn.stickyHeader();
	fn.hamburgerMenu();
	fn.modalHandler();
	fn.sectionClose();
	fn.collapseHandler();
	fn.searchForm();
	fn.inputFetch();
	fn.inputQuickSearch();
	fn.accordion();
	fn.accordionFooter();
	fn.dropdownClose();
	fn.dropdownShow();
	fn.contentGalleryPopup();
	fn.changeAmount();

	form.submitPrevent();
	form.maskHandler();
});
