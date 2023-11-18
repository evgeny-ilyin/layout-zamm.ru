import webpack from "webpack-stream";

export const js = () => {
	// https://qna.habr.com/q/985023
	// convert Gulp array into entry property for Webpack
	let fileName = null;
	let entryObj = {};
	app.path.src.js.map((filePath) => {
		fileName = filePath.split("/").pop().split(".").slice(0, -1).join(".");
		entryObj[fileName] = filePath;
	});
	//

	return app.gulp
		.src(app.path.src.js)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "JS",
					message: "<%= error.message %>",
				})
			)
		)
		.pipe(
			webpack({
				entry: entryObj,
				// mode: app.isBuild ? "production" : "development",
				mode: "production",
				output: {
					filename: "[name].js",
				},
				optimization: {
					minimize: false,
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(
			webpack({
				entry: entryObj,
				// mode: app.isBuild ? "production" : "development",
				mode: "production",
				output: {
					filename: "[name].min.js",
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		// .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.js)))
		.pipe(app.plugins.browsersync.stream());
};
