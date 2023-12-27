<?
function plural_form($n, $forms)
{
	return $n % 10 == 1 && $n % 100 != 11 ? $forms[0] : ($n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? $forms[1] : $forms[2]);
}

try {
	usleep(150000);

	$data = $_POST;

	$dataArray = json_decode($_POST['formData'], true);
	$total = $dataArray['amount15555'] + $dataArray['amount18888'] + $dataArray['amount10000'];
	$totaltext = plural_form($total, array('товар', 'товара', 'товаров'));

	switch ($data['trigger']) {
		case 'changeAmountCart':

			$cartTotal = file_get_contents('template-cart-total.html');
			$cartTotal = strtr($cartTotal, array(
				'$total' => $total,
				'$totaltext' => $totaltext,
			));

			break;

		case 'removeItemCart':

			$cartTotal = file_get_contents('template-cart-total.html');
			$cartTotal = strtr($cartTotal, array(
				'$total' => "N штук",
				'$totaltext' => "",
			));
			$cartItems = file_get_contents('template-cart-items.html');
			$cartCarousel = file_get_contents('template-cart-carousel.html');

			$removedId = $_POST['itemId'];

			break;

		case 'addItemCart':

			$cartTotal = file_get_contents('template-cart-total.html');
			$cartTotal = strtr($cartTotal, array(
				'$total' => "N штук",
				'$totaltext' => "",
			));
			$cartItems = file_get_contents('template-cart-items-three.html');
			$cartCarousel = file_get_contents('template-cart-carousel.html');

			$addedId = $_POST['itemId'];

			break;
	}

	$chunks = array();
	if($cartTotal) $chunks['cart-total'] = $cartTotal;
	if($cartItems) $chunks['cart-items'] = $cartItems;
	if($cartCarousel) $chunks['cart-carousel'] = $cartCarousel;

	$resp = array('status' => true, 'chunks' => $chunks);

	if($removedId)
	$resp['removedId'] = $removedId;

	if($addedId)
	$resp['addedId'] = $addedId;


	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
