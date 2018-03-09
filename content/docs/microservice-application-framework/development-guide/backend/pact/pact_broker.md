+++
title = "pact broker搭建"
date = "2017-11-29"
draft = false
weight = 2
+++

## docker-compose.yml
```yaml
version: '3'

services:

  postgres:
    image: postgres
    healthcheck:
      test: psql postgres --command "select 1"
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

  broker_app:
    image: dius/pact-broker
    ports:
      - "80:80"
    links:
      - postgres
    environment:
      PACT_BROKER_DATABASE_USERNAME: postgres
      PACT_BROKER_DATABASE_PASSWORD: password
      PACT_BROKER_DATABASE_HOST: postgres
      PACT_BROKER_DATABASE_NAME: postgres
      PACT_BROKER_BASIC_AUTH_USERNAME: pact
      PACT_BROKER_BASIC_AUTH_PASSWORD: pact

```

## 设置pact broker的用户名密码
    修改PACT_BROKER_BASIC_AUTH_USERNAME和PACT_BROKER_BASIC_AUTH_PASSWORD的值

## 启动
    docker compose up