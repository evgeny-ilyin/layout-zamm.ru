Для всех html сейчас подключены только необходимые для них js (а не полный набор, как для css)

// карусель: ядро
<script src="js/vendors/fancyapps/carousel.umd.js"></script>

// карусель: плагин autoplay, используется только в главной карусели
<script src="js/vendors/fancyapps/carousel.autoplay.umd.js"></script>

// карусель: плагин thumbs (превью), используются только в карточке товара (для галереи внизу описания и галереи основных изображений)
<script src="js/vendors/fancyapps/carousel.thumbs.umd.js"></script>



//! Для всех файлов ниже созданы min версии. Карусель от вендора уже минифицирована.

// карусель: инит
<script src="js/carousel-init.js"></script>

// общие скрипты для всех страниц
<script src="js/common.js"></script>

// "идеи" на главной
<script src="js/block-ideas.js"></script>

// табы в карточке товара ("Качество и технологии")
<script src="js/tabs.js"></script>

// для работы обсервера (подгрузка при прокрутке)
<script src="js/observer.js"></script>

// каталог: фильтрация (плюс сортировка, "показать ещё", теги фильтра, слайдер диапазонов)
<script src="js/filter.js"></script>



// товар: добавление товара в корзину и в избранное (карусель, каталог лист, карточка товара)
<script src="js/product-actions.js"></script>

// товар: переключение SKU по клику на свойство (карусель, каталог лист, карточка товара)
<script src="js/product-props.js"></script>

// товар: остальные скрипты, нужны только для карточки товара
<script src="js/product-card.js"></script>
