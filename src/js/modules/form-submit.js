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

/* https://medium.com/@damirpristav/form-validation-with-vanilla-js-using-data-attributes-on-form-elements-78ccf2c1cf34 */

let globalForm = {};
globalForm = {
	validation: function () {
		const forms = document.querySelectorAll("form");

		if (forms.length > 0) {
			for (let form of forms) {
				const inputs = form.querySelectorAll("[data-required]");
				form.setAttribute("novalidate", "");
				form.addEventListener("submit", submitForm.bind(form, inputs));

				inputs.forEach((input) => {
					if (input.type === "email" || input.type === "tel") {
						input.addEventListener("focusout", inputFocus);
					} else {
						input.addEventListener("input", inputChange);
					}
				});
			}
		}
	},
};
export { globalForm };

// export function validation() {
// 	const forms = document.querySelectorAll("form");

// 	if (forms.length > 0) {
// 		for (let form of forms) {
// 			const inputs = form.querySelectorAll("[data-required]");
// 			form.addEventListener("submit", submitForm.bind(form, inputs));

// 			inputs.forEach((input) => {
// 				input.addEventListener("input", inputChange);
// 			});
// 		}
// 	}
// }

function inputChange() {
	const input = this;
	validateInput(input);
}

function inputFocus() {
	const input = this;
	validateInputFocus(input);
}

function validateInput(input) {
	// Get the value and error element
	const value = input.value,
		// errorEl = input.closest("[data-formgroup]").querySelector("[data-formerror]"),
		errorClass = "is-error",
		defaultRequiredMessage = "Поле обязательно для заполнения",
		defaultEmailMessage = "Некорректный формат email",
		defaultTelMessage = "Некорректный формат телефона";

	// Declare error variable and assign null by default
	let error = null;
	// Check in input has data-required attribute and if the value is empty, and if the input is not radio or checkbox
	if ((input.type !== "radio" || input.type !== "checkbox") && input.dataset.required !== undefined && value === "") {
		error = input.dataset.requiredMessage ? input.dataset.requiredMessage : defaultRequiredMessage;
		input.classList.add(errorClass);
	}
	// Check if input is checkbox and it is not checked
	if (input.type === "checkbox" && !input.checked) {
		error = input.dataset.errorMessage ? input.dataset.errorMessage : defaultRequiredMessage;
		input.classList.add(errorClass);
	}
	/*
	// Check if input is radio
	if (input.type === "radio") {
		// Get all radio inputs in a group
		const radios = input.closest("[data-formgroup]").querySelectorAll('input[type="radio"]');
		let isChecked = false;
		let errorMsg = "";
		// Loop through radios and check if any radio is checked and if it is checked set isChecked to true
		radios.forEach((radio) => {
			if (radio.checked) {
				isChecked = true;
			}
			if (radio.dataset.errorMessage) {
				errorMsg = input.dataset.errorMessage;
			}
		});
		if (!isChecked) {
			error = errorMsg !== "" ? errorMsg : defaultRequiredMessage;
		}
	}
	// Check if input has data-minlength attribute and if value length is smaller than this attribute, if so show the error
	if (!error && input.dataset.minlength !== undefined && value.length < +input.dataset.minlength) {
		error = input.dataset.minlengthMessage ? input.dataset.minlengthMessage : `Please enter at least ${input.dataset.minlength} characters`;
		input.classList.add(errorClass);
	}
	// Check if input has data-maxlength attribute and if value length is greater than this attribute, if so show the error
	if (!error && input.dataset.maxlength !== undefined && value.length > +input.dataset.maxlength) {
		error = input.dataset.maxlengthMessage ? input.dataset.maxlengthMessage : `Only ${input.dataset.maxlength} characters allowed`;
		input.classList.add(errorClass);
	}
	*/
	// Check if input has data-email attribute and if email is not valid
	// if (!error && input.dataset.email !== undefined && !validateEmail(value)) {
	if (!error && input.type === "email" && !validateEmail(value)) {
		error = input.dataset.emailMessage ? input.dataset.emailMessage : defaultEmailMessage;
		input.classList.add(errorClass);
	}
	/*
	// Check if input has data-match attribute and if value is not equal to the value of the element with name attribute equal to this data-match attribute
	if (!error && input.dataset.match !== undefined && value !== input.closest("[data-form]").querySelector(`[name="${input.dataset.match}"]`).value) {
		error = input.dataset.matchMessage ? input.dataset.matchMessage : "Fields are not the same";
		input.classList.add(errorClass);
	}
	// Check if input has data-match-with attribute
	if (input.dataset.matchWith !== undefined) {
		// Get the input that has a name attribute equal to value of data-match-with attribute
		const inputToMatch = input.closest("[data-form]").querySelector(`[name="${input.dataset.matchWith}"]`);
		// Get the error element of that input
		const inputToMatchError = inputToMatch.closest("[data-formgroup]").querySelector("[data-formerror]");
		// If values are equal remove error class from input and hide error element
		if (value === inputToMatch.value) {
			inputToMatch.classList.remove(errorClass);
			inputToMatchError.style.display = "none";
		} else {
			// Add error class to input and show error element
			inputToMatch.classList.add(errorClass);
			inputToMatchError.style.display = "block";
			inputToMatchError.innerText = inputToMatch.dataset.matchMessage || "Fields are not the same";
		}
	}
	// Check if input is file input and if has data-maxfilesize attribute and if file size is greater than the value of this data-maxfilesize attribute
	if (!error && input.type === "file" && input.dataset.maxfilesize !== undefined && input.files[0].size > +input.dataset.maxfilesize * 1024) {
		error = input.dataset.maxfilesizeMessage ? input.dataset.maxfilesizeMessage : "File is too large";
		input.classList.add(errorClass);
	}
	// Check if input is file input and if it has data-allowed-types attribute and if file type is not equal to one of the values in data-allowed-type attribute
	if (!error && input.type === "file" && input.dataset.allowedTypes !== undefined && !input.dataset.allowedTypes.includes(input.files[0].type.split("/")[1])) {
		error = input.dataset.allowedTypesMessage ? input.dataset.allowedTypesMessage : "Invalid file type";
		input.classList.add(errorClass);
	}
	*/

	// Проверка длины номера телефона
	if (!error && input.type === "tel" && value.replace(/\D/g, "").length < 11) {
		error = input.dataset.telMessage ? input.dataset.telMessage : defaultTelMessage;
		input.classList.add(errorClass);
	}

	// If there is no error remove error class from the input, remove message from error element and hide it
	if (!error) {
		input.classList.remove(errorClass);
		// errorEl.innerText = "";
		// errorEl.style.display = "none";
	} else {
		// If there is error set error message and show error element
		// errorEl.innerText = error;
		// errorEl.style.display = "block";
	}
	return error;
}

function validateInputFocus(input) {
	// для более красивого поведения полей email и tel: ошибки нет при снятии фокуса с пустого поля, а также в процессе ввода
	// проверка корректности поля пройдёт при попытке отправки формы (будет вызван обычный validateInput)
	const value = input.value,
		errorClass = "is-error",
		defaultEmailMessage = "Некорректный формат email",
		defaultTelMessage = "Некорректный формат телефона";

	let error = null;

	if (!error && input.type === "email" && !validateEmail(value)) {
		if (value !== "") {
			error = input.dataset.emailMessage ? input.dataset.emailMessage : defaultEmailMessage;
			input.classList.add(errorClass);
		}
	}

	// Проверка длины номера телефона
	if (!error && input.type === "tel" && value.replace(/\D/g, "").length < 11) {
		error = input.dataset.telMessage ? input.dataset.telMessage : defaultTelMessage;
		input.classList.add(errorClass);
	}

	if (!error) {
		input.classList.remove(errorClass);
	}
	return error;
}

function submitForm(inputs, e) {
	e.preventDefault();
	const errors = [],
		errorsClass = "has-errors";

	inputs.forEach((input) => {
		const error = validateInput(input);
		if (error) {
			errors.push(error);
		}
	});

	if (errors.length === 0) {
		e.target.classList.remove(errorsClass);
		if (e.target.dataset.fetch !== "true") {
			e.target.submit();
		}
	} else {
		e.target.classList.add(errorsClass);
	}
}

// Validate email
function validateEmail(email) {
	let re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
