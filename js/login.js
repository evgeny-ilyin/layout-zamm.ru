/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/login.js
function loginActions() {
	const login = document.querySelector(".js-login"),
		errorsClass = "has-errors",
		activeClass = "is-active",
		submitStatusClass = "submit-status",
		submitConditionClass = "submit-status_error";

	if (!login) return;

	login.addEventListener("submit", loginSubmit);

	function loginSubmit(e) {
		if (!e.target.classList.contains(errorsClass)) {
			let form = e.target,
				url = form.dataset.url,
				tabs = form.querySelectorAll(".login__tab"),
				firstChar = form.querySelector(".js-otp"),
				data = new FormData(form);

			let amp = url.includes("?") ? "&" : "?",
				queryStr = amp + new URLSearchParams(data).toString();

			url += queryStr;

			(async () => {
				try {
					let response = await fetch(url);
					if (!response.ok) {
						return;
					}
					let result = await response.json();
					if (result.status === true) {
						if (result.url) {
							window.location.assign(result.url);
						} else {
							tabs.forEach((tab) => {
								tab.classList.toggle(activeClass);
								tab.removeAttribute("disabled");
							});
							otpReset();
							firstChar.focus();
							countdown();
						}
					} else {
						setError(result);
					}
				} catch (e) {
					console.error(e);
					return;
				}
			})();
		}
	}

	// OTP
	const inputs = document.querySelectorAll(".js-otp"),
		otpErrorClass = "is-error";
	if (!inputs) return;

	inputs.forEach((input, index) => {
		input.dataset.index = index;
		input.addEventListener("paste", otpPaste);
		input.addEventListener("keydown", otpKeydown);
		input.addEventListener("focus", () => {
			input.classList.remove("is-blur-otp");
			removeError();
		});
	});

	function otpReset() {
		inputs.forEach((input) => {
			input.value = "";
		});
	}

	function otpPaste(e) {
		let data = e.clipboardData.getData("text");
		data = data.replace(/\D/g, "");
		data = data.substring(0, inputs.length);

		let value = data.split("");

		inputs.forEach((input, index) => {
			if (Number.parseInt(value[index]) >= 0) {
				input.value = value[index];
				input.blur();
			} else {
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		});

		otpSubmit();
	}

	function otpKeydown(e) {
		let input = e.target,
			fieldIndex = input.dataset.index;

		// if not pasting
		if (!e.ctrlKey && e.key !== "v") {
			// clear input
			if (e.key == "Backspace" || e.key == "Delete") {
				e.stopPropagation();
				e.preventDefault();
				input.value = "";
				if (fieldIndex > 0) setTimeout(() => input.previousElementSibling.focus(), 0);
			} else {
				// fill input, only numbers allowed
				let key = e.key.replace(/\D/g, "");
				if (key != "") {
					if (input.value.length == 0) input.value = key;
					if (fieldIndex < inputs.length - 1) setTimeout(() => input.nextElementSibling.focus(), 0);
				} else {
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
			}
		}

		// blur at last input
		if (fieldIndex == inputs.length - 1) {
			input.classList.add("is-blur-otp");
			otpSubmit();
		}
	}

	function otpSubmit() {
		let code = Array.from(inputs)
				.map((char) => char.value)
				.join(""),
			hiddenField = document.querySelector(`.otp input[name="f"]`);

		if (code.length == inputs.length) {
			hiddenField.value = code;
			login.dispatchEvent(new Event("submit"));
		}
	}

	function setError(response = false) {
		inputs.forEach((i) => {
			i.classList.add(otpErrorClass);
		});

		if (response.message) {
			const status = document.createElement("div"),
				footerElement = document.querySelector(`.otp__footer`);

			status.classList.add(submitStatusClass, submitConditionClass);
			status.innerHTML = response.message;

			let statusExists = document.querySelector(`.${submitStatusClass}`);
			statusExists ? statusExists.remove() : "";

			footerElement.prepend(status);
		}
	}

	function removeError() {
		inputs.forEach((i) => {
			i.classList.remove(otpErrorClass);
		});
		let statusExists = document.querySelector(`.${submitStatusClass}`);
		statusExists ? statusExists.remove() : "";
	}

	function countdown() {
		const timerElement = document.querySelector(".otp__timer span"),
			tabs = timerElement.closest("form").querySelectorAll(".login__tab");

		let countdown = timerElement.parentElement.dataset.timer;

		timerElement.textContent = countdown--;

		let updateTimer = () => {
			timerElement.textContent = countdown;
			if (countdown === 0) {
				clearInterval(timerInterval);
				tabs.forEach((tab) => {
					if (tab.classList.contains(activeClass)) {
						tab.setAttribute("disabled", "");
					}
					tab.classList.toggle(activeClass);
				});
			} else {
				countdown--;
			}
		};

		const timerInterval = setInterval(updateTimer, 1000);
	}
}

;// CONCATENATED MODULE: ./src/js/login.js


addEventListener("DOMContentLoaded", () => {
	loginActions();
	// otpHandler();
});

/******/ })()
;