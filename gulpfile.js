const
  gulp = require('gulp'),
  deploy = require('gulp-gh-pages-will')

const publish = () => gulp.src('dist/**/*').pipe(deploy())

gulp.task('publish', publish)