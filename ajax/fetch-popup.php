<?
try {
	usleep(150000);

	switch ($_REQUEST['popup']) {
		case 'projects':
			$content = '	<div class="fur-popup">
				<div class="fur-popup__header">Мебель в этом проекте</div>
				<div class="fur-popup__list">
					<a href="javascript:void(0)" class="fur-popup__item">
						<img src="img/dev/catalog/img-1.png" width="150" height="150" alt="" loading="lazy">
						<div>
							<div class="fur-popup__title">Стол формат PRO ЛДСП 2 ящика без аксессуаров лес черный/черный</div>
							<div class="fur-popup__prices">
								<div class="fur-popup__price _discount">29 620 ₽</div>
								<div class="fur-popup__oldprice">39 620 ₽</div>
							</div>
							<div class="fur-popup__article">Арт: '.rand(100000, 100100).'</div>
						</div>
					</a>
		
					<a href="javascript:void(0)" class="fur-popup__item">
						<img src="img/dev/catalog/img-2.png" width="150" height="150" alt="" loading="lazy">
						<div>
							<div class="fur-popup__title">Стол формат PRO</div>
							<div class="fur-popup__prices">
								<div class="fur-popup__price">9 620 ₽</div>
							</div>
							<div class="fur-popup__article">Арт: 999000</div>
						</div>
					</a>
		
					<a href="javascript:void(0)" class="fur-popup__item">
						<img src="img/dev/catalog/img-2.png" width="150" height="150" alt="" loading="lazy">
						<div>
							<div class="fur-popup__title">Стол формат PRO</div>
							<div class="fur-popup__prices">
								<div class="fur-popup__price">9 620 ₽</div>
							</div>
							<div class="fur-popup__article">Арт: 777000</div>
						</div>
					</a>
				</div>
				<a href="javascript:void(0)" class="btn btn_yellow btn_wide">Посмотреть проект</a>
			</div>';
			break;
	}


	$resp = array('status' => true);

	if ($chunks)
		$resp['chunks'] = $chunks;

	if ($content)
		$resp['content'] = $content;

	if ($nocache)
		$resp['nocache'] = $nocache;

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
