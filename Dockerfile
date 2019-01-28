FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/hugo:0.40.3
WORKDIR /app
RUN npm install -g grunt-cli gulp
COPY . .
RUN npm install --save-dev toml grunt gulp string html-entities marked gulp-uglify gulp-htmlmin gulp-clean-css gulp-concat path js-yaml gulp-rev gulp-rev-collector
RUN gulp && grunt index
RUN hugo
RUN gulp version
RUN gulp replace

FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/nginx:1.11.4-alpine
COPY --from=0 /app/public /usr/share/nginx/html