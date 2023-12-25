/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/order.js
function orderActions() {
	const order = document.querySelector(".js-order");
	if (!order) return;

	document.addEventListener("change", (e) => {
		if (e.target.dataset.watch == "true") {
			formWatcher(order, e.target);
		}
	});
}

function formWatcher(node, el) {
	let url = node.dataset.url,
		method = el.dataset.method == "get" ? "get" : "post",
		params = el.dataset.params,
		form = node.querySelector("form"),
		data = new FormData(form);

	if (params) {
		let parsed = JSON.parse(params);

		Object.keys(parsed).forEach((key) => {
			data.set(key, parsed[key]);
		});
	}

	// fetch form with get or post method
	if (method == "get") {
		let amp = url.includes("?") ? "&" : "?",
			queryStr = amp + new URLSearchParams(data).toString();

		url += queryStr;

		(async () => {
			try {
				fetchLoader([node], "start");
				let response = await fetch(url);
				if (!response.ok) {
					return;
				}
				let result = await response.json();
				if (result.status === true) {
					updateChunks(result.chunks);
				}
				fetchLoader([node], "stop");
			} catch (e) {
				console.error(e);
				return;
			}
		})();
	} else {
		(async () => {
			try {
				fetchLoader([node], "start");
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
				}
				fetchLoader([node], "stop");
			} catch (e) {
				console.error(e);
				return;
			}
		})();
	}
}

;// CONCATENATED MODULE: ./src/js/order.js


addEventListener("DOMContentLoaded", () => {
	orderActions();
});

/******/ })()
;