/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/product-add-to-favourites.js
function addToFavourites() {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(".js-fav"),
			isActiveClass = "is-active";
		if (!btn) return;

		const id = btn.dataset.id,
			url = btn.dataset.url,
			data = { id: id };

		(async () => {
			try {
				let response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					return;
				}
				let result = await response.json();

				if (result.status === true) {
					btn.parentElement.classList.toggle(isActiveClass);
				}
			} catch (e) {
				console.log(e);
				return;
			}
		})();
	});
}

;// CONCATENATED MODULE: ./src/js/modules/product-add-to-cart.js
function addToCart(btn) {
	const form = btn.closest("form") || btn.closest(".item__props").querySelector("form"),
		inCartClass = "in-cart";

	let formData = new FormData(form),
		data = {},
		params = {},
		url = btn.dataset.url,
		id = btn.dataset.id;

	let formDataObject = Object.fromEntries(formData.entries());

	data = { id: id };

	if (btn.dataset.params) {
		params = JSON.parse(btn.dataset.params);
	}

	Object.assign(data, params, formDataObject);

	(async () => {
		try {
			btnLoader(btn);
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				btn.classList.add(inCartClass);

				let target = document.querySelector(`[data-id="amount"]`);
				if (!target) {
					console.log(`data-id amount not found`);
					return;
				}
				target.dataset.amount = result.amount;
			}
			btnLoader(btn, "stop");
		} catch (e) {
			console.log(e);
			return;
		}
	})();
}

// btn "add to cart"
document.addEventListener("click", (e) => {
	if (e.target.closest(".js-add-to-cart")) {
		let btn = e.target.closest(".js-add-to-cart"),
			inCartClass = "in-cart";
		if (!btn) return;
		if (btn.classList.contains(inCartClass)) {
			if (btn.dataset.cart) {
				window.location.assign(btn.dataset.cart);
				return;
			}
		}
		addToCart(btn);
	}
});

// amount to cart
document.addEventListener("change", (e) => {
	if (e.target.name == "amount") {
		let btn = e.target.closest(".product__purchase").querySelector(".js-add-to-cart");
		if (!btn) return;
		addToCart(btn);
	}
});

;// CONCATENATED MODULE: ./src/js/product-actions.js



addEventListener("DOMContentLoaded", () => {
	addToFavourites();
});

/******/ })()
;