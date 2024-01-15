<?

try {
	usleep(500000);

	$data = $_POST;

	switch ($data['PERSON_TYPE']) {
		case 1:
			$orderForm = file_get_contents('template-order-person1.html');
			break;

		case 2:
			$orderForm = file_get_contents('template-order-person2.html');
			break;

		default:
			# code...
			break;
	}

	switch ($_REQUEST['request']) {
		case 'promocode-submit':
			$promoList = '<div class="promocode__item">
					<div class="promocode__code">' . filter_input(INPUT_POST, "promocode", FILTER_SANITIZE_SPECIAL_CHARS) . '</div>
					<div class="promocode__status">-30%</div>
					<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=1"></button>
				</div>';
			break;

		case 'promocode-remove':
			if ($_REQUEST['id'] == 2) {
				$promoList = '<div class="promocode__item">
				<div class="promocode__code">PROMOCODE</div>
				<div class="promocode__status">-20%</div>
				<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=1"></button>
			</div>';
			}

			if ($_REQUEST['id'] == 1) {
				$promoList = '<div class="promocode__item _error">
						<div class="promocode__code">PROMOCODE</div>
						<div class="promocode__status"><small>промокод не найден</small></div>
						<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=2"></button>
					</div>';
			}
			break;

			case 'order-remove':
				$orderList = '<div class="personal-order">
						<div class="personal-order__wrapper order-info">
							<div class="order-info__header">
								<div class="order-info__data">
									<div class="order-info__number">№123456700</div>
									<div class="order-info__date">10.06.2023</div>
									<div class="order-info__count">Товаров: 1</div>
									<div class="order-info__total">29 620 ₽</div>
								</div>
								<div class="order-info__buttons">
									<a href="javascript:void(0)" class="btn btn_gray js-target-collapse" data-parent="order-info"><span>Подробнее</span></a>
								</div>
							</div>
	
							<div class="personal-order__items order-info__items is-collapsible is-collapsed">
								<div class="item">
									<div class="item__wrapper">
										<div class="item__content">
											<div class="item__image-wrapper">
												<div>
													<a href="javascript:void(0)" class="item__gallery-wrapper">
														<div class="item__gallery-item">
															<img src="img/dev/product/prod-1.webp" width="168" height="168" alt="">
														</div>
													</a>
												</div>
											</div>
	
											<div class="item__info">
												<div class="item__title">
													<a href="javascript:void(0)">Стол формат PRO с экраном ЛДСП</a>
												</div>
												<div class="item__prices">
													<div class="item__price _discount">29 620 ₽</div>
													<div class="item__oldprice">39 620 ₽</div>
												</div>
												<div class="item__count">1 шт.</div>
											</div>
	
										</div>
									</div>
								</div>
							</div>
	
							<div class="order-info__footer">
								<div class="order-info__payment">Оплата <div class="label label_green">Оплачен</div>
								</div>
								<div class="order-info__delivery">Доставка <div class="label label_green">Доставлен</div>
								</div>
							</div>
						</div>
					</div>';
				break;

		default:
			# code...
			break;
	}




	$chunks = array();
	if ($orderForm) $chunks['checkout-order-form'] = $orderForm;
	if ($promoList) $chunks['promocode-list'] = $promoList;
	if ($orderList) $chunks['personal-order-list'] = $orderList;




	$resp = array('status' => true, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
