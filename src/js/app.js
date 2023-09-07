import * as functions from "./modules/functions.js";

import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import "./modules/cookies.js";
import "./modules/fancyapps.js";

addEventListener("DOMContentLoaded", () => {
	// functions.stickyHeader();
	// functions.isTouchEnabled();
	// functions.dropdownByTouch();
	functions.mobileCatalog();
	functions.searchForm();
	functions.closeModal();
	functions.accordion();
	useDynamicAdapt();
});
