/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/product-card.js
function productAmount() {
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

;// CONCATENATED MODULE: ./src/js/modules/product-card-global.js
if (!window.productBlockCollapseHandler) {
	window.productBlockCollapseHandler = (el = false) => {
		if (!el) {
			let blocks = document.querySelectorAll(".block-collapsible");
			blocks.forEach((block) => productBlockCollapseHandler(block));
			return;
		}

		let check = el.querySelector(".block-collapse");
		if (check) return;

		let elRealHeight = el.scrollHeight,
			elHeight = el.getBoundingClientRect().height,
			isClosedClass = "is-closed",
			isOpenedClass = "is-opened";

		if (elRealHeight > elHeight) {
			let div = document.createElement("div"),
				btn = document.createElement("button");
			btn.innerHTML = "<span>Показать всё</span><span>Свернуть</span>";
			btn.classList.add("block-collapse__btn", "js-block-collpase", "is-closed");
			div.classList.add("block-collapse");
			div.appendChild(btn);
			el.appendChild(div);

			let collapseBlock = el.querySelector(".block-collapse"),
				collapseBlockHeight = collapseBlock.getBoundingClientRect().height,
				collapseBtn = collapseBlock.querySelector(".js-block-collpase");

			if (!collapseBtn) return;

			collapseBtn.addEventListener("click", () => {
				collapseBtn.classList.toggle(isClosedClass);
				if (el.style.maxHeight) {
					el.style.maxHeight = null;
					el.classList.remove(isOpenedClass);
				} else {
					el.style.maxHeight = elRealHeight + collapseBlockHeight + "px";
					el.classList.add(isOpenedClass);
				}
			});
		}
	};
}

;// CONCATENATED MODULE: ./src/js/product-card.js



addEventListener("DOMContentLoaded", () => {
	productAmount();
	productBlockCollapseHandler();
});

/******/ })()
;