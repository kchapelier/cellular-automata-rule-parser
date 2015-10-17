"use strict";

var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var sourceFiles = ['./index.js', './formats/*.js', './utils/*.js'],
    buildFiles = ['./gulpfile.js'],
    testFiles = ['./test/*.js'];

gulp.task('lint', function () {
    return gulp
        .src([].concat(sourceFiles, buildFiles))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('codestyle', function () {
    return gulp
        .src([].concat(sourceFiles, buildFiles, testFiles))
        .pipe(jscs());
});
