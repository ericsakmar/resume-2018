const {dest, series, src, watch} = require('gulp');
const inject = require('gulp-inject');
const inline = require('gulp-inline-source');
const stylus = require('gulp-stylus');
const webserver = require('gulp-webserver');

function copy() {
  return series(html, style, assets);
}

function html() {
  return src('./src/*.html').pipe(dest('./dist'));
}

function style() {
  return src('./src/style.styl')
    .pipe(stylus())
    .pipe(dest('./dist'));
}

function assets() {
  return src('./assets/*').pipe(dest('./dist/assets'));
}

function doInline() {
  return src('./dist/index.html')
    .pipe(inline())
    .pipe(dest('./dist'));
}

function serve() {
  return src('./dist').pipe(
    webserver({
      host: '0.0.0.0',
      port: 3000,
      livereload: true,
    }),
  );
}

function doWatch() {
  return watch('./src/*', series(html, style, assets, doInline));
}

exports.default = series(html, style, assets, doInline, serve, doWatch);
