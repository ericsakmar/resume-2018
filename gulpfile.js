const gulp = require('gulp');
const inject = require('gulp-inject');
const inline = require('gulp-inline-source');
const stylus = require('gulp-stylus');
const webserver = require('gulp-webserver');

gulp.task('default', ['watch']);

gulp.task('copy', ['html', 'style']);

gulp.task('html', () => gulp.src('./src/*.html').pipe(gulp.dest('./dist')));

gulp.task('style', () =>
  gulp
    .src('./src/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist')),
);

gulp.task('assets', () =>
  gulp.src('./assets/*').pipe(gulp.dest('./dist/assets')),
);

gulp.task('inline', ['copy'], () =>
  gulp
    .src('./dist/index.html')
    .pipe(inline())
    .pipe(gulp.dest('./dist')),
);

gulp.task('serve', ['inline'], () =>
  gulp.src('./dist').pipe(
    webserver({
      port: 3000,
      livereload: true,
    }),
  ),
);

gulp.task('watch', ['serve'], () => gulp.watch('./src/*', ['inline']));
