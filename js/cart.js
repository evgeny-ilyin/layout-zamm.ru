/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/cart.js
function cartActions() {
	const cart = document.querySelector(".js-cart");
	if (!cart) return;

	document.addEventListener("change", (e) => {
		if (e.target.closest(".cart-item")) {
			let itemId = e.target.closest(".cart-item").dataset.itemId;
			changeCart(cart, itemId, "changeAmountCart");
		}
	});

	cart.addEventListener("click", (e) => {
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
			fetchLoader([cart], "start");
			let response = await fetch(url, {
				method: "POST",
				body: data,
			});
			if (!response.ok) {
				return;
			}
			let result = await response.json();

			if (result.status === true) {
				carouselsInit();
				catalogItemGalleriesInit();
				catalogItemGalleryHandler();

				if (result.chunks) updateChunks(result.chunks);

				if (result.addedId || result.removedId) {
					let id = result.addedId || result.removedId;
					const itemButton = document.querySelector(`button[data-id="${id}"]`);
					if (itemButton) {
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

				if (!isNaN(result.currentAmount) && result.currentAmount > 1) {
					const amountInput = document.querySelector(`[data-id="${itemId}"] .amount-element input`);
					if (!amountInput) return;
					amountInput.value = result.currentAmount;
				}
			}

			fetchLoader([cart], "stop");
		} catch (e) {
			console.error(e);
			return;
		}
	})();
}

// const cartForm = document.querySelector(".js-cart form");
// document.addEventListener("click", (e) => {
// 	if (e.target.closest(".cart-total__button button")) {
// 		e.preventDefault();
// 		if (cartForm) cartForm.submit();
// 	}
// });

;// CONCATENATED MODULE: ./src/js/cart.js


addEventListener("DOMContentLoaded", () => {
	cartActions();
});

/******/ })()
;