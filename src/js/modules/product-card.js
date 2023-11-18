export function productAmount() {
	const product = document.querySelector(".product");
	if (!product) return;

	product.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-btn-minus")) {
			let inputNumber = e.target.nextElementSibling;
			if (inputNumber.getAttribute("min") == inputNumber.value) return;
			inputNumber.stepDown();
			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}

		if (e.target.classList.contains("js-btn-plus")) {
			let inputNumber = e.target.previousElementSibling;
			if (inputNumber.getAttribute("max") == inputNumber.value) return;
			inputNumber.stepUp();
			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}
	});
}

export function productAllPhotosShow() {
	const isActiveClass = "is-active";

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-product-gallery");
		if (!el) return;

		const galleryShow = el.dataset.target;
		if (galleryShow) {
			const body = document.body,
				header = document.querySelector(".header"),
				target = document.querySelector(`.${galleryShow}`),
				offsetTop = target.closest(".container").offsetTop,
				containers = document.querySelectorAll(".container"),
				sw = getScrollbarWidth();

			body.classList.add("noscroll");
			header.classList.remove("is-hidden");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});

			target.classList.add(isActiveClass);
			target.style.top = `${offsetTop}px`;
		}
	});

	window.addEventListener("resize", () => {
		const galleryBtn = document.querySelector(`.js-product-gallery`);
		if (!galleryBtn) return;
		const galleryShow = galleryBtn.dataset.target,
			target = document.querySelector(`.${galleryShow}`),
			containers = document.querySelectorAll(".container");
		if (target) {
			target.classList.remove(isActiveClass);
			document.body.classList.remove("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = "";
			});
		}
	});
}
