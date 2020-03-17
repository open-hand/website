FROM registry.cn-shanghai.aliyuncs.com/c7n/hugo:0.40.3
WORKDIR /app
COPY . .
RUN cnpm install --save-dev toml grunt gulp string html-entities marked gulp-uglify gulp-htmlmin gulp-clean-css gulp-concat path js-yaml gulp-rev gulp-rev-collector
# RUN gulp && grunt index
RUN hugo
RUN gulp version
RUN gulp replace

FROM registry.cn-shanghai.aliyuncs.com/c7n/nginx:1.11.4-alpine
COPY --from=0 /app/public /usr/share/nginx/html