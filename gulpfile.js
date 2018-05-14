var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// path definitions
var paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcJS: 'src/**/*.js',
    srcSASS: 'src/**/*.scss',
    srcJQuery: 'node_modules/jquery/jquery.js',
    srcPopperJs: 'node_modules/popper.js/dist/umd/popper.js',
    srcBootstrapDirSASS: 'node_modules/bootstrap/scss',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpCSS: 'tmp/**/*.css',
    tmpJS: 'tmp/**/*.js',
    tmpConcatJS: 'tmp/assets/js',

    dist: 'dist',
    distIndex: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
}

gulp.task('html', function() {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('sass', function() {
    gulp.src(paths.srcSASS)
        .pipe(sass({
            errLogToConsole: true,
            includePaths: paths.srcBootstrapDirSASS
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.tmp))
});

gulp.task('js', function() {
    gulp.src([
        paths.srcJQuery,
        paths.srcPopperJs,
        paths.srcJS
    ])
        .pipe(concat(paths.tmpConcatJS + '/main.js'))
        .pipe(gulp.dest(paths.tmp))
})

gulp.task('copy', ['html', 'sass', 'js']);

gulp.task('inject', ['copy'], function() {
    var css = gulp.src(paths.tmpCSS);
    var js = gulp.src(paths.tmpJS)

    return gulp.src(paths.tmpIndex)
        .pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function() {
    return gulp.src(paths.tmp)
        .pipe(webserver({
            port: 8080,
            livereload: true,
            open: true
        }));
});

gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.src, ['inject']);
});

/* dist tasks */
gulp.task('html:dist', function() {
    return gulp.src(paths.srcHTML)
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dist));
})

gulp.task('sass:dist', function() {
    return gulp.src(paths.srcSASS)
        .pipe(sass({
            errLogToConsole: true,
            includePaths: paths.srcBootstrapDirSASS
        }))
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('js:dist', function() {
    return gulp.src([
        paths.srcJQuery,
        paths.srcPopperJs,
        paths.srcJS
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist))
});

gulp.task('copy:dist', ['html:dist', 'sass:dist', 'js:dist']);

gulp.task('inject:dist', ['copy:dist'], function() {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    return gulp.src(paths.distIndex)
        .pipe(inject(css, { relative: true} ))
        .pipe(inject(js, { relative: true} ))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

gulp.task('clean', function() {
    del([paths.tmp, paths.dist]);
});

gulp.task('default', ['watch']);