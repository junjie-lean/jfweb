# JF-WEB-APP使用说明

**Version : V0.3.0**

**Last Modify : 2019-08-28**

---

## 简要介绍

***项目背景***

在实际开发生产中，前端组最常用的前端框架是React，但是我们项目初始化时，每次都需要固定的引用antd等依赖项，并且每次都进行重复的配置，浪费了项目时间。  

为了不浪费项目中框架配置的时间，让各开发人员更关注于项目本身而不是代码结构的配置，所以对create-react-app进行了二次封装，封装后的框架兼容至IE10。


## 目录说明

```
|-- jf-web-app
    |-- README.md 
    |-- config-overrides.js     //相关配置
    |-- package.json
    |-- documents               //相关文档
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |-- scripts
    |   |-- build.js            //项目打包逻辑
    |   |-- start.js            
    |-- src
        |-- index.js            //项目入口文件
        |-- config              //项目配置文件夹
        |   |-- example.txt     
        |   |-- g.js
        |-- lang                //多语言解决方案
        |   |-- home.lang.js
        |   |-- systeam.lang.js
        |   |-- zh_CN.js
        |-- media               //相关媒体文件夹
        |   |-- icon
        |   |-- picture
        |   |-- svg
        |   |-- video
        |-- redux         
        |   |-- home.reducers.js
        |   |-- index.reducers.js
        |-- request             //数据请求，请求从redux里分离
        |   |-- home.request.js
        |-- style              
        |   |-- home.scss
        |   |-- index.css
        |-- test                //预留
        |-- util                //工具包
        |   |-- _util.js            //整合部分工具
        |   |-- asyncComponent.js   //异步引入
        |   |-- encrypt.js          //对称加密封装
        |   |-- request-ms.js       //多后端请求方式封装
        |   |-- request-ws.js       //websocket请求方式封装
        |   |-- request.js          //常规请求方式封装
        |-- view
            |-- components       //业务组件
            |-- pages            //业务模块
            |   |-- description.js
            |   |-- home.js
            |   |-- loading.js
            |-- public           //公共组件
            |   |-- provider.js
            |   |-- svg.js
            |-- router           //路由组件
                |-- desRouter.js
                |-- router.js

```
开发人员只需要关注/src目录，所写的代码也应当只存在/src目录下。    
- /src/config  此文件夹主要存放g.js和其他配置文件
- /src/lang    此文件夹存放多语言解决方案的文件
- /src/media   此文件夹存放各种媒体文件
- /src/request 此文件夹存放各个模块的请求文件，请求和redux进行分离，redux中只进行数据的处理，数据的fetch应该在此文件下进行
- /src/style   此文件夹主要存放各个模块的样式表，支持sass
- /src/test    为单元测试预留
- /src/util    此文件夹存放开发工具包
- /src/view    此文件夹存放业务组件


需要特殊注意的点有：  
1. 应当分层级来控制路由，不推荐把所有路由都写在一个文件中，为了统一管理路由及参数，禁止在/src/view/router文件夹以外创建路由。
2. 开发过程中，根据项目需求，可以对文件夹进行增删改的操作，但是目录结构一定要简单，层级不要过深，尽量扁平化，文件名要清晰。
   

## 系统环境及依赖项说明   

使用此框架，需要保证已具有如下环境：
- node@10.x
- npm@6.9.x
- npx@6.9.x
  
项目内主要封装的依赖项有：
- react@16.9
- babel@7.5.5
- antd@3.22.1
- react-router@5.0
 
 所有依赖项均已锁定版本，无特殊需求不得在项目中进行依赖项升级！
 

## 使用方式   

项目的使用方式基本沿用create-react-app的使用方式，通过对/src/view/下面的文件的变动来进行项目开发。
支持的命令：  
以开发模式启动项目： 
`npm run dev`   
以生产模式启动项目（仅做测试，一般不常用）：`npm run start`   
以生产模式进行项目打包：`npm run build`

默认端口可以在package.json中，config字段修改。


## 开发注意事项 *

- 所有请求应当从redux中分离出来，"/src/request"负责数据请求，"/src/redux"负责状态管理，从而减低耦合度，增加请求和状态的可维护性。
- 所有业务组件应当是独立的，即没有任何props值也能单独调用的。

## 项目特性及维护方式   

本框架预计支持：
- hooks
- ts

维护方式为，在线维护github；   
github上，alpha为维护版本，master版本为正式使用版本；   
