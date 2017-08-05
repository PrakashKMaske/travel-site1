let gulp = require('gulp')
let imagemin = require('gulp-imagemin')
let usemin = require('gulp-usemin')
let del = require('del')
let rev = require('gulp-rev')
let cssnano = require('gulp-cssnano')
let uglify = require('gulp-uglify')
let browserSync = require('browser-sync').create()

gulp.task('previewDist', function() {
  browserSync.init({
    server: {
      baseDir: 'docs'
    },
    notify: false,
    open: false
  })
})

gulp.task('deleteDistFolder', ['icons'], function() {
  return del("./docs")
})

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"))
})


gulp.task('copyGeneralFiles', ['styles', 'scripts'], function() {
  let pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"))
})

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin")
})

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"))
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'])
