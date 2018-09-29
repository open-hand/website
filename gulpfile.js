var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var yaml = require('js-yaml');
var fs   = require('fs');

var cssPath = 'themes/choerodon-document-theme/static/css';
var home_css = ['style.choerodon.css','footer.css','home.css','notice.css'];
var docs_css = ['style.choerodon.css','footer.css','docs.css'];
var blogs_css = ['style.choerodon.css','footer.css','blog-list.css'];
var cases_css = ['style.choerodon.css','footer.css','case-studies.css'];
var community_css = ['style.choerodon.css','footer.css','community.css','contribute.css','event.css'];

var staticPath = 'themes/choerodon-document-theme/static/';
var dataPath = 'themes/choerodon-document-theme/data/static/';

gulp.task('default', function() {
    // css
    gulp.src(home_css.map(function(file){
        return path.join(cssPath,file);
        }))
        .pipe(concat('home.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath));
    
    gulp.src(docs_css.map(function(file){
        return path.join(cssPath,file);
        }))
        .pipe(concat('docs.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath));
    
    gulp.src(blogs_css.map(function(file){
        return path.join(cssPath,file);
        }))
        .pipe(concat('blog-list.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath));
    
    gulp.src(cases_css.map(function(file){
        return path.join(cssPath,file);
        }))
        .pipe(concat('case-studies.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath));

    gulp.src(community_css.map(function(file){
        return path.join(cssPath,file);
        }))
        .pipe(concat('community.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath));

    // js
    var modules = fs.readdirSync(dataPath)
    .filter(function(file) {        
      return path.join(dataPath, file);
    });
    
    modules.map(function(module) {
        var home = yaml.safeLoad(fs.readFileSync(dataPath+module, 'utf8'));

        gulp.src(home.js.map(function(file){
            return path.join(staticPath,file);
            }))
            .pipe(concat(module.replace('.yaml','.js')))
            .pipe(uglify())
            .pipe(gulp.dest(staticPath+'js'));

        home.js= ['/js/'+module.replace('.yaml','.js')];

        fs.writeFileSync(dataPath+module,yaml.safeDump(home),'utf8');
     });
});