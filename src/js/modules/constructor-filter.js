export function constructorFilterHandler() {
	const filterClass = "filter",
		optionsMobileClass = "opt-constructor-mobile",
		filterBlock = document.querySelector(`.${filterClass}`);

	let collapseAll = () => {
		let headers = filterBlock.querySelectorAll(".js-collapse");
		if (!headers) return;

		headers.forEach((el) => {
			if (el.nextElementSibling.classList.contains(optionsMobileClass)) {
				el.nextElementSibling.classList.remove(optionsMobileClass);
				overlay(0);
			}
		});
	};

	// sizes
	document.addEventListener("change", (e) => {
		if (e.target.classList.contains("js-reload-model")) {
			let parent = e.target.parentElement;
			if (!parent.classList.contains("good-option--outline")) return;

			let checked = parent.parentElement.querySelectorAll(".is-checked");
			if (!checked) return;

			checked.forEach((el) => {
				el.classList.remove("is-checked");
			});
			parent.classList.add("is-checked");
		}
	});

	// mobile close collapseible div
	// document.body.classList.contains("is-touch") ? e.preventDefault() : "";
	document.addEventListener("change", (e) => {
		if (e.target.parentElement.classList.contains("good-option")) {
			const optionsMobileClass = "opt-constructor-mobile",
				trigger = e.target.closest(`.${optionsMobileClass}`);
			if (!trigger) return;

			overlay(0);
			trigger.classList.remove(optionsMobileClass);
		}
	});

	document.addEventListener("click", (e) => {
		if (!mediaMatch("1023")) return;
		const trigger = e.target.closest(".js-collapse");

		if (trigger) {
			collapseAll();
			overlay(1);
			const section = trigger.nextElementSibling;
			section.classList.add(optionsMobileClass);
		} else if (!filterBlock.contains(e.target)) {
			collapseAll();
		}
	});

	["resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			collapseAll();
		})
	);
}
