"use strict";

var gulp = require("gulp");
var webserver = require('gulp-webserver');
var plumber = require("gulp-plumber");
var compass = require("gulp-compass");
var autoprefixer = require("gulp-autoprefixer");

var duration = require('gulp-duration');
var util = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var glob = require('glob');

var SCSS_FILE = "sass/*.scss";
var SASS_DIR = "../sass"
var CSS_DIR = "../css"
var TEMP_DIR = "../temp"

gulp.task("compass", function(){
  gulp.src([SCSS_FILE])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      sass: SASS_DIR,
      css: CSS_DIR
    }))
    .pipe(gulp.dest(TEMP_DIR))
    ;
});

var path_react = {
  OUT: "build.js",
  DEST_BUILD: "../js/build",
  ENTRY_POINT: glob.sync('src/*.jsx')
};

var props_react = {
  entries: path_react.ENTRY_POINT,
  transform: [reactify],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
};

var bundler = watchify(browserify(props_react));

bundler.on("update", jsxCompiile);

gulp.task("watchify", jsxCompiile);

function jsxCompiile(){
  return bundler.bundle()
    .on("error", function(err){
      console.log(util.colors.red("Oops! you have ERROR! \n" + err.message));
      this.emit('end');
    })
    .pipe(source(path_react.OUT))
    .pipe(duration('compiled "' + path_react.OUT + '"'))
    .pipe(gulp.dest(path_react.DEST_BUILD))
    ;
}

gulp.task("watch", function(){
  gulp.watch(["../" + SCSS_FILE], ["compass"]);
});

gulp.task("webserver", function(){
  gulp.src('../../tweetaroundhere')
    .pipe(webserver({
      livereload: true
    }))
    ;
});

gulp.task("default", function(){
  gulp.start('webserver');
  gulp.start('watch');
  gulp.start('watchify');
});