import noUiSlider from "nouislider";
import wNumb from "wnumb";

export function rangeSlidersInit() {
	const rangeSliders = document.querySelectorAll('[data-range="rangeslider"]');
	if(!rangeSliders) return;
	rangeSliders.forEach((el) => {
		if (el) {
			let min = parseInt(el.dataset.min),
				max = parseInt(el.dataset.max),
				from = parseInt(el.dataset.from),
				to = parseInt(el.dataset.to),
				step = parseInt(el.dataset.step);

			noUiSlider.create(el, {
				start: [from ? from : min, to ? to : max],
				range: { min: min, max: max },
				step: step ? step : 500,
				connect: true,
				behaviour: "none",
				format: wNumb({
					decimals: 0,
					thousand: " ",
				}),
			});

			let inputs = [el.parentNode.querySelector(".input-min"), el.parentNode.querySelector(".input-max")];

			el.noUiSlider.on("update", (values, handle) => {
				inputs[handle].value = values[handle];
			});

			// fire change event for form after value set
			el.noUiSlider.on("end", () => {
				const evt = new Event("change"),
					form = el.closest("form");
				form.dispatchEvent(evt);
			});
		}
	});

	// reset on filter clear
	const resetBtn = document.querySelector(".js-filter-reset");
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
}
