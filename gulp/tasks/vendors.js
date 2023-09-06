/**
 * Копировать вендорские js и css в build
 * Используется, если не нужно импортировать эти файлы в единый app.js
 */
export const vendors = () => {
	// return vendorJS(), vendorCSS();
	return vendorJS();
};

function vendorJS() {
	const modules = [
		// "node_modules/isotope-layout/dist/isotope.pkgd.min.js", // если копировать, то ок, а при импорте в app.js ошибка: Module not found: Error: Can't resolve 'jquery'
	];
	return app.gulp.src(modules).pipe(app.gulp.dest(app.path.build.js));
}

function vendorCSS() {
	const modules = [
		// "node_modules/@fancyapps/ui/dist/fancybox.css",
	];
	return app.gulp.src(modules).pipe(app.gulp.dest(app.path.build.css));
}
