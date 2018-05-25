'use strict';
const gulp = require('gulp');
const cssmin = require('gulp-minify-css');
// const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
// plumber = require('gulp-plumber'), //предохранитель для остановки гальпа
// watch = require('gulp-watch'), //расширение возможностей watch
const connect = require('gulp-connect'); //livereload

const path = {
	build: {
		css: 'public/dist/'
	},
	src: {
		css: 'public/dist/main.css'
	},
	outputDir: './public/dist'
};

gulp.task('default', () => {
	gulp.src(path.src.css)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.css))
		.pipe(connect.reload());
});