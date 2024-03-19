<?
try {
	usleep(200000);

	// $resp[1] = array('status' => true, 'message' => 'Спасибо, ваше обращение очень важно для нас!');
	$resp[1] = array('status' => true, 'message' => '<h2>Спасибо!</h2>Ваше сообщение отправлено.<br>Скоро мы с вами свяжемся.', 'hideField' => true);
	$resp[2] = array('status' => false, 'message' => 'Произошла <b>ошибка</b>, обратитесь к администратору.');

	$n = rand(1, 2);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp[$n]);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
