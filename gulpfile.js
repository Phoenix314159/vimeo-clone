const gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*'],
        replaceString: /\bgulp[\-.]/,
        lazy: true,
        camelize: true
    }),
    cachebust = new $.cachebust();


gulp.task('views', () => {
    return gulp.src('./public/views/**/*')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'))
});

gulp.task('build-css', () => {
    return gulp.src('./public/css/**/*')
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe(cachebust.resources())
        .pipe($.concat('styles.css'))
        .pipe($.sourcemaps.write('./maps'))
        .pipe($.cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build-js', () => {
    return gulp.src('./public/JS/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.print())
        .pipe($.babel({presets: ['es2015']}))
        .pipe($.concat('bundle.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
    return gulp.src('./public/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['views', 'build-css', 'build-js', 'images'], () => {
    return gulp.src('./public/index.html')
        .pipe(cachebust.references())
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    return gulp.watch(['./public/index.html', './public/css/**/*', './public/js/**/*', './public/views/**/*'], ['build']);
});

gulp.task('default' , ['build', 'watch']);


