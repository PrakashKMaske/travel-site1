let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync')


gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false,
    open: false
  })
})

// watch function

gulp.task('watch', ['browserSync'], () => {

  watch('./app/assets/styles/**/*.css', () => { gulp.start('cssInject') })
  watch('./app/assets/js/**/*.js', browserSync.reload )
  watch('./app/index.html', browserSync.reload )

})

// cssInject function
gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})
