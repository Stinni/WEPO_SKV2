var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var source  = ['src/**/*.js', '!src/**/*.min.js'];

gulp.task('minify', function () {
   gulp.src(source)
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});

gulp.task('js', function () {
   return gulp.src(source)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('chatApp.min.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('default', []);
