var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var yaml = require('js-yaml');
var fs   = require('fs');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var dataPath = 'themes/choerodon-document-theme/data/static/';
var staticPath = 'themes/choerodon-document-theme/static';

var publicImg = "public/img";
var imgSrc = publicImg + "/**/*";

var home_css = ['style.choerodon.css','footer.css','home.css','notice.css', 'problem.css', 'function.css', 'service.css', 'cases.css', 'resources.css'];
var docs_css = ['style.choerodon.css','footer.css','docs.css'];
var blogs_css = ['style.choerodon.css','footer.css','blog-list.css'];
var cases_css = ['style.choerodon.css','footer.css','case-studies.css'];
var community_css = ['style.choerodon.css','footer.css','community.css','contribute.css','event.css'];

var staticCss = staticPath + "/css";
var publicCss = "public/css/"
var cssSrc = publicCss + '/**/*.css';

var staticJs = staticPath + "/js";
var publicJs = "public/js/";
var jsSrc = publicJs + "/**/*.js";

// hugo生成站点前执行
gulp.task('default', function(df) {
    // 整合各页面css
    gulp.src(home_css.map(function(file){
        return path.join(staticCss,file);
        }))
        .pipe(concat('home.css'))
        .pipe(gulp.dest(staticCss));

    gulp.src(docs_css.map(function(file){
        return path.join(staticCss,file);
        }))
        .pipe(concat('docs.css'))
        .pipe(gulp.dest(staticCss));
    
    gulp.src(blogs_css.map(function(file){
        return path.join(staticCss,file);
        }))
        .pipe(concat('blog-list.css'))
        .pipe(gulp.dest(staticCss));
    
    gulp.src(cases_css.map(function(file){
        return path.join(staticCss,file);
        }))
        .pipe(concat('case-studies.css'))
        .pipe(gulp.dest(staticCss));

    gulp.src(community_css.map(function(file){
        return path.join(staticCss,file);
        }))
        .pipe(concat('community.css'))
        .pipe(gulp.dest(staticCss));

    // 整合各页面并压缩Js
    var modules = fs.readdirSync(dataPath);

    modules.map(function(module) {
        var home = yaml.safeLoad(fs.readFileSync(dataPath+module, 'utf8'));

        gulp.src(home.js.map(function(file){
        var staticPath = 'themes/choerodon-document-theme/static';
            return path.join(staticPath,file);
            }))
            .pipe(concat(module.replace('.yaml','.js')))
            .pipe(uglify())
            .pipe(gulp.dest(staticJs));

        home.js= ['/js/'+module.replace('.yaml','.js')];
        
        fs.writeFileSync(dataPath+module,yaml.safeDump(home),'utf8');
     });

     df();
});


gulp.task('version', function(version) {

    // img生成对应版本号
    gulp.src(imgSrc)
    .pipe(rev())
    .pipe(gulp.dest(publicImg))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/rev/img'));

    // css压缩并生成对应版本号
    gulp.src(cssSrc)
    .pipe(rev())
    .pipe(cleanCSS())
    .pipe(gulp.dest(publicCss))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/rev/css'));

    // js生成对应版本号
    gulp.src(jsSrc)
    .pipe(rev())
    .pipe(gulp.dest(publicJs))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/rev/js'));

    version();
});

gulp.task('replace', function(replace) {

    //根据映射替换css引用的图片
    gulp.src(['public/rev/img/*.json', cssSrc])
    .pipe(revCollector())// 依照rev-manifest.json里的文件名映射进行替换
    .pipe(gulp.dest('public/css/'));

    //根据映射替换html静态资源引用名称并压缩html
    gulp.src(['public/rev/**/*.json', 'public/**/*.html'])
    .pipe(revCollector())// 依照rev-manifest.json里的文件名映射进行替换
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('public/'));

    replace();
});
