<?
try {
	usleep(150000);
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	$skuValue = $data[$data[name]];

	$s129 = array('129-1', '129-2');
	$s130 = array('130-1', '130-2','130-3', '130-4');
	$s131 = array('131-1', '131-2','131-3', '131-4','131-5', '131-6');
	$s132 = array('132-1', '132-2','132-3');


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
		'$pid' => $data['productId'],
		'$select[131]-opened' => $data['select[131]-opened'] == 1 ? 'is-opened' : '',
		'$select[131]-opened-val' => $data['select[131]-opened'] == 1 ? 1 : 0,
		'$select[132]-opened' => $data['select[132]-opened'] == 1 ? 'is-opened' : '',
		'$select[132]-opened-val' => $data['select[132]-opened'] == 1 ? 1 : 0,
	));
	foreach ($s129 as $value) {
		if($value == $data['select[129]']) {
			$propProps = strtr($propProps, array('$'.$value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$'.$value => '',));
		}
	}
	foreach ($s130 as $value) {
		if($value == $data['select[130]']) {
			$propProps = strtr($propProps, array('$'.$value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$'.$value => '',));
		}
	}
	foreach ($s131 as $value) {
		if($value == $data['select[131]']) {
			$propProps = strtr($propProps, array('$'.$value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$'.$value => '',));
		}
	}
	foreach ($s132 as $value) {
		if($value == $data['select[132]']) {
			$propProps = strtr($propProps, array('$'.$value => 'checked',));
		} else {
			$propProps = strtr($propProps, array('$'.$value => '',));
		}
	}

	$propButtons = file_get_contents('template-prop-section-buttons.html');
	$propButtons = strtr($propButtons, array(
		'$skuValue' => $skuValue,
	));

	$chunks = array();
	$chunks['item-id-' . $data['productId'] . '-top'] = $propTop;
	$chunks['item-id-' . $data['productId'] . '-pics'] = $propPics;
	$chunks['item-id-' . $data['productId'] . '-main'] = $propMain;
	$chunks['item-id-' . $data['productId'] . '-more'] = $propMore;
	$chunks['item-id-' . $data['productId'] . '-props'] = $propProps;
	$chunks['item-id-' . $data['productId'] . '-buttons'] = $propButtons;

	$resp = array('status' => true, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
