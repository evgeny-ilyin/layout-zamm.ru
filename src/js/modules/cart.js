export function cartAmount() {
	const cart = document.querySelector(".js-cart");
	if (!cart) return;

	cart.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-btn-minus")) {
			let itemId = e.target.closest(".cart-item").dataset.itemId,
				inputNumber = e.target.nextElementSibling;
			if (inputNumber.getAttribute("min") == inputNumber.value) return;
			inputNumber.stepDown();
			changeCart(cart, itemId, "changeAmountCart");
		}

		if (e.target.classList.contains("js-btn-plus")) {
			let itemId = e.target.closest(".cart-item").dataset.itemId,
				inputNumber = e.target.previousElementSibling;
			if (inputNumber.getAttribute("max") == inputNumber.value) return;
			inputNumber.stepUp();
			changeCart(cart, itemId, "changeAmountCart");
		}

		if (e.target.closest(".js-remove-from-cart")) {
			let itemId = e.target.closest(".cart-item").dataset.itemId;
			changeCart(cart, itemId, "removeItemCart");
		}

		if (e.target.closest(".js-add-to-cart")) {
			let itemId = e.target.closest(".js-add-to-cart").dataset.id;
			changeCart(cart, itemId, "addItemCart");
		}
	});
}

function changeCart(cart, itemId, trigger) {
	const url = cart.dataset.url,
		form = cart.querySelector("form");

	let formData = new FormData(form),
		formDataObject = Object.fromEntries(formData.entries()),
		data = new FormData();

	data.append("trigger", trigger);
	data.append("itemId", itemId);
	data.append("formData", JSON.stringify(formDataObject));

	(async () => {
		try {
			let response = await fetch(url, {
				method: "POST",
				body: data,
			});
			if (!response.ok) {
				return;
			}
			let result = await response.json();

			if (result.status === true) {
				updateChunks(result.chunks);

				carouselsInit();
				catalogItemGalleriesInit();
				catalogItemGalleryHandler();

				if (result.addedId || result.removedId) {
					let id = result.addedId || result.removedId;
					const itemButton = document.querySelector(`button[data-id="${id}"]`);
					if (!itemButton) return;
					const buttonWrapper = itemButton.closest(".item__details");
					if (result.addedId) {
						itemButton.classList.add("in-cart");
						buttonWrapper.style.opacity = 1;
					} else if (result.removedId) {
						itemButton.classList.remove("in-cart");
						buttonWrapper.style.opacity = "";
					}
				}
			}
		} catch (e) {
			console.error(e);
			return;
		}
	})();
}

const cartForm = document.querySelector(".js-cart form");
document.addEventListener("click", (e) => {
	if (e.target.closest(".cart-total__button button")) {
		e.preventDefault();
		if (cartForm) cartForm.submit();
	}
});
