import "./modules/common-global.js";
import { useDynamicAdapt } from "./modules/common-dynamicAdapt.js";
import { fileInputInit } from "./modules/form-custom-file-input.js";
import "./modules/form-custom-select.js";
import * as fn from "./modules/common.js";
import * as form from "./modules/form-submit.js";
import { globalForm } from "./modules/form-submit.js";
import "./modules/common-cookies.js";

addEventListener("DOMContentLoaded", () => {
	isTouchDevice();
	showHidden();
	setActive();
	catalogItemGalleriesInit();
	catalogItemGalleryHandler();
	useDynamicAdapt();
	setFavourites();
	loadMore();
	selectsInit();
	fileInputInit();
	tagsCollapseHandler();

	fn.stickyHeader();
	fn.hamburgerMenu();
	fn.submenuPostionOnOverflowNav();
	fn.modalHandler();
	fn.edgePopupHandler();
	fn.sectionClose();
	fn.collapseHandler();
	fn.collapseTargetHandler();
	fn.searchForm();
	fn.inputFetch();
	fn.inputQuickSearch();
	fn.accordion();
	fn.accordionFooter();
	fn.dropdownShow();
	fn.dropdownClose();
	fn.contentGalleryPopup();
	fn.changeAmount();
	fn.getContent();
	fn.clickAndDrag();

	form.submitPrevent();
	form.maskHandler();

	Object.assign(window, { globalForm });
	globalForm.validation();
});
