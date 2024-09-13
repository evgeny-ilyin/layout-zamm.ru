import * as form from "./modules/form-submit.js";
import { globalForm } from "./modules/form-submit.js";

addEventListener("DOMContentLoaded", () => {
	form.submitPrevent();
	form.maskHandler();

	Object.assign(window, { globalForm });
	globalForm.validation();
});
