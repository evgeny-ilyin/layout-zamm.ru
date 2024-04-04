export const constructorJSON = () => {
	return app.gulp
		.src(app.path.src.constructorJSON)
		.pipe(app.plugins.newer(app.path.build.constructorJSON))
		.pipe(app.gulp.dest(app.path.build.constructorJSON))
		.pipe(app.plugins.browsersync.stream());
};
