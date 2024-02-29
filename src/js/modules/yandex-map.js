if (!window.mapInit) {
	window.mapInit = () => {
		// Список шоурумов с кластеризацией
		const zMapContainer = document.querySelector(".map.map_showroom-all");
		if (!zMapContainer) return;

		let centerTo = data.features.find((i) => i.selected === true),
			pointerIcon = data.pointerIcon,
			clusterIcon = data.clusterIcon,
			zoomDefault = 15,
			options = { suppressMapOpenBlock: true, minZoom: 4, maxZoom: 20 };

		const zMap = new ymaps.Map(
			zMapContainer,
			{
				center: [0, 0],
				zoom: zoomDefault,
				controls: ["zoomControl", "fullscreenControl"],
			},
			options
		);

		// Кластеризация через objectManager
		let objectManager = new ymaps.ObjectManager({
			clusterize: true,
			gridSize: 24,
			clusterDisableClickZoom: true,
		});

		objectManager.objects.options.set({
			iconLayout: "default#image",
			iconImageHref: pointerIcon,
			iconImageSize: [35, 45],
			balloonMaxWidth: 254,
		});

		objectManager.clusters.options.set({
			clusterIcons: [
				{
					href: clusterIcon,
					size: [60, 60],
					offset: [-30, -30],
				},
			],
			balloonContentLayoutWidth: 440,
			balloonContentLayoutHeight: 140,
		});

		objectManager.add(data);

		zMap.geoObjects.add(objectManager);
		// zoomMargin нужен, если точки при getBounds оказались слишком близко к краю прямоугольника
		zMap.setBounds(objectManager.getBounds(), { checkZoomRange: true, zoomMargin: 10 }).then(function () {
			if (zMap.getZoom() > zoomDefault) zMap.setZoom(zoomDefault);

			if (!centerTo) return;
			zMap.setCenter(centerTo.geometry.coordinates, zoomDefault, {
				checkZoomRange: true,
			});
		});

		// Одиночный шоурум
		const showroomMapContainer = document.querySelector(".map.map_showroom");
		if (!showroomMapContainer) return;

		const showroomMap = new ymaps.Map(
			showroomMapContainer,
			{
				center: [0, 0],
				zoom: zoomDefault,
				controls: [],
			},
			options
		);

		// удалим детальную ссылку из описания текущего шоурума, т.к. мы уже на этой странице
		let pattern = /<a.*<\/a>/gi,
			target = data.features.find((i) => i.selected === true).properties.balloonContent;
		data.features.find((i) => i.selected === true).properties.balloonContent = target.replace(pattern, "");

		ymaps
			.geoQuery(data)
			.setOptions({
				iconLayout: "default#image",
				iconImageHref: pointerIcon,
				iconImageSize: [35, 45],
				balloonMaxWidth: 254,
			})
			.addToMap(showroomMap);

		if (!centerTo) return;
		showroomMap.setCenter(centerTo.geometry.coordinates, zoomDefault, {
			checkZoomRange: true,
		});
	};
}

// центрирование через отдельную переменную
// if (typeof centerId === "number") {
// 	let center = null,
// 		shop = data.features.find((i) => i.id === centerId);
// 	if (!shop) return;
// 	center = shop.geometry.coordinates;
// 	zMap.setCenter(center, zoomDefault, {
// 		checkZoomRange: true,
// 	});
// }
