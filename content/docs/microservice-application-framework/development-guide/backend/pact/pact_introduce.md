+++
title = "pact介绍"
date = "2017-11-29"
draft = false
weight = 1
+++

## Pact是什么？
Pact是一个用于实现**消费者驱动**的**契约测试**的框架,它支持JVM,Ruby,.NET,Javascript,Go,Python,Swift等多种语言和平台。

## Pact使用流程

- Step 1： 服务消费者端编写单元测试，测试对服务提供者接口的客户端请求类。一运行测试，Pact框架便帮助自动生成json形式的pact文件(java中位于target/pacts中)。pact文件中含有交互的路径、方法、请求参数、请求头与期望响应等信息。

- Step 2： 将契约文件上传到pact broker(也可以放于某个提供者可拿到的文件夹中)

- Step 3： 服务提供者完成相关接口。

- Step 4: 服务提供者通过pact broker等方式获取契约文件，利用Pact框架提供的验证命令进行契约验证, 直到对服务提供者的接口发送请求并验证实际响应是否与期望响应相符。
