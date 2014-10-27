var gulp = require('gulp');
var less = require('gulp-less');
var handleErrors = require('../util/handleErrors');
var path = require('path');

gulp.task('less', function () {
  gulp.src('./src/less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('./build'));
});