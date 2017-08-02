const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    print = require('gulp-print'),
    babel = require('gulp-babel'),
    es2015 = require('babel-preset-es2015'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('views', () => {
    return gulp.src('./public/views/**/*')
        .pipe(gulp.dest('./dist/views'))
});

gulp.task('build-css', () => {
    return gulp.src('./public/css/**/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-js', () => {
    return gulp.src('./public/JS/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', () => {
    gulp.src('./public/images/**/*')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['views', 'build-css', 'build-js', 'images'], () => {
    return gulp.src('./public')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

// gulp.task('watch', () => {
//     return gulp.watch(['./public/index.html', './public/css/**/*', './public/js/**/*', './public/views/**/*'], ['build']);
// });

gulp.task('default' , ['build']);


