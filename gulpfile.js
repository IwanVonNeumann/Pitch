/**
 * Created by Iwan on 01.05.2016
 */

var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

gulp.task('less', function () {
    return gulp.src('styles/less/override.less')
        .pipe(less())
        .pipe(gulp.dest('styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('reload-js', function () {
    return gulp.src('scripts/**/*.*')
    // .pipe(gulp.dest('scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('reload-html', function () {
    return gulp.src('*.html')
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    })
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('styles/less/*.less', ['less']);
    gulp.watch('scripts/**/*.*', ['reload-js']);
    gulp.watch('*.html', ['reload-html']);
});


gulp.task('build', ['less']);

gulp.task('default', ['less', 'watch']);
