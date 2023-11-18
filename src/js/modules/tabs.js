if (!window.tabsInit) {
	window.tabsInit = () => {
		const isActiveClass = "is-active",
			tabsItems = document.querySelectorAll(".tabs");
		if (!tabsItems) return;

		tabsItems.forEach((el) => {
			const currentActive = el.querySelector(`.${isActiveClass}`);
			if (currentActive) return;

			let items = el.querySelectorAll(".tabs__header, .tabs__content");
			if (!items) return;

			items.forEach((i) => {
				i.querySelector(".tab-nav, .tab-block").classList.add(isActiveClass);
			});
		});
	};
}

if (!window.tabsHandler) {
	window.tabsHandler = (observe = false) => {
		const isActiveClass = "is-active";

		if (observe) blockObserver(observe);

		document.addEventListener("click", (e) => {
			const trigger = e.target.closest(".js-tab-nav");
			if (!trigger || trigger.classList.contains(isActiveClass)) return;

			const currentActive = trigger.closest(".tabs").querySelectorAll(`.${isActiveClass}`),
				targetTab = trigger.dataset.tab,
				tabContent = trigger.closest(".tabs").querySelector(`[data-tab-content=${targetTab}]`);

			currentActive.forEach((el) => el.classList.remove(isActiveClass));

			trigger.classList.add(isActiveClass);
			tabContent.classList.add(isActiveClass);
		});
	};
}
