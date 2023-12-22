<?

try {

	// usleep(150000);

	$data = $_POST;

	$id = $data['id'];
	$amount = rand(0, 5);

	$resp = array('status' => true, 'amount' => $amount);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => false)));
}
