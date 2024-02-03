<?
try {
	usleep(150000);
	$rand = mt_rand(1192335, 9999999);

	$resp = array('status' => true);

	$url = 'https://deviart.ru/zamm/fetch-filter-chunks.php?more-url-rand-' . $rand;

	$content = file_get_contents('template-more-products.html');
	$newPagination = file_get_contents('template-more-pagination.html');

	$chunks = array();
	$chunks['filter-pagination'] = $newPagination;


	if ($url)
		$resp['url'] = $url;

	if ($chunks)
		$resp['chunks'] = $chunks;

	$resp['content'] = $content;
	$resp['reinit'] = 'filter';

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
