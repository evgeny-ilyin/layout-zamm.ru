<?

try {
	usleep(150000);

	$content = file_get_contents('template-content-gallery.html');

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print $content;
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
