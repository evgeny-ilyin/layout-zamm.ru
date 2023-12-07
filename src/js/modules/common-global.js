if (!window.overlay) {
	window.overlay = (action, origin = false) => {
		const body = document.body,
			sw = getScrollbarWidth(),
			containers = document.querySelectorAll(".container"),
			isActiveClass = "is-active";
		if (action) {
			overlay(0);
			const o = document.createElement("div"),
				scrollY = window.scrollY;
			o.classList.add("overlay");

			origin ? (o.dataset.origin = origin) : "";
			body.prepend(o);
			body.style.top = `-${scrollY}px`;
			body.classList.add("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});

			setTimeout(() => {
				o.classList.add(isActiveClass);
			}, 0);
		} else {
			body.classList.remove("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = "";
			});

			const o = document.querySelector(".overlay"),
				scrollY = body.style.top;
			if (!o) return;
			body.style.top = "";
			o.classList.remove(isActiveClass);

			window.scrollTo({
				left: 0,
				top: parseInt(scrollY || "0") * -1,
				behavior: "instant",
			});

			setTimeout(() => {
				o.remove();
			}, 250);
		}
	};
}

if (!window.getScrollbarWidth) {
	window.getScrollbarWidth = () => {
		let div = document.createElement("div");
		div.style.overflowY = "scroll";
		div.style.width = "50px";
		div.style.height = "50px";
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	};
}

if (!window.getRandomStr) {
	window.getRandomStr = (len) => {
		let res = "",
			symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
		len = len || Math.floor(Math.random() * symbols.length);
		for (let i = 0; i < len; i++) res += symbols[Math.floor(Math.random() * symbols.length)];
		return res;
	};
}

if (!window.mediaMatch) {
	window.mediaMatch = (w) => {
		if (!w) return;
		let mq = window.matchMedia(`(max-width: ${w}px)`);
		return mq.matches ? true : false;
	};
}

if (!window.isTouchDevice) {
	window.isTouchDevice = () => {
		const touchClass = "is-touch";
		["load", "resize"].forEach((evt) =>
			window.addEventListener(evt, () => {
				let isTouch = false;
				if ((window.PointerEvent && "maxTouchPoints" in navigator) || (window.PointerEvent && "msMaxTouchPoints" in navigator)) {
					// if Pointer Events are supported, just check maxTouchPoints
					if (navigator.maxTouchPoints > 0) {
						isTouch = true;
					}
				} else {
					// no Pointer Events...
					if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
						// check for any-pointer:coarse which mostly means touchscreen
						isTouch = true;
					} else if (window.TouchEvent || "ontouchstart" in window) {
						// last resort - check for exposed touch events API / event handler
						isTouch = true;
					}
				}
				document.body.classList[isTouch ? "add" : "remove"](touchClass);
			})
		);
	};
}

if (!window.fetchLoader) {
	window.fetchLoader = (where, action, options = {}) => {
		if (!where) return;
		let whereArr = [];

		if (!Array.isArray(where)) {
			whereArr = [where];
		} else {
			whereArr = where;
		}

		if (action == "start") {
			whereArr.forEach((el) => {
				if (!el) return;
				let loader = document.createElement("div");
				loader.classList.add("fetch");
				let child = document.createElement("div");
				child.classList.add("fetch__ring");

				if (options.class) {
					loader.classList.add(options.class);
				}

				loader.appendChild(child);

				el.appendChild(loader);

				setTimeout(() => {
					loader.style.opacity = 1;
				}, 0);
			});
		} else if (action == "stop") {
			whereArr.forEach((el) => {
				if (!el) return;
				let loaders = el.querySelectorAll(".fetch");
				if (!loaders) return;
				loaders.forEach((loader) => {
					setTimeout(() => {
						loader.style.opacity = 0;
						setTimeout(() => {
							loader.remove();
						}, 250);
					}, 0);
				});
			});
			return;
		}
	};
}

if (!window.btnLoader) {
	window.btnLoader = (where, action = false) => {
		if (!where) return;
		const btnLoaderClass = "btn-loader",
			labels = where.querySelectorAll("span");

		if (action == "stop") {
			where.classList.remove(btnLoaderClass);
			labels.forEach((l) => {
				l.style.opacity = "";
			});
			return;
		}

		where.classList.add(btnLoaderClass);
		labels.forEach((l) => {
			l.style.opacity = 0;
		});
	};
}

if (!window.showSkeleton) {
	window.showSkeleton = (where, tpl) => {
		if (!where || !tpl) return;
		const template = document.getElementById(tpl);
		if (!template) return;
		where.innerHTML = "";
		where.appendChild(template.content.cloneNode(true));
	};
}

if (!window.setWindowLocation) {
	window.setWindowLocation = (url) => {
		// TODO @ prod:
		// window.history.pushState("", "", url);
		window.history.pushState("", "", url.replace("https://deviart.ru/zamm/", ""));
	};
}

if (!window.catalogItemGalleriesInit) {
	window.catalogItemGalleriesInit = (item = false) => {
		const isActiveClass = "is-active";

		if (item) {
			item.querySelector(".item__gallery-item").classList.add(isActiveClass);
			return;
		}

		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel");

		galleryItems.forEach((el) => {
			if (!el) return;

			let items = el.querySelectorAll(".item");
			items.forEach((i) => {
				i.querySelector(".item__gallery-item").classList.add(isActiveClass);
			});
		});
	};
}

if (!window.catalogItemGalleryHandler) {
	window.catalogItemGalleryHandler = () => {
		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel"),
			isActiveClass = "is-active";

		galleryItems.forEach((el) => {
			if (!el) return;
			el.addEventListener("mouseover", (e) => {
				const item = e.target.closest(".item");
				if (!item) return;

				const gallery = item.querySelector(".item__gallery-wrapper"),
					gItems = gallery.querySelectorAll(".item__gallery-item");

				gallery.addEventListener("mouseenter", () => {
					gItems.forEach((i) => {
						i.addEventListener("mouseenter", () => {
							i.parentElement.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
							i.classList.add(isActiveClass);
						});
					});
				});

				gallery.addEventListener("mouseleave", () => {
					gallery.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
					gallery.querySelector(".item__gallery-item").classList.add(isActiveClass);
				});
			});
		});
	};
}

if (!window.isPropOverflowX) {
	window.isPropOverflowX = (el) => {
		return el ? el.scrollWidth > el.clientWidth : false;
	};
}

if (!window.addToSvgSprite) {
	window.addToSvgSprite = (svg) => {
		let sprite = document.querySelector(".svg-sprite");
		if (!sprite) return;
		sprite.insertAdjacentHTML('beforeend', svg);
	};
}

if (!window.getContent) {
	window.getContent = async (url) => {
		if (!url) return;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}

			let result = await response.json();
			if (result.status === true) {
				return result.content;
			} else {
				console.log(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.log(e);
			return;
		}
	};
}


