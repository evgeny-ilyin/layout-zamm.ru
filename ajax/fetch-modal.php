<?
try {
	usleep(150000);
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

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
					<label>
						Вы можете поделиться корзиной с помощью ссылки:
						<input type="text" id="share-link" value="https://zamm.ru/share/?z=YToyOntpOjY5NDg5NjtkOjI7aTo3MDEyO2Q6Mjt9" class="input input_fill" readonly>
					</label>
				</div>
				<button type="button" class="btn btn_yellow" onclick="copyShareLink(this)">
					<span>Копировать</span>
				</button>
			</div>';
			break;

		default:
			$content = '<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <b>Corporis</b> soluta ut odit officia repudiandae esse atque cumque iure beatae dicta neque, possimus similique ratione <a href="#">fugit architecto laborum</a> maiores sapiente vero!</p><p>Sapiente animi exercitationem explicabo voluptas ullam eum porro nihil mollitia minima fugiat asperiores quos quae impedit illo, esse consequuntur incidunt soluta numquam suscipit assumenda. Quas in iusto pariatur sit sed eos natus reiciendis quidem, aliquam corrupti sequi nulla nostrum laboriosam aut voluptas?</p>';
			break;
	}

	$resp = array('status' => true, 'content' => $content);

	if($svg)
	$resp['svg'] = $svg;

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
