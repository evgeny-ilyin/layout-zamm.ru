import "lc-select/lc_select.min.js";

if (!window.selectsInit) {
	window.selectsInit = () => {
		new lc_select('select[data-select="custom"]', {
			wrap_width: "100%",
			pre_placeh_opt: true,
			enable_search: false,
		});
	};
}
