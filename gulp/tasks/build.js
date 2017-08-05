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
      baseDir: 'dist'
    },
    notify: false,
    open: false
  })
})

gulp.task('deleteDistFolder', function() {
  return del("./dist")
})

gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./dist/assets/images"))
})

gulp.task('copyGeneralFiles', ['deleteDistFolder', 'styles', 'scripts'], function() {
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
    .pipe(gulp.dest("./dist"))
})

gulp.task('usemin', ['deleteDistFolder'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./dist"))
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin'])
