const gulp = require('gulp'),
  {htmlmin, sourcemaps: {init, write}, sass, concat, cssmin,
    print, babel, ngAnnotate, uglify, cachebust} = require('gulp-load-plugins')({
    pattern: ['gulp-*'],
    replaceString: /\bgulp[\-.]/,
    lazy: true,
    camelize: true
  }),
  cacheBust = new cachebust()

gulp.task('views', () => {
  return gulp.src('./public/views/**/*')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'))
})

gulp.task('build-css', () => {
  return gulp.src('./public/css/**/*')
    .pipe(init())
    .pipe(sass())
    .pipe(cacheBust.resources())
    .pipe(concat('styles.css'))
    .pipe(write('./maps'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('build-js', () => {
  return gulp.src('./public/JS/**/*.js')
    .pipe(init())
    .pipe(print())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(write('./'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('images', () => {
  return gulp.src('./public/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('build', ['views', 'build-css', 'build-js', 'images'], () => {
  return gulp.src('./public/index.html')
    .pipe(cacheBust.references())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  return gulp.watch(['./public/index.html', './public/css/**/*', './public/js/**/*', './public/views/**/*'], ['build'])
})

gulp.task('default', ['build', 'watch'])


