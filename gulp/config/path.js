// Получить имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = "./src";
const buildFolder = "./build";
const jsFiles = [
	"./src/js/carousel-init.js",
	"./src/js/common.js",
	"./src/js/block-ideas.js",
	"./src/js/tabs.js",
	"./src/js/observer.js",
	"./src/js/filter.js",
	"./src/js/product-props.js",
	"./src/js/product-actions.js",
	"./src/js/product-card.js",
	"./src/js/cart.js",
	"./src/js/order.js",
	"./src/js/login.js",
];

export const path = {
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/*.scss`,
		js: jsFiles,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		fonts: `${srcFolder}/fonts/*.*`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgspriteIn: `${srcFolder}/svgsprite/*.svg`,
		svgspriteOut: `${srcFolder}/html/`,
	},
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		img: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
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
