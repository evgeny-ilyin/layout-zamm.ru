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
