import { maskInput } from "/node_modules/vanilla-text-mask/dist/vanillaTextMask.js";

export function submitPrevent() {
	document.addEventListener("keydown", (e) => {
		if (e.target.dataset.submit == "false") {
			if (e.key == "Enter") {
				e.preventDefault();
			}
		}
	});
}

export function maskHandler() {
	const errorClass = "is-error",
		charPhone = "_";

	let setMask = (el, pattern, char) => {
		maskInput({
			inputElement: el,
			mask: pattern,
			showMask: true,
			keepCharPositions: true,
			placeholderChar: char,
		});
	};

	["focusin", "click"].forEach((evt) =>
		document.addEventListener(evt, (e) => {
			if (e.target.dataset.patternType == "phone") {
				let target = e.target,
					index = 0;
				for (let i = 0; i < target.value.length; i++) {
					if (target.value[i] == charPhone) break;
					index = i + 1;
				}
				target.setSelectionRange(index, index);
			}
		})
	);

	document.addEventListener("focusin", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let el = e.target,
				pattern = ["+", "7", " ", "(", /[9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
			setMask(el, pattern, charPhone);
		}
	});

	document.addEventListener("focusout", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let target = e.target,
				length = target.value.replace(/\D/g, "").length;

			target.classList.remove(errorClass);

			if (length == 1) {
				target.value = "";
				return;
			}

			if (length < 11) {
				target.classList.add(errorClass);
			}
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let target = e.target,
				length = target.value.replace(/\D/g, "").length;

			if (length == 11) {
				target.classList.remove(errorClass);
			}
		}
	});
}
