<?
try {
	usleep(150000);

	$resp = array('status' => true);
	$content = file_get_contents('template-more-events.html');

	if ($chunks)
		$resp['chunks'] = $chunks;

	if ($content)
		$resp['content'] = $content;

	if ($nocache)
		$resp['nocache'] = $nocache;

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
