/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/product-add-to-cart.js
function addToCart() {
	// btn "add to cart"
	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-add-to-cart")) {
			let btn = e.target.closest(".js-add-to-cart"),
				trigger = "",
				inCartClass = "in-cart";
			if (!btn) return;
			if (btn.classList.contains(inCartClass)) {
				if (btn.dataset.cart) {
					window.location.assign(btn.dataset.cart);
					return;
				}
			}
			if (btn.closest(".item")) trigger = "addItemCatalog";
			if (btn.closest(".product")) trigger = "addItem";
			if (btn.closest(".constructor")) trigger = "addItemConstructor";
			toCart(btn, trigger);
		}
	});

	// amount to cart
	document.addEventListener("change", (e) => {
		if (e.target.name == "amount") {
			let btn = e.target.closest(".product__purchase").querySelector(".js-add-to-cart"),
				trigger = "";
			if (!btn) return;
			if (btn.closest(".product")) trigger = "changeAmount";
			toCart(btn, trigger);
		}
	});
}

function toCart(btn, trigger) {
	const form = btn.closest("form") || btn.closest(".item__props").querySelector("form"),
		inCartClass = "in-cart";

	let formData = new FormData(form),
		id = btn.dataset.id,
		url = btn.dataset.url;

	formData.append("trigger", trigger);
	formData.append("id", id);

	// if (btn.dataset.params) {
	// 	formData.append("params", btn.dataset.params);
	// }

	(async () => {
		try {
			btnLoader(btn);
			let response = await fetch(url, {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				btn.classList.add(inCartClass);

				let target = document.querySelector(`[data-id="cart-amount"]`);
				if (!target) return;
				target.dataset.amount = isNaN(result.amount) ? 0 : result.amount;

				if (result.chunks) updateChunks(result.chunks);
			}
			btnLoader(btn, "stop");
		} catch (e) {
			console.error(e);
			return;
		}
	})();
}

;// CONCATENATED MODULE: ./src/js/modules/product-add-to-favourites.js
function addToFavourites() {
	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-fav")) {
			const btn = e.target.closest(".js-fav");
			if (!btn) return;

			let data = new FormData(),
				id = Number(btn.dataset.id),
				url = btn.dataset.url;

			data.append("id", id);

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
						setFavourites(id);

						let target = document.querySelector(`[data-id="fav-amount"]`);
						if (!target) return;
						target.dataset.amount = isNaN(result.amount) ? 0 : result.amount;
					}
				} catch (e) {
					console.error(e);
					return;
				}
			})();
		}
	});
}

;// CONCATENATED MODULE: ./src/js/product-actions.js



addEventListener("DOMContentLoaded", () => {
	addToCart();
	addToFavourites();
});

/******/ })()
;