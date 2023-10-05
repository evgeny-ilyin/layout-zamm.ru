<?
try {
	usleep(350000);
	$prop = file_get_contents('template-more-products.html');

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print $prop;
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
