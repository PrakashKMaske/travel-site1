let gulp = require('gulp')
let webpack = require('webpack')
// let modernizr = require('modernizr')

gulp.task('scripts', ['modernizr'], function(callback){
  webpack(require('../../webpack.config.js'), function(err, stats){
    if (err) {
      colsole.log(err.toString())
    }

    callback()
  });
})
