<?
try {

	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	$rand = mt_rand(1192335, 9999999);

	if ($data) {
		// если первый шаг (отправлена форма)
		usleep(0);

		$url = 'https://deviart.ru/zamm/fetch-filter-chunks.php?filter-url-rand-' . $rand;
		$resp = array('url' => $url);

		header('Content-Type: application/json; charset=UTF-8');
		header('HTTP/1.1 200');
		print json_encode($resp);
	} else {
		// если второй шаг (отдать чанки)
		usleep(250000);


		$filterBody = file_get_contents('template-filter-body.html');
		$filterItems = file_get_contents('template-filter-products.html');
		$filterPages = file_get_contents('template-filter-pagination.html');

		$chunks = array();
		$chunks['filter-body'] = $filterBody;
		$chunks['filter-products'] = $filterItems;
		$chunks['filter-pagination'] = $filterPages;

		$resp = array('status' => true, 'chunks' => $chunks);

		header('Content-Type: application/json; charset=UTF-8');
		header('HTTP/1.1 200');
		print json_encode($resp);
	}
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
