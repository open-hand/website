// compress js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
// compress css
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function(){
  gulp.src('themes/choerodon-document-theme/static/css/*')
      .pipe(cleanCSS())
      .pipe(gulp.dest('themes/choerodon-document-theme/static/css'));
      
  gulp.src('themes/choerodon-document-theme/static/js/*')
      .pipe(uglify())
      .pipe(gulp.dest('themes/choerodon-document-theme/static/js'));
});