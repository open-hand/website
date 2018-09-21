FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/hugo:0.40.3
WORKDIR /app
RUN npm install -g grunt-cli && npm install toml string html-entities marked grunt && npm install -g gulp
COPY . .
RUN npm install --save-dev gulp && npm install gulp-uglify &&  npm install gulp-clean-css gulp-concat path
RUN /usr/local/lib/node_modules/grunt-cli/bin/grunt index && gulp
RUN hugo

FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/nginx:1.11.4-alpine
COPY --from=0 /app/public /usr/share/nginx/html