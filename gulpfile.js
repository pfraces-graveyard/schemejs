'use strict';

var gulp = require('gulp');
var del = require('del');
var pegjs = require('gulp-pegjs');
var wrapper = require('gulp-wrapper');

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('pegjs', ['clean'], function () {
  return gulp.src('src/**/*.pegjs')
    .pipe(pegjs())
    .pipe(wrapper({
      header: 'module.exports = '
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean'], function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['pegjs', 'js']);
