'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var nunjucksRender = require('gulp-nunjucks-render');

var frontSrcDir = path.join(__dirname, '/app');
var frontViewsDir = path.join(frontSrcDir, '/views');
var frontStylesDir = path.join(frontSrcDir, '/styles');
var frontImgDir = path.join(frontSrcDir, '/img');

var publicDir = path.join(__dirname, '/public');
var publicStylesDir = path.join(publicDir, '/styles');
var publicFontsDir = path.join(publicDir, '/fonts');
var publicImgDir = path.join(publicDir, '/img');
var publicOSStylesAssetsDir = path.join(publicDir, '/assets');

var nodeModulesDir = path.join(__dirname, '/node_modules');

gulp.task('default', [
  'app.html',
  'app.styles',
  'app.images',
  'vendor.fonts'
]);

gulp.task('app.html', function() {
  var files = [
    path.join(frontViewsDir, '/pages/**/*.html')
  ];
  return gulp.src(files)
    .pipe(nunjucksRender({
      path: frontViewsDir
    }))
    .pipe(gulp.dest(publicDir));
});

gulp.task('app.styles', ['app.styles.assets'], function() {
  var files = [
    path.join(frontStylesDir, '/**/*.scss')
  ];
  return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer({browsers: ['last 4 versions']}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(publicStylesDir));
});

gulp.task('app.styles.assets', function() {
  var files = [
    path.join(nodeModulesDir, 'os-styles/src/assets/**/*')
  ];

  return gulp.src(files)
    .pipe(gulp.dest(publicOSStylesAssetsDir));
});

gulp.task('app.images', function() {
  return gulp.src([
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/os.svg'),
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/viewer.svg'),
      path.join(nodeModulesDir,
        '/os-bootstrap/dist/assets/os-branding/vector/light/osviewer.svg'),
      path.join(frontImgDir, '**/*')
    ])
    .pipe(gulp.dest(publicImgDir));
});

gulp.task('vendor.fonts', function() {
  var files = [
    path.join(nodeModulesDir, '/font-awesome/fonts/*'),
    path.join(nodeModulesDir, '/os-bootstrap/dist/fonts/*')
  ];
  return gulp.src(files)
    .pipe(gulp.dest(publicFontsDir));
});
