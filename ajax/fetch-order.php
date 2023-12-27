<?

try {
	usleep(150000);

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
			<div class="promocode__code">'.filter_input(INPUT_POST, "promocode", FILTER_SANITIZE_SPECIAL_CHARS).'</div>
			<div class="promocode__status">-30%</div>
			<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=1"></button>
		</div>';
			break;
		
		case 'promocode-remove':
			if($_REQUEST['id'] == 2) {
				$promoList = '<div class="promocode__item">
				<div class="promocode__code">PROMOCODE</div>
				<div class="promocode__status">-20%</div>
				<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=1"></button>
			</div>';
			}

			if($_REQUEST['id'] == 1) {
				$promoList = '<div class="promocode__item _error">
				<div class="promocode__code">PROMOCODE</div>
				<div class="promocode__status"><small>промокод не найден</small></div>
				<button type="button" class="btn btn_remove js-promocode-remove" aria-label="Удалить промокод" data-url="https://deviart.ru/zamm/fetch-order.php?request=promocode-remove&id=2"></button>
			</div>';
			}
			break;
		
		default:
			# code...
			break;
	}

	


	$chunks = array();
	if($orderForm) $chunks['checkout-order-form'] = $orderForm;
	if($promoList) $chunks['promocode-list'] = $promoList;




	$resp = array('status' => true, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
