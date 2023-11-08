<?
try {
	usleep(0);
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

	switch ($_REQUEST['block']) {
		case 'search':
			if (empty($_REQUEST['q'])) {
				$content = '<div class="search-prompt"><b>Часто ищут</b><ul><li>стол Линда</li><li>офисный стол</li><li>стеллаж</li><li>корпусная мебель</li></ul></div>';
			} else {
				$content = file_get_contents('template-search-results.html');
			}
			break;

		default:
			$content = '<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <b>Corporis</b> soluta ut odit officia repudiandae esse atque cumque iure beatae dicta neque, possimus similique ratione <a href="#">fugit architecto laborum</a> maiores sapiente vero!</p><p>Sapiente animi exercitationem explicabo voluptas ullam eum porro nihil mollitia minima fugiat asperiores quos quae impedit illo, esse consequuntur incidunt soluta numquam suscipit assumenda. Quas in iusto pariatur sit sed eos natus reiciendis quidem, aliquam corrupti sequi nulla nostrum laboriosam aut voluptas?</p>';
			break;
	}

	$resp = array('status' => true, 'content' => $content);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
