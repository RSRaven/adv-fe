'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence'),
    debug = require('gulp-debug'),
    htmlmin = require('gulp-htmlmin'),
    csscomb = require('gulp-csscomb'),
    htmlhint = require('gulp-htmlhint'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'client_build/',
        js: 'client_build/js/',
        css: 'client_build/css/',
        img: 'client_build/img/',
        fonts: 'client_build/fonts/',
        libs: 'client_build/libs/'
    },
    src: {
        html: 'client_src/*.html',
        js: 'client_src/js/main.js',
        css: 'client_src/scss/styles.scss',
        img: 'client_src/img/**/*.*',
        fonts: 'client_src/fonts/**/*.*',
        libs: 'client_src/libs/**/*.min.js'
    },
    style: {
        html: 'client_src/**/*.html',
        css: 'client_src/scss/**/*.scss',
        js: 'client_src/js/**/*.js'
    },
    watch: {
        html: 'client_src/**/*.html',
        js: 'client_src/js/**/*.js',
        css: 'client_src/scss/**/*.scss',
        img: 'client_src/img/**/*.*',
        fonts: 'client_src/fonts/**/*.*'
    },
    clean: 'client_build'
};

var serverConfig = {
    server: {
        baseDir: "client_build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Project"
};


gulp.task('bower', function () {
    return bower();
});


gulp.task('build:html', function () {
    return gulp.src(path.src.html)
               .pipe(rigger())
               .pipe(gulpif( argv.prod, htmlmin([{collapseWhitespace: true, removeComments: true}]) ))
               .pipe(gulp.dest(path.build.html))
               .pipe(reload({stream: true}));
});

gulp.task('build:css', function () {
    return gulp.src(path.src.css)
               .pipe(sourcemaps.init())
               .pipe(sass())
               .pipe(prefixer())
               .pipe(gulpif( argv.prod, cssnano() ))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest(path.build.css))
               .pipe(reload({stream: true}));
});

gulp.task('build:js', function () {
    return gulp.src(path.src.js)
               .pipe(rigger())
               .pipe(sourcemaps.init())
               .pipe(gulpif( argv.prod, uglify()))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest(path.build.js))
               .pipe(reload({stream: true}));
});

gulp.task('build:images', function () {
    return gulp.src(path.src.img)
               .pipe(imagemin({
                   progressive: true,
                   svgoPlugins: [{removeViewBox: false}],
                   use: [pngquant({quality: '65-80', speed: 4})],
                   interlaced: true
                }))
               .pipe(gulp.dest(path.build.img))
               .pipe(reload({stream: true}));
});

gulp.task('build:fonts', function () {
    return gulp.src(path.src.fonts)
               .pipe(gulp.dest(path.build.fonts))
               .pipe(reload({stream: true}));
});

gulp.task('build:libs', function () {
    return gulp.src(path.src.libs)
               .pipe(gulp.dest(path.build.libs))
               .pipe(reload({stream: true}));
});

gulp.task('build', [
    'build:html',
    'build:css',
    'build:js',
    'build:images',
    'build:fonts',
    'build:libs'
]);


gulp.task('style:html', function () {
    return gulp.src(path.style.html)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task('style:jscs', function () {
    return gulp.src(path.style.js)
               .pipe( jscs({fix: true}) )
               .pipe(jscs.reporter())
               .pipe(gulp.dest(function (file) {
                    return file.base;
                }));
});

gulp.task('style:jshint', function () {
    return gulp.src(path.style.js)
               .pipe(jshint())
               .pipe(jshint.reporter());
});

gulp.task('style:css', function () {
    return gulp.src(path.style.css)
               .pipe(csscomb().on('error', handleError))
               .pipe(gulp.dest(function (file) {
                    return file.base;
                }));
});

gulp.task('style', [
    'style:html',
    'style:jscs',
    'style:jshint',
    'style:css'
]);

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('build:css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('build:images');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('build:fonts');
    });
});

gulp.task('webserver', function () {
    browserSync(serverConfig);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', function (cb) {
    runSequence('build', 'webserver', 'watch', cb)
});
