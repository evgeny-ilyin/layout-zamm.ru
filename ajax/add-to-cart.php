<?
try {
	usleep(150000);
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

	$amount = $data[amount];

	$resp = array('status' => true, 'amount' => $amount);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
