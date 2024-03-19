export const constructorJs = () => {
	const constructorJsDest = `${app.path.build.js}constructor`;
	return app.gulp.src(app.path.src.constructorJs).pipe(app.gulp.dest(constructorJsDest));
};
