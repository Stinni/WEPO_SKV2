var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');

var sourceJS  = ['src/**/*.js', '!src/**/*.min.js'];
var sourceCSS = ['src/**/*.css', '!src/**/*.min.css'];

gulp.task('css', function () {
   return gulp.src(sourceCSS)
      .pipe(minifyCSS())
      .pipe(concat('chatApp.min.css'))
      .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
   return gulp.src(sourceJS)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('chatApp.min.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('default', ['js', 'css']);
