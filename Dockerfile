FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cifront:0.5.0
RUN curl -o hugo_0.40.3_Linux-64bit.tar.gz \
    http://files.cn-hangzhou.aliyuncs.com/hogo/v0.40.3/hugo_0.40.3_Linux-64bit.tar.gz && \
    tar -zxvf hugo_0.40.3_Linux-64bit.tar.gz && \
    mv hugo /usr/local/bin/hugo
WORKDIR /app
RUN npm install -g grunt-cli && npm install toml string html-entities marked grunt
COPY . .
RUN hugo

FROM registry.cn-hangzhou.aliyuncs.com/tools/nginx:1.11.4-alpine
COPY --from=0 /app/public /usr/share/nginx/html