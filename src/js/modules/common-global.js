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

			const o = document.querySelector(".overlay");
			if (!o) return;

			o.classList.remove(isActiveClass);
			resetTopOffset();

			setTimeout(() => {
				o.remove();
			}, 250);
		}
	};
}

if (!window.resetTopOffset) {
	window.resetTopOffset = () => {
		const body = document.body,
			header = document.querySelector(".header"),
			scrollY = body.style.top;
		body.style.top = "";
		header.style.top = "";

		window.scrollTo({
			left: 0,
			top: parseInt(scrollY || "0") * -1,
			behavior: "instant",
		});
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

if (!window.updateChunks) {
	window.updateChunks = (obj, where = document) => {
		if (typeof obj === "object" && obj !== null) {
			Object.entries(obj).forEach(([key, value]) => {
				// execute js code
				if (key == "eval") {
					let cleanValue = value.replace(/^<script.*?>|<\/script>$/g, "");
					eval(cleanValue);
					return;
				}
				let target = where.querySelector(`[data-id=${key}]`);
				if (!target) {
					// console.warn(`data-id "${key}" not found`);
					return;
				}
				target.innerHTML = value;
			});
		} else {
			console.error("Chunk list is not an object");
		}
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

if (!window.showHidden) {
	window.showHidden = () => {
		const hiddenClass = "hidden";
		document.addEventListener("click", (e) => {
			const el = e.target.closest(".js-show-hidden");
			if (!el) return;
			if (el.dataset.target) {
				el.parentElement.classList.add(hiddenClass);
				document.querySelector(`.${el.dataset.target}`).classList.remove(hiddenClass);
			} else {
				const hiddens = el.parentElement.querySelectorAll(`.${hiddenClass}`);
				hiddens.forEach((h) => {
					h.classList.remove(hiddenClass);
				});
				el.classList.add(hiddenClass);
			}
		});
	};
}

if (!window.setActive) {
	window.setActive = () => {
		const isActiveClass = "is-active";
		document.addEventListener("click", (e) => {
			const el = e.target.closest(".js-set-active");
			if (!el) return;

			let href = e.target.closest("a");

			if (href) {
				let target = href.getAttribute("target");
				if (el.classList.contains(isActiveClass)) {
					// переход по ссылке при клике в раскрытом контейнере
					!target ? (window.location.href = href) : window.open(href, target);
					return;
				}
			}

			// if (e.target.tagName == "A") return; // оставляем возможность клика ссылок

			// если в блоке с драгом (напр., furniture) - не срабатывать в процессе движения
			let dragging = e.target.closest(".js-draggable.js-dragging");
			if (dragging) return;

			el.classList.toggle(isActiveClass);
		});
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

		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel, .showrooms");

		galleryItems.forEach((el) => {
			if (!el) return;

			let items = el.querySelectorAll(".item, .sr-card");
			items.forEach((i) => {
				let gallery = i.querySelector(".item__gallery-item, .js-gallery");
				if (gallery) gallery.classList.add(isActiveClass);
			});
		});
	};
}

if (!window.catalogItemGalleryHandler) {
	window.catalogItemGalleryHandler = () => {
		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel, .showrooms"),
			isActiveClass = "is-active";

		galleryItems.forEach((el) => {
			if (!el) return;
			el.addEventListener("mouseover", (e) => {
				const item = e.target.closest(".item, .sr-card__gallery");
				if (!item) return;
				const gallery = item.querySelector(".item__gallery-wrapper, .sr-card__gallery-wrapper");
				if (!gallery) return;
				const gItems = gallery.querySelectorAll(".item__gallery-item, .js-gallery");
				if (!gItems) return;

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
					gallery.querySelector(".item__gallery-item, .js-gallery").classList.add(isActiveClass);
				});
			});
		});
	};
}

if (!window.isStrOverflowX) {
	window.isStrOverflowX = (el) => {
		return el ? el.scrollWidth > el.clientWidth : false;
	};
}

if (!window.addToSvgSprite) {
	window.addToSvgSprite = (svg) => {
		let sprite = document.querySelector(".svg-sprite");
		if (!sprite) return;
		sprite.insertAdjacentHTML("beforeend", svg);
	};
}

if (!window.setFavourites) {
	window.setFavourites = (id = false) => {
		if (!window.arFav) return;

		const favCount = document.querySelector(`[data-id="fav-amount"]`),
			isActiveClass = "is-active";

		if (!window.setFav) window.setFav = new Set(arFav);

		if (!id) {
			// при загрузке страницы выставить счетчик
			favCount.dataset.amount = setFav.size;
		} else {
			// при обновлении счетчик приходит аяксом, здесь обновлять не надо
			setFav.has(id) ? setFav.delete(id) : setFav.add(id);
		}

		// reset all
		let favsAll = document.querySelectorAll(`.js-fav`);
		favsAll.forEach((fav) => fav.parentNode.classList.remove(isActiveClass));

		// set favs
		setFav.forEach((el) => {
			let favs = document.querySelectorAll(`.js-fav[data-id="${el}"]`);
			favs.forEach((fav) => fav.parentNode.classList.add(isActiveClass));
		});
	};
}

if (!window.loadMore) {
	window.loadMore = () => {
		document.addEventListener("click", (e) => {
			const btn = e.target.closest(".js-load-more");
			if (!btn) return;
			loadMoreByBtn(btn);
		});

		let loadMoreByBtn = async (btn) => {
			if (!btn) return;
			const url = btn.dataset.url,
				targetClass = btn.dataset.target;
			if (!targetClass || !url) return;

			const target = document.querySelector(`.${targetClass}`);

			btnLoader(btn);

			// step 1: fetch get
			let response = await fetch(url);
			let result = await response.json();
			let callbackParam = {};

			// step 2: update page chunks
			if (result.status === true) {
				// update path and needed form actions if new url recieved
				if (result.url) {
					callbackParam = { url: result.url };
					setWindowLocation(result.url);
				}

				if (result.content) {
					// target.innerHTML += result; -- bad solution (target div flickering)
					let div = document.createElement("div");
					div.innerHTML = result.content;

					div.childNodes.forEach((i) => {
						target.appendChild(i);
					});
				}

				if (result.chunks) {
					updateChunks(result.chunks);
				}

				if (result.reinit) {
					switch (result.reinit) {
						case "filter":
							reinitFilterResults(callbackParam);
							break;
						default:
							break;
					}
				}
			}
			btnLoader(btn, "stop");
		};
	};
}

if (!window.tagsCollapseHandler) {
	window.tagsCollapseHandler = () => {
		const isOpenedClass = "is-opened";
		document.addEventListener("click", (e) => {
			if (e.target.classList.contains("js-tags-collapse")) {
				let btn = e.target,
					parent = btn.parentElement;
				parent.classList.toggle(isOpenedClass);
			}
		});

		["load", "resize"].forEach((evt) =>
			window.addEventListener(evt, () => {
				overflowTags();
			})
		);
	};
}

if (!window.overflowTags) {
	window.overflowTags = () => {
		const isOpenedClass = "is-opened",
			buttons = document.querySelectorAll(".js-tags-collapse");

		buttons.forEach((btn) => {
			let parent = btn.parentElement;
			if (!parent.classList.contains(isOpenedClass) && !isStrOverflowX(parent)) {
				parent.classList.remove("tags-collapse");
				btn.classList.add("hidden");
			} else if (parent.classList.contains(isOpenedClass)) {
				parent.classList.remove(isOpenedClass);
			} else {
				parent.classList.add("tags-collapse");
				btn.classList.remove("hidden");
			}
		});
	};
}

if (!window.stopVideo) {
	window.stopVideo = (element) => {
		let iframe = element.querySelector("iframe"),
			video = element.querySelector("video");
		if (iframe) {
			let iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
		if (video) {
			video.pause();
		}
	};
}
