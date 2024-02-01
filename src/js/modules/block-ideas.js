export function ideaPopupShow() {
	const isActiveClass = "is-active";

	let ideasClose = () => {
		const active = document.querySelectorAll(`.idea-marker.${isActiveClass}, .idea-mobile-content.${isActiveClass}`);
		if (!active.length) return;
		active.forEach((e) => {
			e.classList.remove(isActiveClass);
		});
	};

	let ideasMobile = (el) => {
		const ideaMobile = document.querySelector(".idea-mobile-content div");
		if (ideaMobile) {
			const cloneContent = el.nextElementSibling.cloneNode(true);
			ideaMobile.innerHTML = "";
			ideaMobile.parentElement.classList.add(isActiveClass);
			ideaMobile.append(cloneContent);
		}
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-idea");
		if (el) {
			if (el.parentElement.classList.contains(isActiveClass)) {
				ideasClose();
			} else {
				ideasClose();
				el.parentElement.classList.toggle(isActiveClass);
				ideasMobile(el);
			}
		} else {
			if (!e.target.closest(".idea-marker__content")) {
				ideasClose();
			}
		}
	});
}

// canvas.offsetLeft		-- родитель от левого края браузера
// canvas.offsetWidth		-- длина родителя
// marker.offsetLeft		-- маркер до левого края
// marker.offsetWidth		-- длина маркера
// box.offsetWidth			-- длина попапа
export function ideaPopupPlace() {
	const iPopups = document.querySelectorAll(".idea-marker__content"),
		leftClass = "marker-l",
		rightClass = "marker-r";

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			iPopups.forEach((box) => {
				const canvas = box.closest(".idea"),
					canvasL = canvas.offsetLeft,
					marker = box.parentElement,
					markerW = marker.offsetWidth,
					markerL = marker.getBoundingClientRect().left,
					markerR = marker.getBoundingClientRect().right,
					minL = markerW / 2 + markerL + canvasL - 16,
					minR = window.innerWidth - markerR + markerW / 2 - 32,
					boxW = box.offsetWidth,
					overL = minL < boxW / 2,
					overR = minR < boxW / 2;

				box.classList[overL ? "add" : "remove"](leftClass);
				box.classList[overR ? "add" : "remove"](rightClass);
			});
		})
	);
}
