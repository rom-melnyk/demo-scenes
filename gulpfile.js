const gulp = require('gulp');
const del = require('del');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

const browserify = require('browserify');
const uglify = require('uglify-es');
const composer = require('gulp-uglify/composer');

const NAME = require('./package.json').name;
const DEST = 'bin/';
const minify = composer(uglify, console);


/** @subtasks-group clean */
gulp.task('clean:js', () => del([ `${DEST}${NAME}.min.js*` ]));


/** @subtasks-group JS */
gulp.task('js:dev', [ 'clean:js' ],  () => {
    const b = browserify({
        entries: 'src/index.js',
        debug: true
    });

    return b.bundle()
        .pipe(source(`${NAME}.min.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST));
});

gulp.task('js:prod', [ 'clean:js' ],  () => {
    const b = browserify({
        entries: 'src/index.js'
    });

    return b.bundle()
            .on('error', gutil.log)
        .pipe(source(`${NAME}.min.js`))
        .pipe(buffer())
        .pipe(minify())
            .on('error', gutil.log)
        .pipe(gulp.dest(DEST));
});


/** @tasks-group */
gulp.task('dev', [ 'js:dev' ], () => {
    gulp.watch('src/**/*', [ 'js:dev' ]);
});

gulp.task('prod', [ 'js:prod' ]);

gulp.task('default', () => {
    console.log('\n\tUse `gulp dev` or `gulp prod`.\n');
});
