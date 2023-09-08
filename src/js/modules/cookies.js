/**
 * Cookie policy
 * @link https://learn.javascript.ru/cookie
 */
function getCookie(name) {
	let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 1) {
	let expires;

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}

	let options = {
		path: "/",
		expires: expires,
		// defaults
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		"max-age": -1,
	});
}

const cookieForm = document.querySelector(".cookie"),
	cookieAccept = document.querySelector(".js-cookie__accept");

	if(cookieForm && cookieAccept) {
		let policyCheck = () => {
			if (!getCookie("policyAccepted")) {
				cookieForm.classList.remove("hidden");
			}
		};
		
		let policyAccepted = (e) => {
			e.preventDefault();
			setCookie("policyAccepted", "1", 7);
			cookieForm.classList.add("hidden");
		};
		
		cookieAccept.addEventListener("click", policyAccepted);
		window.addEventListener("load", policyCheck);
	}

const headerAlert = document.querySelector(".header-alert"),
	closeAlert = document.querySelector(".js-close-header-alert");

	if(headerAlert && closeAlert) {
		let alertCheck = () => {
			if (!getCookie("alertHidden")) {
				headerAlert.classList.remove("hidden");
			}
		};
		
		let alertHide = (e) => {
			e.preventDefault();
			setCookie("alertHidden", "1", 1);
			headerAlert.classList.add("hidden");
		};
		
		closeAlert.addEventListener("click", alertHide);
		window.addEventListener("load", alertCheck);
	}
