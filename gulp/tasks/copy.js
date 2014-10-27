var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src(['src/htdocs/**', 'node_modules/bootstrap/fonts/**'])
		.pipe(gulp.dest('build'));
});
