<?
try {
	usleep(150000);

	$data = $_POST;

	$amount = $data['amount'];
	$currentAmount = 8; // обновление кол-ва в инпуте согласно кратности. значение приходит с сервера

	$resp = array('status' => true, 'amount' => (int)$amount, 'currentAmount' => (int)$currentAmount);


	// js eval
	$chunks['eval'] = '<script type="text/javascript">
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(
			{
					"ecommerce": {
							"currencyCode": "RUB"
					}
			}
	);
	</script>';


	if ($chunks)
		$resp['chunks'] = $chunks;


	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
