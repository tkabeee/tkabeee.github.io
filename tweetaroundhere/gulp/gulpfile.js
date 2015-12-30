var gulp = require("gulp");
var webserver = require('gulp-webserver');
var plumber = require("gulp-plumber");
// var sass = require("gulp-sass");
var compass = require("gulp-compass");
var autoprefixer = require("gulp-autoprefixer");

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

// gulp.task("sass", function(){
//   gulp.src([SCSS_FILE])
//       .pipe(plumber())
//       .pipe(sass({
//         outputStyle: 'expanded',
//         compass: true
//       }))
//       .pipe(autoprefixer())
//       .pipe(gulp.dest(CSS_DIR))
//       ;
// });

gulp.task("webserver", function(){
  gulp.src('../../tweetaroundhere')
    .pipe(webserver({
      livereload: true
    }))
    ;
});

gulp.task("watch", function(){
  gulp.watch(["../" + SCSS_FILE], ["compass"]);
});

gulp.task("default", function(){
  gulp.start('watch');
  gulp.start('webserver');
});