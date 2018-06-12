FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/hugo:0.40.3
WORKDIR /app
RUN npm install -g grunt-cli && npm install toml string html-entities marked grunt
COPY . .
RUN hugo

FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/frontbase:0.5.0
COPY --from=0 /app/public /usr/share/nginx/html