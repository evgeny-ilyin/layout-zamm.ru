<?
try {
	usleep(150000);

	// json
	// $json = file_get_contents('php://input');
	// $data = json_decode($json, true);


	// post
	$data = $_POST;
	$element = json_decode($_POST['element'], true);
	$productId = $element["params"]["productId"];
	$skuValue = $element["name"];


	$rand = mt_rand(1192335, 9999999);

	$s129 = array('129-1', '129-2', '129-3');
	$s130 = array('130-1', '130-2', '130-3', '130-4');
	$s131 = array('131-1', '131-2', '131-3', '131-4', '131-5', '131-6');
	$s132 = array('132-1', '132-2', '132-3');

	$url = 'product.html?rand-' . $rand;

	$prodPhotos = '<div class="labels">
	<div class="label label_yellow-light">Налетай!</div>
	</div>
	<div class="product__gallery-preview">
	<div><img src="img/dev/product/card-' . rand(1, 3) . '.webp" width="465" height="465" alt="" itemprop="image" /></div>
	</div>
	<div class="product__gallery-showall">
	<a href="javascript:void(0)" class="link-angle _blue js-popup-gallery" data-target="gallery-showall">Смотреть все 5 фото</a>
	</div>';

	$prodCarousel = file_get_contents('template-prop-product-card-gallery.html');
	$prodCarousel = strtr($prodCarousel, array(
		'$skuValue' => ' (SKU ' . $skuValue . ')',
	));

	$prodContentGallery = file_get_contents('template-observer-content-gallery.html');

	$prodTabs1 = '<div class="tabs">
		<div class="tabs__header scrollblock">
			<button type="button" class="tab-nav js-tab-nav" data-tab="benefits">SKU Tab 1</button>
			<button type="button" class="tab-nav js-tab-nav" data-tab="materials">SKU Tab 2</button>
		</div>
		<div class="tabs__content">
			<div class="tab-block" data-tab-content="benefits">
				<p>new tab 1</p>
			</div>
			<div class="tab-block" data-tab-content="materials">
				<p>new tab 2</p>
			</div>
		</div>
	</div>';

	$propTop = '<div class="available _preorder">На заказ</div>
	<div class="article">Артикул: <span itemprop="sku">$skuValue</span></div>
	<div itemprop="brand" itemtype="https://schema.org/Brand" itemscope=""><meta itemprop="name" content="ZAMM" /></div>';
	$propTop = strtr($propTop, array(
		'$skuValue' => $skuValue,
	));

	$propPrice = '<div class="product__price">74 000 ₽</div>
	<link itemprop="availability" href="http://schema.org/InStock" />
	<meta itemprop="price" content="74000" />
	<meta itemprop="priceCurrency" content="RUB" />
	<meta itemprop="name" content="" />
	<meta itemprop="priceValidUntil" content="2031-01-01" />
	<link itemprop="url" content="https://zamm.ru/catalog/item/">';

	$propFav = '<div class="fav">
	<button type="button" class="js-fav" aria-label="В избранное" data-id="$pid" data-url="https://deviart.ru/zamm/fetch-fav.php"><svg><use xlink:href="#fav"></use></svg></button>
	</div>';
	$propFav = strtr($propFav, array(
		'$pid' => $productId,
	));

	$propProps = file_get_contents('template-prop-product-card-props.html');
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


	$propPurchase = '<div class="product__buy">
		<button type="button" class="btn btn_yellow btn_wide js-add-to-cart" data-id="$pid" data-url="https://deviart.ru/zamm/add-to-cart.php" data-cart="/cart/">
			<span>В корзину</span>
			<span>Товар в корзине</span>
		</button>
	</div>
	<div class="product__amount">
		<div class="amount-element">
			<button type="button" class="js-btn-minus" aria-label="Меньше"></button>
			<input type="number" name="amount" readonly min="1" max="20" step="1" value="1" aria-label="Количество" />
			<button type="button" class="js-btn-plus" aria-label="Больше"></button>
		</div>
	</div>';
	$propPurchase = strtr($propPurchase, array(
		'$pid' => $productId,
	));

	$propDelivery = '<div class="available _delivery"><a href="javascript:void(0)" class="link-angle _gray">Доставка в Хабаровск 15 дней. 8 990 ₽</a></div>';

	$propShowroom = 'Есть в шоуруме:
	<a href="javascript:void(0)">ТЦ Времена года</a>
	<a href="javascript:void(0)">Тверская, 12</a>
	<a href="javascript:void(0)" class="link-angle _gray js-show-hidden">и ещё 1</a>
	<a href="javascript:void(0)" class="hidden">Большая Грузинская ул., 1, стр. 1</a>';

	/* 	$propPics = file_get_contents('template-prop-section-pics.html');

	$propMain = file_get_contents('template-prop-section-main.html');
	$propMain = strtr($propMain, array(
		'$skuValue' => $skuValue,
	));
	
	$propMore = file_get_contents('template-prop-section-more.html');
	$propMore = strtr($propMore, array(
		'$skuValue' => $skuValue,
	));
	


	$propButtons = file_get_contents('template-prop-section-buttons.html');
	$propButtons = strtr($propButtons, array(
		'$pid' => $data['productId'],
		'$skuValue' => $skuValue,
	)); */

	$chunks = array();
	$chunks['product-photos'] = $prodPhotos;
	$chunks['photos-carousel'] = $prodCarousel;
	$chunks['product-content-gallery'] = $prodContentGallery;
	$chunks['product-tabs-1'] = $prodTabs1;
	$chunks['product-top'] = $propTop;
	$chunks['product-price'] = $propPrice;
	$chunks['product-fav'] = $propFav;
	$chunks['product-props'] = $propProps;
	$chunks['product-purchase'] = $propPurchase;
	$chunks['product-delivery'] = $propDelivery;
	$chunks['product-showroom'] = $propShowroom;



	// $chunks['item-id-' . $data['productId'] . '-pics'] = $propPics;
	// $chunks['item-id-' . $data['productId'] . '-main'] = $propMain;
	// $chunks['item-id-' . $data['productId'] . '-more'] = $propMore;
	// $chunks['item-id-' . $data['productId'] . '-buttons'] = $propButtons;

	$resp = array('status' => true, 'url' => $url, 'chunks' => $chunks);

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print json_encode($resp);
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
