let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()


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
  watch('./app/assets/scripts/**/*.js', () => {
    gulp.start('scriptsRefresh')
  } )
  watch('./app/index.html', browserSync.reload )

})

// cssInject function
gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload()
})
