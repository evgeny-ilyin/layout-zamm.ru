<?
try {
	usleep(350000);

	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	$rand = mt_rand(1192335, 9999999);

	$url = 'https://deviart.ru/zamm/fetch-filter-chunks.php?more-url-rand-' . $rand;
	$resp = array('url' => $url);

	$moreProducts = file_get_contents('template-more-products.html');
	$newPagination = file_get_contents('template-more-pagination.html');


	$chunks = array();
	$chunks['filter-pagination'] = $newPagination;

	$resp = array('status' => true, 'url' => $url, 'products' => $moreProducts, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
