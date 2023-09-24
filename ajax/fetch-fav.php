<?

try {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode(array('status' => true));
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => false)));
}
