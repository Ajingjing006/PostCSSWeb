'use strict';
var gulp = require('gulp');
var postcss = require('postcss');
var fs = require('fs')
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var syntax = require('postcss-scss');
var Midas = require('midas');
const midas = new Midas();

var scss = fs.readFileSync('src/styles.css', 'utf-8');

gulp.task('default', function () {
	postcss([ autoprefixer, nested() ]).process(scss, { syntax: syntax, stringifier: midas.stringifier, from:'undefined' }).then(function (result) {
	    fs.writeFileSync('styles-midas.html', result.content);
	});
});