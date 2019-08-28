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
需要注意的点有：  

1. 应当分层级来控制路由，不推荐把所有路由都写在一个文件中，为了统一管理路由及参数，禁止在/src/view/router文件夹以外创建路由。
2. 


## 依赖项说明

## 使用方式

## 开发注意事项

## 项目特性及维护方式* 