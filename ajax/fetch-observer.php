<?
try {
	usleep(150000);
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

	switch ($_REQUEST['block']) {
		case 'reviews':
			$content = file_get_contents('template-observer-reviews.html');
			$svg = file_get_contents('template-observer-svg.html');
			break;
		case 'features':
			$content = file_get_contents('template-observer-features.html');
			break;
		case 'carousel':
			$content = file_get_contents('template-observer-carousel.html');
			break;
		case 'tab':
			$content = file_get_contents('template-observer-tab.html');
			break;
		case 'content-gallery':
			$content = file_get_contents('template-observer-content-gallery.html');
			break;
		case 'photos':
			$content = file_get_contents('template-observer-photos.html');
			break;
		// case 'gallery':
		// 	$content = file_get_contents('template-observer-gallery.html');
		// 	break;
		case 'ideas':
			$content = file_get_contents('template-observer-ideas.html');
			break;
		case 'svg':
			$content = '<symbol id="test" xmlns="http://www.w3.org/2000/svg" viewBox="3 3 16 16"><defs><linearGradient gradientUnits="userSpaceOnUse" y2="-2.623" x2="0" y1="986.67" id="0"><stop stop-color="#ffce3b"/><stop offset="1" stop-color="#ffd762"/></linearGradient><linearGradient y2="-2.623" x2="0" y1="986.67" gradientUnits="userSpaceOnUse"><stop stop-color="#ffce3b"/><stop offset="1" stop-color="#fef4ab"/></linearGradient></defs><g transform="matrix(1.99997 0 0 1.99997-10.994-2071.68)" fill="#da4453"><rect y="1037.36" x="7" height="8" width="8" fill="#32c671" rx="4"/><path d="m123.86 12.966l-11.08-11.08c-1.52-1.521-3.368-2.281-5.54-2.281-2.173 0-4.02.76-5.541 2.281l-53.45 53.53-23.953-24.04c-1.521-1.521-3.368-2.281-5.54-2.281-2.173 0-4.02.76-5.541 2.281l-11.08 11.08c-1.521 1.521-2.281 3.368-2.281 5.541 0 2.172.76 4.02 2.281 5.54l29.493 29.493 11.08 11.08c1.52 1.521 3.367 2.281 5.54 2.281 2.172 0 4.02-.761 5.54-2.281l11.08-11.08 58.986-58.986c1.52-1.521 2.281-3.368 2.281-5.541.0001-2.172-.761-4.02-2.281-5.54" fill="#fff" transform="matrix(.0436 0 0 .0436 8.177 1039.72)" stroke="none" stroke-width="9.512"/></g></symbol>';
			break;

		default:
			$content = '<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <b>Corporis</b> soluta ut odit officia repudiandae esse atque cumque iure beatae dicta neque, possimus similique ratione <a href="#">fugit architecto laborum</a> maiores sapiente vero!</p><p>Sapiente animi exercitationem explicabo voluptas ullam eum porro nihil mollitia minima fugiat asperiores quos quae impedit illo, esse consequuntur incidunt soluta numquam suscipit assumenda. Quas in iusto pariatur sit sed eos natus reiciendis quidem, aliquam corrupti sequi nulla nostrum laboriosam aut voluptas?</p>';
			break;
	}

	$resp = array('status' => true, 'content' => $content, 'svg' => $svg);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
