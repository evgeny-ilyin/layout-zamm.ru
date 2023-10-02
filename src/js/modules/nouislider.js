import noUiSlider from "nouislider";
import wNumb from "wnumb";

addEventListener("DOMContentLoaded", () => {
	const rangeSliders = document.querySelectorAll('[data-range="rangeslider"]');
	rangeSliders.forEach((el) => {
		if (el) {
			let min = parseInt(el.dataset.min);
			let max = parseInt(el.dataset.max);
			let step = parseInt(el.dataset.step);

			noUiSlider.create(el, {
				start: [min, max],
				range: { min: min, max: max },
				step: step,
				connect: true,
				format: wNumb({
					decimals: 0,
					thousand: " ",
				}),
			});

			let inputs = [el.parentNode.querySelector(".input-min"), el.parentNode.querySelector(".input-max")];

			el.noUiSlider.on("update", function (values, handle) {
				inputs[handle].value = values[handle];
				// change event for reset btn
				const evt = new Event("change"),
					form = el.closest("form");
				form.dispatchEvent(evt);
			});
		}
	});

	// reset on filter clear
	const resetBtn = document.querySelector(".js-reset-form");
	if (!resetBtn) return;

	resetBtn.addEventListener("click", () => {
		const form = resetBtn.closest("form"),
			rangeSliders = form.querySelectorAll('[data-range="rangeslider"]');
		rangeSliders.forEach((el) => {
			if (el) {
				el.noUiSlider.reset();
			}
		});
	});
});
