export function infoPopupShow() {
	const isActiveClass = "is-active";

	let infosClose = () => {
		const active = document.querySelectorAll(`.info-marker.${isActiveClass}`);
		if (!active.length) return;
		active.forEach((e) => {
			e.classList.remove(isActiveClass);
		});
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-info");
		if (el) {
			if (el.parentElement.classList.contains(isActiveClass)) {
				infosClose();
			} else {
				infosClose();
				el.parentElement.classList.toggle(isActiveClass);
			}
		} else {
			if (!e.target.closest(".info-marker__content")) {
				infosClose();
			}
		}
	});
}

// canvas.offsetLeft		-- родитель от левого края контейнера
// canvas.offsetWidth		-- длина родителя
// marker.offsetLeft		-- маркер до левого края
// marker.offsetWidth		-- длина маркера
// box.offsetWidth			-- длина попапа
export function infoPopupPlace() {
	const iPopups = document.querySelectorAll(".info-marker__content"),
		leftClass = "marker-l",
		rightClass = "marker-r",
		bottomClass = "marker-b";

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			iPopups.forEach((box) => {
				let canvas,
					header,
					canvasinfo = box.closest(".info"),
					canvasCarousel = box.closest(".f-carousel__slide"),
					canvasSingle = box.closest(".interior-single-image");

				if (canvasinfo) {
					canvas = canvasinfo;
				}

				if (canvasCarousel) {
					canvas = canvasCarousel;
					header = canvas.closest(".f-carousel").querySelector(".interior-name");
				}

				if (canvasSingle) {
					canvas = canvasSingle;
					header = canvas.querySelector(".interior-name");
				}

				let canvasL = canvas.offsetLeft,
					marker = box.parentElement,
					markerW = marker.offsetWidth,
					markerL = marker.getBoundingClientRect().left,
					markerR = marker.getBoundingClientRect().right,
					headerH = 16,
					minL,
					minR,
					minT,
					boxW,
					boxT,
					overL,
					overR,
					overT;

				if (canvasinfo) {
					minL = markerW / 2 + markerL + canvasL - 16;
					minR = window.innerWidth - markerR + markerW / 2 - 32;
					boxW = box.offsetWidth;
					overL = minL < boxW / 2;
					overR = minR < boxW / 2;
				}

				if (canvasCarousel || canvasSingle) {
					if (header) {
						headerH = header.getBoundingClientRect().top - canvas.getBoundingClientRect().top + header.offsetHeight + 16;
					}
					// boxT = box.getBoundingClientRect().top;
					boxT = marker.getBoundingClientRect().top - canvas.getBoundingClientRect().top - 8;
					minT = boxT - canvas.getBoundingClientRect().top - window.scrollY; // scrollY for canvas top position compensation if page scrolled and refreshed
					overT = minT < headerH;

					minL = markerL - canvas.getBoundingClientRect().left;
					minR = canvas.getBoundingClientRect().right - markerR;
					boxW = box.offsetWidth;
					overL = minL < boxW / 2;
					overR = minR < boxW / 2;
				}

				box.classList[overL ? "add" : "remove"](leftClass);
				box.classList[overR ? "add" : "remove"](rightClass);
				box.classList[overT ? "add" : "remove"](bottomClass);
			});
		})
	);
}
