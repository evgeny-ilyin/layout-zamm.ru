<?

try {

	// usleep(150000);

	$data = $_GET;

	$resp = array('status' => true);

	// ошибка на 1 этапе
	// $resp = array('status' => false);
	// $resp['message'] = 'Подождите ещё ХХ секунд';


	if (!empty($data['f'])) {
		if ($data['f'] >= 5555) {
			$resp['url'] = 'personal-profile.html';
		} else {
			$resp['status'] = false;
			$resp['message'] = 'Неверный код подтверждения <b>(>= 5555)</b>';
		}
	}


	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => false)));
}
