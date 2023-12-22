import * as fn from "./modules/filter.js";

addEventListener("DOMContentLoaded", () => {
	fn.rangeSlidersInit();
	fn.filterShow();
	fn.filterTagsSet();
	fn.filterTagsRemove();
	fn.filterFetches();
});
