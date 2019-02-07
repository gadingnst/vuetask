const
  gulp = require('gulp'),
  deploy = require('gulp-gh-pages')

const publish = () => gulp.src('dist/**/*').pipe(deploy())

gulp.task('publish', publish)