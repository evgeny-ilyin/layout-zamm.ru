<?
// print_r($_POST);
// return;

try {
	usleep(150000);

	// json
	// $json = file_get_contents('php://input');
	// $data = json_decode($json, true);
	// $skuValue = $data[$data[name]];


	// post
	$data = $_POST;
	$element = json_decode($_POST['element'], true);
	$productId = $element["params"]["productId"];
	$skuValue = $element["name"];


	$s129 = array('129-1', '129-2');
	$s130 = array('130-1', '130-2', '130-3', '130-4');
	$s131 = array('131-1', '131-2', '131-3', '131-4', '131-5', '131-6');
	$s132 = array('132-1', '132-2', '132-3');


	$propTop = file_get_contents('template-prop-section-top.html');
	$propTop = strtr($propTop, array(
		'$skuValue' => $skuValue,
	));

	$propPics = file_get_contents('template-prop-section-pics.html');

	$propMain = file_get_contents('template-prop-section-main.html');
	$propMain = strtr($propMain, array(
		'$skuValue' => $skuValue,
	));

	$propMore = file_get_contents('template-prop-section-more.html');
	$propMore = strtr($propMore, array(
		'$skuValue' => $skuValue,
	));

	$propProps = file_get_contents('template-prop-section-props.html');
	$propProps = strtr($propProps, array(
		'$pid' => $productId,
		'$select-opened[131]' => $data['select-opened'][131] == 1 ? 'is-opened' : '',
		'$select-opened-val[131]' => $data['select-opened'][131] == 1 ? 1 : 0,
		'$select-opened[132]' => $data['select-opened'][132] == 1 ? 'is-opened' : '',
		'$select-opened-val[132]' => $data['select-opened'][132] == 1 ? 1 : 0,
	));
	foreach ($s129 as $value) {
		if ($value == $data['select'][129]) {
			$propProps = strtr($propProps, array('$' . $value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$' . $value => '',));
		}
	}
	foreach ($s130 as $value) {
		if ($value == $data['select'][130]) {
			$propProps = strtr($propProps, array('$' . $value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$' . $value => '',));
		}
	}
	foreach ($s131 as $value) {
		if ($value == $data['select'][131]) {
			$propProps = strtr($propProps, array('$' . $value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$' . $value => '',));
		}
	}
	foreach ($s132 as $value) {
		if ($value == $data['select'][132]) {
			$propProps = strtr($propProps, array('$' . $value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$' . $value => '',));
		}
	}

	$propButtons = file_get_contents('template-prop-section-buttons.html');
	$propButtons = strtr($propButtons, array(
		'$pid' => $productId,
		'$skuValue' => $skuValue,
	));

	$chunks = array();
	$chunks['item-id-' . $productId . '-top'] = $propTop;
	$chunks['item-id-' . $productId . '-pics'] = $propPics;
	$chunks['item-id-' . $productId . '-main'] = $propMain;
	$chunks['item-id-' . $productId . '-more'] = $propMore;
	$chunks['item-id-' . $productId . '-props'] = $propProps;
	$chunks['item-id-' . $productId . '-buttons'] = $propButtons;

	$resp = array('status' => true, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
