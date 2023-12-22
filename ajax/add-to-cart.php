<?
try {
	usleep(150000);

	$data = $_POST;

	$amount = $data['amount'];

	$resp = array('status' => true, 'amount' => (int)$amount);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
