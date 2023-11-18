export function addToFavourites() {
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
