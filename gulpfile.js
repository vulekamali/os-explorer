'use strict';

var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-clean-css');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var frontSrcDir = path.join(__dirname, '/app');
var frontStylesDir = path.join(frontSrcDir, '/styles');

var publicDir = path.join(__dirname, '/public');
var publicStylesDir = path.join(publicDir, '/styles');
var publicFontsDir = path.join(publicDir, '/fonts');
var publicAssetsDir = path.join(publicDir, '/assets');

var nodeModulesDir = path.join(__dirname, '/node_modules');

gulp.task('default', [
  'app.styles',
  'app.assets',
  'vendor.styles',
  'vendor.fonts'
]);

gulp.task('app.styles', function() {
  var files = [
    path.join(frontStylesDir, '/styles.less')
  ];
  return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer({browsers: ['last 4 versions']}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(publicStylesDir));
});

gulp.task('app.assets', function() {
  return gulp.src([
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/os.svg'),
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/viewer.svg'),
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/osviewer.svg')
    ])
    .pipe(gulp.dest(publicAssetsDir));
});

gulp.task('vendor.styles', function() {
  var files = [
    path.join(nodeModulesDir, '/font-awesome/css/font-awesome.min.css'),
    path.join(nodeModulesDir, '/os-bootstrap/dist/css/os-bootstrap.min.css'),
    path.join(nodeModulesDir, '/angular/angular-csp.css')
  ];
  return gulp.src(files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(publicStylesDir));
});

gulp.task('vendor.fonts', function() {
  var files = [
    path.join(nodeModulesDir, '/font-awesome/fonts/*'),
    path.join(nodeModulesDir, '/os-bootstrap/dist/fonts/*')
  ];
  return gulp.src(files)
    .pipe(gulp.dest(publicFontsDir));
});
