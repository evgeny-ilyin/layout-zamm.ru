export function orderActions() {
	const order = document.querySelector(".js-order");
	if (!order) return;

	document.addEventListener("change", (e) => {
		if (e.target.dataset.watch == "true" && !e.target.dataset.query) {
			formWatcher(order, e.target);
		}
	});

	document.addEventListener("queryResult", (e) => {
		if (e.target.dataset.watch == "true" && e.target.dataset.query == "true") {
			if (e.target.value.length > 0) formWatcher(order, e.target);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.target.closest(".js-promocode-input")) {
			if (e.key == "Enter") {
				const node = e.target.parentElement;
				promoSubmit(order, node);
			}
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.dataset.watch == "true" && e.target.closest(".js-promocode-submit")) {
			const node = e.target.closest(".js-promocode-submit").parentElement;
			promoSubmit(order, node);
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.dataset.watch == "true" && e.target.closest(".js-promocode-remove")) {
			const btn = e.target.closest(".js-promocode-remove");
			promoRemove(order, btn);
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
					selectsInit();
					globalForm.validation();
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
					selectsInit();
					globalForm.validation();
				}
				fetchLoader([node], "stop");
			} catch (e) {
				console.error(e);
				return;
			}
		})();
	}
}

function promoSubmit(order, node) {
	const btn = node.querySelector(".js-promocode-submit");
	if (!btn) return;

	let input = btn.previousElementSibling,
		promocode = input.value;
	if (!promocode.length) return;

	formWatcher(order, btn);
}

function promoRemove(order, btn) {
	formWatcher(order, btn);
}

// function promoSubmit(node) {
// 	let url = btn.dataset.url,
// 		input = btn.previousElementSibling,
// 		promocode = input.value,
// 		formData = new FormData();

// 	if (!promocode.length || !url) return;

// 	formData.append("promocode", promocode.toUpperCase());

// 	(async () => {
// 		try {
// 			btnLoader(btn);
// 			input.setAttribute("disabled", true);
// 			let response = await fetch(url, {
// 				method: "POST",
// 				body: formData,
// 			});
// 			if (!response.ok) {
// 				return;
// 			}
// 			let result = await response.json();
// 			if (result.status === true) {
// 				input.value = "";
// 				updateChunks(result.chunks);
// 			}
// 			btnLoader(btn, "stop");
// 			input.removeAttribute("disabled");
// 		} catch (e) {
// 			console.error(e);
// 			return;
// 		}
// 	})();
// }

// function promoRemove(node) {
// 	let url = node.dataset.url;

// 	if (!url) return;
// 	(async () => {
// 		try {
// 			let response = await fetch(url);
// 			if (!response.ok) {
// 				return;
// 			}
// 			let result = await response.json();
// 			if (result.status === true) {
// 				updateChunks(result.chunks);
// 			}
// 		} catch (e) {
// 			console.error(e);
// 			return;
// 		}
// 	})();
// }
