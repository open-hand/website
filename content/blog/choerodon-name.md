+++
title= "Choerodon猪齿鱼诞生记"
date= "2018-06-04"
author= "张礼军"
tags= [
    "名称由来"
]
categories= [
    "资讯类"
]
description= "很多人好奇我们的PaaS平台为什么会使用“Choerodon猪齿鱼”这个名字，这篇文章就和大家一起聊聊“Choerodon猪齿鱼”这个名字诞生的故事" 
img= "/img/blog/choerodon-name/1.png"
+++

自5月20日Choerodon猪齿鱼平台宣布开源以来，得到了社区成员的积极关注，很多人好奇我们的PaaS平台为什么会使用“Choerodon猪齿鱼”这个名字：

“猪齿鱼是一种鱼吗？真的有这种鱼吗？”

“这个名字很特别，我喜欢！”

“这个名字很难记，怎么会取这么一个名字呢？”

“我猜你是看过纪录片《蓝色星球2》！”

“猪齿鱼怎么和产品联系起来？”

......

下面让我和大家一起聊聊“Choerodon猪齿鱼”这个名字诞生的故事：

![](/img/blog/choerodon-name/1.png)

<h2 style="border-bottom: 1px solid;border-top: 1px solid;display: inline-block;">容器家族：从“船长”到“鹦鹉螺号”</h2>

最初我们想要打造这样一个企业级应用PaaS平台：基于容器技术，整合DevOps工具链、微服务应用框架，来帮助企业实现敏捷化的应用交付和自动化的运营管理。同时团队确定了技术堆栈的要求是充分的使用主流成熟的开源组件，利用开源工具的扩展机制来构建平台，为企业打造开放的技术平台和体系，让企业享受到开源社区带来的收益。

由于平台是基于容器技术的，一开始我们想取一个和容器相关产品有关的名字，对Docker、Kubernetes、Harbor、Helm等产品的名称进行了一些分析和研究，希望能从中得到一些灵感。

<img src="/img/blog/choerodon-name/docker.png" style="max-width: 0.4rem;"> Docker名如logo，是装载在“蓝鲸”这条大船上的集装箱，容器就是通过集装箱将“应用程序”封装在一起，同时保证集装箱之间不会互相影响且方便调配。

<img src="/img/blog/choerodon-name/k8s.png" style="max-width: 0.4rem;"> 自动化部署和操作应用程序容器的开源平台Kubernetes，名称来自古希腊语，有“掌舵手”的意思，logo是一个船舵，如“舵手” 一样为“集装箱货物”掌舵护航。

<img src="/img/blog/choerodon-name/helm.png" style="max-width: 0.4rem;"> Helm就更有意思了，作为Kubernetes应用的一个包管理工具，Helm是“舵柄”的意思，“Kubernetes舵手”操作着“Helm舵”，驾驶着装满“Docker集装箱”的船在大海里航行。

<img src="/img/blog/choerodon-name/harbor.png" style="max-width: 0.4rem;"> Harbor是存储和分发Docker镜像的服务器，标志是一个字形艺术化的灯塔，名称英译为“海港”。


我们的PaaS平台是基于以上工具来帮助企业聚焦于业务，更关注的是如何去使用好这些容器技术，那应该要取一个比这些更厉害的角色才行，已经有了集装箱、舵手、舵和海港了，缺少一个领航者“船长（Captain），这个看上去和我们的平台定位有较高的吻合度。

团队讨论之后觉得“船长（Captain）”这个名字不够具象，无法让人很容易地和某个具体的事物联系起来，无法使人产生好奇而想去了解它。并且这么多容器相关的开源项目也不曾使用它，我们使用“船长”可能会给人一种狂妄自大的感觉，所以决定还是不采用这个名字。

“船长（Captain）”取名失败后，Choerodon猪齿鱼架构师叶德华提出，自己小时候很喜欢《海底两万里》故事书中的主角尼莫（Nemo）船长，他制造并驾驶世界上独一无二的潜艇鹦鹉螺号（Nautilus）在海底进行惊险刺激的冒险旅行，他利用鹦鹉螺号攻击侵略者的军舰，并帮助那些被压迫的民族和穷苦的民众。

<img src="/img/blog/choerodon-name/3.jpeg" style="display:flex;margin:0 auto;">

尼莫船长沉着机智的正义形象和鹦鹉螺号无限海上航行的能力用到我们的平台应该是个挺不错的主意，得到了大家一致的认可。只可惜的是鹦鹉螺号（Nautilus）相关的名称和域名都已经被注册使用，这个取名以失败告终。

<h2 style="border-bottom: 1px solid;border-top: 1px solid;display: inline-block;">动物家族：“猎豹”到“深海鱼</h2>

大家都深感取名是个技术活，有种山穷水尽的感觉。

有人分析认为开源和动物界有很深的渊源，很多开源产品都是以动物来命名，动物的名称能够让人很容易记住并产生亲近感，大家可以挑选一些特别的动物来作为名称。

有成员提议用陆地上奔跑速度最快的动物“Cheetah猎豹”这个名字，猎豹迅捷快速飞奔的身姿给人一种灵敏潇洒的印象，很容易让它人喜欢和记住，但是好像和我们的PaaS平台无法很好的结合起来。

<img src="/img/blog/choerodon-name/4.png" style="display:flex;margin:0 auto;">

Choerodon猪齿鱼高级架构师蒋尚勤提出，《蓝色星球2》中记录了一种深海鱼，这种鱼使用工具来获得食物，颠覆了人类对鱼的认知，但是不记得他叫什么名字，可以查一下使用它......

通过观看纪录片确定这个鱼叫做Tuskfish，中文名翻译为“猪齿鱼”，影片中的这条鱼每天到海底利用鱼翅和嘴巴去除障碍物寻找蛤蜊，咬住蛤蜊后游过很长的距离去利用礁石来撞击蛤蜊壳，经过多次不懈的努力最终吃到最喜欢的食物蛤蜊肉。

<img src="/img/blog/choerodon-name/5.gif" style="display:flex;margin:0 auto;">

猪齿鱼，善于利用工具、行动灵活富有条理、有思想有毅力，和我们PaaS平台整合开源工具来提供服务能力，帮助企业聚焦业务，最终提升企业数字服务能力的定位相吻合。

但有一个问题是，Tuskfish感觉不够神秘也不够酷，我们希望能够像Kubernates这样有一个古希腊的名字，这样才能够有一种神秘感，我们通过鱼库网站www.fishbase.org 了解到，猪齿鱼属学名“Choerodon”，源于希腊语，单词由两部分组成，choiros 是希腊语“猪”的意思，odous则代表牙齿，一个词就概括了猪齿鱼的形象特征，很有特点，单词结构有记忆点，读起来也比较顺口，还带有一丝神秘色彩。

<img src="/img/blog/choerodon-name/6.png" style="display:flex;margin:0 auto;">

同时Choerodon相关的名称和域名都没有被使用，最终选定“Choerodon”猪齿鱼作为我们平台的名字，真是“众里寻他千百度”。

“Choerodon”这个词看着倒也顺眼，但是每次拼写是不是有点太长了？

那就给他取个小名吧：c7n

Choerodon = c7n