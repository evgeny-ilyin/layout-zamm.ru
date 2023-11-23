import "./modules/common-global.js";
import * as fn from "./modules/common.js";
import { useDynamicAdapt } from "./modules/common-dynamicAdapt.js";
import "./modules/common-cookies.js";

addEventListener("DOMContentLoaded", () => {
	isTouchDevice();
	catalogItemGalleriesInit();
	catalogItemGalleryHandler();
	useDynamicAdapt();

	fn.stickyHeader();
	fn.hamburgerMenu();
	fn.modalHandler();
	fn.sectionClose();
	fn.searchForm();
	fn.inputFetch();
	fn.inputQuickSearch();
	fn.accordion();
	fn.accordionFooter();
	fn.dropdownClose();
	fn.dropdownShow();
});
