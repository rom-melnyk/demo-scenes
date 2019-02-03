const gulp = require('gulp');
const del = require('del');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

const browserify = require('browserify');
const uglify = require('uglify-es');
const composer = require('gulp-uglify/composer');

const ENTRY = 'src/index.js';
const DEST_NAME = 'demo.js';
const DEST_DIR = `demo/js/`;

const minify = composer(uglify, console);


function taskClean() {
  return del([ `${DEST_DIR}${DEST_NAME}*` ]);
}


function taskJSDev() {
  const b = browserify({
    entries: ENTRY,
    debug: true
  });

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(DEST_NAME))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_DIR));
}

function taskJSProd() {
  const b = browserify({
    entries: ENTRY
  });

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(DEST_NAME))
    .pipe(buffer())
    .pipe(minify())
    .on('error', gutil.log)
    .pipe(gulp.dest(DEST_DIR));
}

// ---------------------------------------

exports.dev = function dev(done) {
  gulp.watch([ 'src/**/*' ], { ignoreInitial: false }, gulp.series(taskClean, taskJSDev));
  done();
};

exports.prod = gulp.series(taskClean, taskJSProd);

exports.default = function _default(done) {
  console.log('\n\tUse `gulp dev` or `gulp prod`.\n');
  done();
};
