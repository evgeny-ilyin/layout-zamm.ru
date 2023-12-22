export function addToFavourites() {
	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-fav")) {
			const btn = e.target.closest(".js-fav"),
				isActiveClass = "is-active";
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
