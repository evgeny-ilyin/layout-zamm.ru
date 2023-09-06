// Получить имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = "./src";
const buildFolder = "./build";

export const path = {
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/*.scss`,
		js: `${srcFolder}/js/app.js`,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgspriteIn: `${srcFolder}/svgsprite/*.svg`,
		svgspriteOut: `${srcFolder}/html/`,
	},
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		img: `${buildFolder}/img/`,
		deploy: `${buildFolder}/**/*.*`,
	},
	watch: {
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/scss/**/*.scss`,
		js: `${srcFolder}/js/**/*.js`,
		img: `${srcFolder}/img/**/*.*`,
		svg: `${srcFolder}/svgsprite/*.svg`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
};
