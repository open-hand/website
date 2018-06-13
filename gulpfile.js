// compress js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
gulp.task('jscompress', function() {
   return gulp.src('themes/choerodon-document-theme/static/src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('themes/choerodon-document-theme/static/js'));
});

// compress css
var cleanCSS = require('gulp-clean-css');

gulp.task('csscompress', function() {
    // 1. 找到文件
  return  gulp.src('themes/choerodon-document-theme/static/src/css/*')
    // 2. 压缩文件
        .pipe(cleanCSS())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('themes/choerodon-document-theme/static/css'));
});