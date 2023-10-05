// не используются >
// export function isTouchEnabled() {
// 	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
// }

// export function dropdownByTouch() {
// 	if (!isTouchEnabled()) {
// 		return;
// 	}

// 	const dropdownTouch = document.querySelectorAll(".dropdown-touch"),
// 		isActiveClass = "is-active";

// 	dropdownTouch.forEach((link) => {
// 		link.addEventListener("click", (e) => {
// 			e.stopPropagation();
// 			const dropdown = link.nextElementSibling;
// 			if (!dropdown.classList.contains(isActiveClass)) {
// 				dropdownClose(e);
// 			}
// 			dropdown.classList.toggle(isActiveClass);
// 		});
// 	});

// 	document.addEventListener("click", (e) => {
// 		dropdownClose(e);
// 	});

// 	let dropdownClose = (e) => {
// 		const dropdownTouchActive = document.querySelectorAll(`.dropdown-touch + .${isActiveClass}`);
// 		if (dropdownTouchActive) {
// 			dropdownTouchActive.forEach((dropdown) => {
// 				if (!dropdown.contains(e.target)) {
// 					dropdown.classList.remove(isActiveClass);
// 				}
// 			});
// 		}
// 	};
// }
// не используются <