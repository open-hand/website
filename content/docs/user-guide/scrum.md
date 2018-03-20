+++
title = "敏捷管理"
description = ""
weight = 2
+++

#  敏捷管理

   本页面介绍了用户使用敏捷管理时，如何使用用户故事地图、如何使用冲刺、如何使用看板以及如何操作用户故事、任务、缺陷。使用本页面，你可以了解：
   
   - [故事地图](#1)
   
   - [用户故事](#2)
   
   - [冲刺](#3)
   
   - [看板](#4)
   
   - [任务](#5)
   
   - [漏洞](#6)

<h2 id="1">故事地图</h2> 
  
  在开规划会议之前,用户可以按照角色，活动，任务分类来规划roadmap，整理用户故事，记录的用户故事将会被同步到gitlab的issue上，项目干系人可以在issue下放进行评论，对用户故事展开讨论。
  
  - **菜单层次**：项目层
  - **菜单路径**：项目 > 敏捷管理 > 故事管理 > 故事地图
  - **默认角色**：看板项目所有者、看板项目成员
 
### 使用故事地图 

 1. 添加角色

    角色：提出的用户需求是基于哪类角色考虑的。例如敏捷开发有三种角色，po，master和项目开发人员。
    
    点击`创建角色`鼠标光标会变为`加号`，当出现`加号`图标时，用户在角色这一行任意位置单击，即可添加角色。  

    ![添加角色](../assets/scrum/故事地图添加角色.jpg)
  
 1. 添加活动

    活动:基于某一个角色下，具体的用户场景。  

    点击`创建活动`鼠标光标会变为`加号`，当出现`加号`图标时，用户在活动这一行任意位置单击，即可添加活动。  

 1. 添加任务

    任务：用户场景的细化。
  
    点击`创建任务`鼠标光标会变为`加号`，当出现`加号`图标时，用户在任务这一行任意位置单击，即可添加任务。  

  
 1. 创建发布计划
  
    点击`创建发布计划`，即可在用户故事地图上面生成对应的发布计划，依次默认命名为发布计划1、发布计划2等，如果想修改发布计划名称或者删除发布计划，点击发布计划名称旁边的三点符号，可进行`修改`或者`删除`。处于安全考虑，已经有用户故事的发布计划，需要先删除里面的用户故事，才能删除整个发布计划。

    ![修改或删除发布计划](../assets/scrum/修改或删除发布计划.png)
  
 1. 创建卡片  
  
    用户故事：具体的需求。
    
    在故事地图界面移动鼠标，见到卡片创建的提示时，点击提示卡中间的文字部分，也可以创建相应的卡片，比如角色，活动，任务，用户故事。
    
    ![创建活动](../assets/scrum/创建活动.png)

    ![创建任务](../assets/scrum/创建任务.png)

    ![创建用户故事](../assets/scrum/创建用户故事.png)

 1. 修改与删除卡片
    
    修改卡片直接单击卡片，弹出卡片详情信息时即可修改标题。
    
    删除卡片需要在没有子卡的情况下才能删除，否则提示相应报错信息。
  
### 故事地图工具栏介绍  
  
 1. 未规划区的使用
  
    点击`未规划区`，会出现一个侧边栏，如下图所示，在侧边栏中会放入您在其他界面创建的不属于任何发布计划的故事，比如您在用户故事界面创建了一个未选择发布计划的用户故事，就会以一张故事卡的形式出现在此处，顶部的搜索和过滤可以进行高级搜索，找到您想要的卡片，您考虑好此故事放在哪个发布计划下比较合适时，也可以拖动到具体的发布计划下。

    ![未规划区入口](../assets/scrum/未规划区入口.png)

    ![未规划区展开界面](../assets/scrum/未规划区展开界面.png)
  
 1. 数据统计
  
    此项目下的数据进度的分析，可一键从此入口进入，也可去数据洞察界面选择具体项目查看。

    ![数据统计](../assets/scrum/数据统计.png)

    ![数据分析结果展示](../assets/scrum/数据分析结果展示.png)
  
 1. 导出为图片
  
    点击`导出为图片`，即可把当前的地图以图片形式保存下来，导出格式为png。

    ![导出为图片](../assets/scrum/导出为图片.png)
  
 1. 放大缩小
  
    点击`放大搜索`标志，或者拖动放大缩小的滚动条，都可完成整个地图的放大缩小。

    ![放大缩小](../assets/scrum/放大缩小.png)

<h2 id="2">用户故事</h2> 
  
  用户故事界面是用户故事的列表展现形式，在这里可以集中查看您创建的所有的用户故事，以及其下的任务缺陷等，方便快捷。
  
  - **菜单层次**：项目层
  - **菜单路径**：项目 > 敏捷管理 > 故事管理 > 用户故事
  - **默认角色**：看板项目所有者、看板项目成员
  
### 创建用户故事
  
  点击`创建故事`，出现详情信息编辑的窗口，在窗口中进行编辑，编辑完成之后点击保存。

  ![创建故事](../assets/scrum/创建故事.png)

### 搜索用户故事
  
  点击`过滤`可以进行高级搜索
    
  ![过滤](../assets/scrum/过滤.png)
 
### 删除用户故事
    
  未进入冲刺的用户故事可以删除。

### 快捷创建任务
    
  可以快捷创建用户故事下面的任务。

### 快捷创建缺陷
    
  可以快捷创建用户故事下面的缺陷。

  ![操作](../assets/scrum/操作.png)
  
<h2 id="3">冲刺</h2> 
  
  在冲刺中，可方便为您管理一个迭代周期内要完成的故事，并为您进行后台数据监测，可视化故事完成的情况，冲刺作为用户故事地图和看板的衔接环节，开启冲刺之后才能使用看板的全部功能。
  
  - **菜单层次**：项目层
  - **菜单路径**：项目 > 敏捷管理 > 冲刺管理 > 冲刺
  - **默认角色**：看板项目所有者、看板项目成员
  
### 创建冲刺
  
  点击`创建冲刺，选择发布计划，输入冲刺名称，选择预计的冲刺起止时间(不必输)，即可创建一个新的冲刺。
  
  ![创建冲刺](../assets/scrum/创建冲刺.png)
  
### 搜索冲刺
  
  可以在工具栏进行搜索。

  ![搜索](../assets/scrum/搜索.png)
  
### 开启/关闭冲刺
      
  可以快捷开启或者关闭冲刺，完成状态切换。
  
  点击`开启冲刺`可开启当前冲刺，开启之后，数据洞察就开始记录当前冲刺的数据。冲刺内添加的故事也会自动导入看板中，并放在第一列。
  
  点击`关闭冲刺`可关闭当前冲刺，关闭之后不能再开启。

### 编辑冲刺信息

  可以修改冲刺的具体信息，如冲刺名称，开始和结束时间，但是发布计划不允许修改。

  ![冲刺操作](../assets/scrum/冲刺操作.png)
 
### 添加故事
      
  选择故事来源，从故事地图，或者未规划的故事中，勾选需要导入的故事，点击确定，添加到冲刺中，添加进冲刺的故事，在故事地图界面的颜色会与没有导入冲刺的颜色有一个变化。
    
### 创建任务
      
  可以创建进入到冲刺中的用户故事下的具体任务。
    
### 创建缺陷
      
  可以创建用户故事下或者任务下测试出现的bug。
      
  ![冲刺详情](../assets/scrum/冲刺详情.png)

### 筛选故事
      
  可以对故事，任务和缺陷进行分类筛选。
      
  ![冲刺筛选](../assets/scrum/冲刺筛选.png)

### 移除故事
      
  可以把导入冲刺的故事移除，移除后不会在故事地图里面删除，只是故事地图中的卡片颜色会变为未导入状态。也可以导入到其他冲刺中。
      
  ![冲刺移除操作](../assets/scrum/冲刺移除操作.png)
  
<h2 id="4">看板</h2> 

  开启冲刺之后才能使用看板的全部功能。看板可以取代物理看板，也可以可视化您的工作流，同时后台会记录所以操作的时间数据，帮您完成数据分析和记录工作。
  
  - **菜单层次**：项目层。
  - **菜单路径**：项目>敏捷管理>冲刺管理>看板。
  - **默认角色**：看板项目所有者、看板项目成员
  
 1. 选择模板
  
    进入看板之后，先根据您的需要，选择一个看板模板，单击某个模板，可查看详情，双击就会为您选择当前模板并打开，看板界面没有卡片时，您也可以更换模板。

    ![看板模板](../assets/scrum/看板模板.png)  

    ![模板详情](../assets/scrum/模板详情.png)
  
 1. 开启冲刺后看板展示
  
    进入看板之后，您在当前开启的冲刺中添加的故事，会自动为您导入到当前看板，并放在SprintBacklog里面（第一列）

 1. 创建卡片
    
    点击`创建卡片`，出现卡片详情编辑的窗口，选择卡片类型，故事，任务，缺陷，可创建对应类型的卡片，创建的卡片会同步到故事地图界面，放在当前发布计划的第一个角色的第一个任务列里。

    ![创建卡片](../assets/scrum/创建卡片.png)
    
    ![卡片详情编辑界面](../assets/scrum/卡片详情编辑界面.png)

 1. 看板绘制
      
    点击`看板绘制`进入看板编辑界面：
      
    1)增加列
      
    2)绘制泳道
      
    3)增加/减少列高
      
    4)撤销/恢复
      
    5)保存
      
    6)在制品和起始列设置

    ![看板绘制](../assets/scrum/看板绘制.png)  
    
 1. 拖动故事卡
    
    点击故事卡，可按需在`子卡`处拖动任务卡或bug卡至看板对应位置。
  
<h2 id="5">任务</h2> 

  可以查看您创建的所有任务，可视化您的任务流，同时后台会记录所以操作的时间数据，帮您完成数据分析和记录工作。
  
  - **菜单层次**：项目层。
  - **菜单路径**：项目 > 敏捷管理 > 任务和漏洞 > 任务。
  - **默认角色**：看板项目所有者、看板项目成员
  
### 查看任务
  
  在任务界面，您可以查看您所有创建的任务，并且可以高级搜索您要找的任务。
  
### 删除任务
  
  可以在<操作>中完成删除，快捷创建缺陷的快捷操作

  ![任务](../assets/scrum/任务.png)
  
<h2 id="6">漏洞</h2> 
  
  可以查看您创建的所有漏洞。
  
  - **菜单层次**：项目层。
  - **菜单路径**：项目>敏捷管理>任务和漏洞>漏洞。
  - **默认角色**：看板项目所有者、看板项目成员

### 查看缺陷
    
  在任务界面，您可以查看您所有创建的缺陷，并且可以高级搜索您要找的缺陷。
    
### 删除缺陷
    
  可以在<操作>中完成删除缺陷。

  ![漏洞](../assets/scrum/漏洞.png)



  +++
title = "Scrum Management"
description = ""
weight = 2
+++

#  Scrum Management

   This chart explains how to use user story maps, how to use sprints, how to use kanbans, and how to operate user stories, tasks, and bugs as using Scrum Management. As follows:
   
   - [Story Map](#1)
   
   - [User Story](#2)
   
   - [Sprint](#3)
   
   - [Kanban](#4)
   
   - [Task](#5)
   
   - [Bug](#6)

<h2 id="1">Story Map </h2> 
  
  Before planning meetings, users can plan roadmaps and organize user stories according to their roles, activities, and task categories. Besides, the recorded user stories will be synchronized to gitlab's issue. Project stakeholders can comment on the issue and discuss user stories.
  
  - **Menu Layout**：Project Layout
  - **Menu Path**：Project > Scrum Management > Story Management > Story Map
  - **Default Role**：Kanban project owner, Kanban project member
 
### Use story map  

 1. Add roles

    Role: The user needs are based on which type of role to consider. For example, agile development has three roles: po, master, and project developer.
    
    When you click <Create Role>, the mouse cursor will change to the "plus ". And when the" plus "icon appears, the user can click at any position in the interface of Role to add a role.   

    ![Add roles](../assets/scrum/故事地图添加角色.jpg)
  
 1. Add activities

    Activity: It means a specific user scenarios based on a role.  

    When you click <Create activities>, the mouse cursor will change to the "plus ". And when the "plus" icon appears, the user can click at any position in the Activity to add an activity.  

 1. Add tasks

    Task: The detail of user scenario
  
    When you click <Create tasks>, the mouse cursor will change to the "plus ". And when the "plus" icon appears, the user can click at any position in the Task to add a task.  

  
 1. Create release plan
  
    When you click <Create release plan> button, the related Release Plan could be created on the user story map, which be default named as Release Plan 1, Release Plan 2..... If you want to modify the release plan name or delete Release plan, you can modify or delete Release plan by clicking the three-point symbol next to the plan name. For security reasons, if the release plan exist users’ stories, before deleting the entire release plan, you need to delete all users’ stories which requires the user story in Delete to Delete the entire release plan.

    ![Modify or delete Release plan](../assets/scrum/修改或删除发布计划.png)
  
 1. Create card   
  
    User stories: Specific requirement.
    
    When you move the mouse around the story map interface and see the text about creating the card, you should click cue in the middle of card and the corresponding card is created, such as roles, activities, tasks, and user stories.
    
    ![Create activities](../assets/scrum/创建活动.png)

    ![Create tasks](../assets/scrum/创建任务.png)

    ![Create user stories](../assets/scrum/创建用户故事.png)

 1. Modify/delete card
    
    Modify card: Click on the card directly, modify the title when the card details are popped up.
    
    Delete card: The card can only be deleted if there is no sub card. Otherwise, the interface will prompt an error message.

  
### Introduce story map toolbar 
  
 1. Use of unplanned areas.
  
    Click <Unplanned areas>, a sidebar will appear, as shown in the following figure. The sidebar will contain stories of unreleased plan in other screens. For example, if you create a user story of unreleased plan in the user story interface, a story card will appear here. Besides, not only if you want to find a card, you can do an advanced search with the search and filter in the top of the sidebar, but also you can drag the story to the specific Release plan that you think about this story may be more suitable for the Release plan.

    ![The entrance of the Unplanned area](../assets/scrum/未规划区入口.png)

    ![The interface of the Unplanned area](../assets/scrum/未规划区展开界面.png)
  
 1. Data statistics
  
    If you want to analyze the date statistics about one project, you can check it not only in this entrance but also in the data insight interface which could select specific project. 

    ![Data statistics](../assets/scrum/数据统计.png)

    ![Data analysis results ](../assets/scrum/数据分析结果展示.png)
  
 1. Export image
  
    Click< Export image >, you can save the current map as a picture and export it as PNG.

    ![Export image](../assets/scrum/导出为图片.png)
  
 1. Zoom-in and zoom-out
  
    If you want to complete the zoom of the entire map, you click not only to the icon of enlarge, but also to zoom in and out of the scroll bar. 

    ![Zoom-in and Zoom-out](../assets/scrum/放大缩小.png)

<h2 id="2"> User story </h2> 
  
  The user story interface is a list of user stories, where you can focus on all the user stories you've created, as well as the task defects below.
  
  - **Menu Layout**：Project Layout
  - **Menu Path**：Project > Scrum Management > Story Management > 用户故事User story
  - **Default Role**：Kanban project owner, Kanban project member
  
### Create story
  
  Click <Create story>, and then the window for editing the details appear. Thus you can do an edit in the window, click “save” after editing.

  ![Create story](../assets/scrum/创建故事.png)

### Advanced search
  
  You click < filtration >, and then you can do an advanced search. 
    
  ![filtration](../assets/scrum/过滤.png)
 
### Delete uer story
    
  You can delete the user story without sprit.

### Create task quickly
    
  You can create a task in the user story quickly.

### Create filtration quickly
    
  You can create a filtration in the user story quickly.

  ![Operation](../assets/scrum/操作.png)
  
<h2 id="3">Sprint</h2> 
  
  Sprint not only play the role of conveniently managing the story completed in the iterative cycle for you and but also be a back-end data monitor for you. Meanwhile, it comes to the completion status for the visual story, you can use all the functions of Kanban until you carry out the sprint, because the sprint is the link connecting the story maps and the Kanban.
  
  - **Menu Layout**：Project Layout
  - **Menu Path**：Project > Scrum Management > Sprit & Kanban > Sprit.
  - **Default Role**：Kanban project owner、Kanban project members
  
### Create sprint
  
  If you want to create a new sprint, you can click <Create sprint>, select released plan and the anticipated starting and ending times of sprints that you anticipated. 
  
  ![Create sprint](../assets/scrum/创建冲刺.png)
  
### Search sprint
  
  You can do a search in the toolbar

  ![Search](../assets/scrum/搜索.png)
  
### Turn on / off sprint 
      
  You can quickly turn on or off the sprint to complete the state switch.
  
  When you click <Turn on sprint>, the current sprint will be carried out. At the sometime, data insight monitor began to record data after the current sprint, and the stories in the sprint auto import in the Kanban, in addition, they are put in the first column. 
  
  If you want to turn off the sprint, click < Turn off sprint >, but you need to know that it will not turn on again after closing.

### Edit sprint

  The information of the sprint can be modify, such as, sprint name,  starting and ending time. But the release plan could not be modify. 
  ![Operation of sprint](../assets/scrum/冲刺操作.png)
 
### Add story
      
  If you want to add a story, you need do those operations. First of all, you need select a resource for the story, such as story map and unplanned story. Secondly, you can select the story needed to import, and click “OK” button,adding them to the sprint. Finally, you will see that the color about the story map has been changed after it be import into the sprint.
    
### Create task
      
  You can create a specific task in the user story that has been import into the sprint.
    
### Create bug
      
  You can create the bug appeared in the user story and in the task’s test. 
      
  ![The detail of sprit](../assets/scrum/冲刺详情.png)

### Filtration
      
  You can classify and filtrate the story, task and filtration.
      
  ![Filtration](../assets/scrum/冲刺筛选.png)

### Remove story
      
  You can remove the story imported in the sprint. After removing, you will notice that the story will not be deleted in the story map, but the card color in the story map becomes another color to represent that the story be not imported in the sprint. 
      
  ![Remove story](../assets/scrum/冲刺移除操作.png)
  
<h2 id="4">Kanban</h2> 

  You can use all functions of kanban after carrying on Sprint. And Kanban can replace physical Kanban, because not only it can visualize your workflow, but also the background will record the time data of the operation at the sometime, helping you to complete data analysis and record.
  
  - **Menu Layout**：Project Layout。
  - **Menu Path**：Project > Scrum Management > Sprint & Kanban>Kanban.
  - **Default Role**：Kanban project owner, Kanban project member
  
 1. Select template
  
    First of all, after entering the Kanban, you can select a template of the Kanban, and clink the template for checking the detail. Secondly, you double click the current template, it will open completely. In addition, you also can change the template when there be not card in the interface of Kanban.

    ![The template of Kanban](../assets/scrum/看板模板.png)  

    ![The detail of Kanban](../assets/scrum/模板详情.png)
  
 1. Kanban 
  
    If you add the story to the current sprint after enter the Kanban, system will auto import it into the current Kanban, putting into the first column.

 1. Create card
    
    When you click `Create card`, a window that you can edit the detail of card in appears. At the sometime, you can create the corresponding card according to the type, the story and the bug that you select. As well as, the card will sync to the interface of story map, putted in the first column of the first role in the current release plan.

    ![Create card](../assets/scrum/创建卡片.png)
    
    ![Interface of the detail of Card](../assets/scrum/卡片详情编辑界面.png)

 1. Kanban drawing
      
    Click `Kanban drawing`, enter into the interface of Kanban Edit:
      
    1)Add column 
      
    2)Draw swim lane
      
    3)Add/Cut down row height
      
    4)Revocation/Recovery
      
    5)Save
      
    6)Articles being processed and start column settings.

    ![Kanban drawing](../assets/scrum/看板绘制.png)  
    
 1. Drag story card
    
    The operation of the daughter card (Task card /bug card) in the story card
  
<h2 id="5">Task</h2> 

  You can check all the tasks you created in the interface. Furthermore, the system can visualize your task flow, at the sometime, the background will record the time data of the operation, helping you to complete the data analysis and record.
  
  - **Menu Layout**：Project Layout.
  - **Menu Path**：Project > Scrum management > Task and bug > Task.
  - **Default Role**：Kanban project owner, Kanban project member.
  
### Check task
  
  In the interface of task, you can not only check all tasks that you has been created, but also advanced search task you needed. 
  
### Delete task
  
  You can finish the operations of the “delete” and “the bug of shortcut creation”

  ![Task](../assets/scrum/任务.png)
  
<h2 id="6">Bug</h2> 
  
 You can check all bugs that you created.
  
  - **Menu Layout**：Project Layout。
  - **Menu Path**：Project > Scrum Management > Task and bug > Bug.
  - **Default Role**：Kanban project owner, Kanban project member 

### Check bug
    
  In the interface of task, you can not only check all bugs that you has been created, but also advanced search loopholes that you needed. 
    
### Delete bug
    
  You can delete the bug in the <operation> interface.

  ![Bug](../assets/scrum/漏洞.png)