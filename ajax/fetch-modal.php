<?
try {
	usleep(150000);
	// $json = file_get_contents('php://input');
	// $data = json_decode($json, true);

	switch ($_REQUEST['modal']) {
		case 'geo':
			$content = '
			<div class="modal__head">
				<svg>
					<use xlink:href="#geo"></use>
				</svg>
				Выберите город
			</div>
			<div class="modal__body">
				<div class="geo-selector">
					<div class="modal__form">
						<input type="text" name="search" placeholder="Город" autocomplete="off" class="input input_fill" data-quick-search="true" data-target="js-quick-search-list">
					</div>
		
					<div class="geo-selector__fav">
						<span>Например:</span>
						<a href="javascript:void(0)">Москва</a>
						<a href="javascript:void(0)">Санкт-Петербург</a>
					</div>
		
					<div class="geo-selector__cities js-quick-search-list">
						<a href="javascript:void(0)">Волгоград</a>
						<a href="javascript:void(0)">Воронеж</a>
						<a href="javascript:void(0)">Екатеринбург</a>
						<a href="javascript:void(0)">Казань</a>
						<a href="javascript:void(0)">Краснодар</a>
						<a href="javascript:void(0)">Красноярск</a>
						<a href="javascript:void(0)">Лондон</a>
						<a href="javascript:void(0)">Майами</a>
						<a href="javascript:void(0)" class="is-current">Москва</a>
						<a href="javascript:void(0)">Нижний Новгород</a>
						<a href="javascript:void(0)">Новосибирск</a>
						<a href="javascript:void(0)">Нью-Йорк</a>
						<a href="javascript:void(0)">Ростов-на-Дону</a>
						<a href="javascript:void(0)">Самара</a>
						<a href="javascript:void(0)">Санкт-Петербург</a>
						<a href="javascript:void(0)">Саратов</a>
						<a href="javascript:void(0)">Челябинск</a>
						<a href="javascript:void(0)">Ярославль</a>
					</div>
				</div>
			</div>';
			$svg = file_get_contents('template-observer-svg.html');
			break;

		case 'share':
			$content = '
			<div class="modal__head">Поделиться корзиной</div>
			<div class="modal__body">
				<div class="modal__form">
					<label class="block">
						Вы можете поделиться корзиной с помощью ссылки:
						<input type="text" id="share-link" value="https://zamm.ru/share/?z=YToyOntpOjY5NDg5NjtkOjI7aTo3MDEyO2Q6Mjt9" class="input input_fill" readonly>
					</label>
				</div>
				<button type="button" class="btn btn_yellow" onclick="copyShareLink(this)">
					<span>Копировать</span>
				</button>
			</div>';
			break;
		case 'profile':
			$content = '
			<div class="modal__head">
				Личные данные
			</div>
			<div class="modal__body">
				<form action="personal-profile.html" class="form" method="post" novalidate="">
					<input type="hidden" name="profileId" value="101">
		
					<div class="form__fieldset">
						<div class="form-item">
							<input type="text" name="ORDER_PROP_2" value="Константинопольский" class="input input_fill" data-required="" aria-label="Фамилия" placeholder="Фамилия *">
						</div>
						<div class="form-item">
							<input type="text" name="ORDER_PROP_1" value="Константин" class="input input_fill" data-required="" aria-label="Имя" placeholder="Имя *">
						</div>
						<div class="form-item">
							<input type="text" name="ORDER_PROP_3" value="" class="input input_fill" data-required="" aria-label="Отчество" placeholder="Отчество *">
						</div>
					</div>
		
					<div class="form__fieldset">
						<div class="form-item">
							Контакты
						</div>
						<div class="form-item">
							<input type="email" name="ORDER_PROP_4" value="" class="input input_fill" data-required="" aria-label="E-mail" placeholder="Ваш e-mail *">
						</div>
						<div class="form-item">
							<input type="tel" name="ORDER_PROP_5" value="" class="input input_fill" data-required="" aria-label="Телефон" placeholder="Ваш телефон *" data-pattern-type="phone">
						</div>
					</div>
		
					<div class="form__fieldset">
						<div class="form-item">
							Куда доставить
						</div>
						<div class="form-item js-query-wrapper">
							<input type="text" name="ORDER_PROP_7" value="" class="input input_fill" data-required="" aria-label="Город, улица, дом" placeholder="Город, улица, дом *" data-url="https://deviart.ru/zamm/fetch-query-input.php?block=query" data-query="true" autocomplete="off">
							<div class="form-item__query-result js-query-result scrollblock"></div>
						</div>
		
						<div class="form-items-row">
							<div class="form-item">
								<input type="text" name="ORDER_PROP_8" value="" class="input input_fill" aria-label="Подъезд" placeholder="Подъезд">
							</div>
							<div class="form-item">
								<input type="text" name="ORDER_PROP_9" value="" class="input input_fill" aria-label="Этаж" placeholder="Этаж">
							</div>
							<div class="form-item">
								<input type="text" name="ORDER_PROP_10" value="" class="input input_fill" data-required="" aria-label="Квартира" placeholder="Квартира *">
							</div>
						</div>
		
						<div class="form-item">
							<textarea name="ORDER_PROP_11" class="textarea textarea_fill" aria-label="Комментарий к заказу" placeholder="Уточните, пожалуйста, детали для доставщиков: например, как к вам проехать, нужен ли пропуск, код домофона"></textarea>
						</div>
					</div>
		
					<div class="form__fieldset">
						<button type="submit" class="btn btn_yellow btn_wide">Сохранить изменения</button>
					</div>
		
					<div class="form__fieldset">
						<a href="javascript:void(0)" class="link-cancel flex-center js-get" data-url="https://deviart.ru/zamm/fetch-modal.php?action=remove-profile&profileId=101" data-loader="modal">Удалить профиль</a>
					</div>
		
				</form>
			</div>';
			$nocache = true;
			break;
			case 'image_path_auto':
				$content = '<div class="modal__head"></div>
				<div class="modal__body"><img src="img/dev/showrooms/route-car-details.jpg" alt=""></div>';
				break;
			case 'image_path_walk':
				$content = '<div class="modal__head"></div>
				<div class="modal__body"><img src="img/dev/showrooms/route-ped-details.jpg" alt=""></div>';
				break;



	}

	switch ($_REQUEST['action']) {
		case 'remove-profile':
			$modal = 'close';
			$personalProfileList = '<div class="personal-profile">
			<div class="personal-profile__name">
			<span>Физическое лицо</span>
			Jon Doe
			</div>
			<div class="personal-profile__address">Московская обл., г. Химки, ул. Дружбы, д. 1</div>
			<div class="personal-profile__button">
			<button type="button" class="btn btn_gray js-modal-show" data-box-width="485" data-url="https://deviart.ru/zamm/fetch-modal.php?modal=profile">Изменить</button>
			</div>
			</div>';
			$chunks['personal-profile-list'] = $personalProfileList;
			break;
		}
		
	$resp = array('status' => true);

	if ($chunks)
		$resp['chunks'] = $chunks;

	if ($content)
		$resp['content'] = $content;

	if ($nocache)
		$resp['nocache'] = $nocache;

	if ($modal)
		$resp['modal'] = $modal;

	if ($svg)
		$resp['svg'] = $svg;

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
