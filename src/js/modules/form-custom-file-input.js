export function fileInputInit() {
	const hiddenClass = "hidden",
		parentClass = "file-input",
		fileNameClass = "file-input__name";

	document.addEventListener("change", (e) => {
		if (e.target.type == "file") {
			let input = e.target,
				parent = input.parentElement,
				label = input.nextElementSibling,
				fileName = "",
				fileNameDiv = document.createElement("div"),
				removeBtn = document.createElement("button");

			let inputName = parent.querySelector(`.${fileNameClass}`);
			if (inputName) inputName.remove();

			fileName = input.value.split("\\").pop();

			if (fileName) {
				fileNameDiv.classList.add(fileNameClass);
				removeBtn.classList.add("btn", "btn_remove", "js-file-remove");

				fileNameDiv.innerHTML = `<span>${fileName}</span>`;
				fileNameDiv.append(removeBtn);
				parent.append(fileNameDiv);

				label.classList.add(hiddenClass);
			} else {
				label.classList.remove(hiddenClass);
			}

			// Firefox bug fix
			// input.addEventListener("focus", function () {
			// 	input.classList.add("has-focus");
			// });
			// input.addEventListener("blur", function () {
			// 	input.classList.remove("has-focus");
			// });

			// multiple upload
			// if (e.files && e.files.length > 1) {
			// 	fileName = (input.getAttribute("data-multiple-caption") || "").replace("{count}", e.files.length);
			// } else {
			// fileName = input.value.split("\\").pop();
			// }
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-file-remove")) {
			e.preventDefault();
			const wrapper = e.target.closest(`.${fileNameClass}`),
				parent = e.target.closest(`.${parentClass}`),
				input = parent.querySelector("input[type='file']");

			input.value = "";
			parent.querySelector(`.${hiddenClass}`).classList.remove(hiddenClass);
			wrapper.remove();
		}
	});
}
