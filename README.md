# JF-WEB-APP使用说明

**Version : V0.3.0**

**Last Modify : 2019-08-28**

---

## **简要介绍**

&emsp;&emsp;在实际开发生产中，前端组最常用的前端框架是React，但是我们项目初始化时，每次都需要固定的引用antd等依赖项，并且每次都进行重复的配置，浪费了项目时间。  

&emsp;&emsp;为了不浪费项目中框架配置的时间，让各开发人员更关注于项目本身而不是代码结构的配置，所以对create-react-app进行了二次封装，封装后的框架兼容至IE10。jf-web-app按需引入了antd,并且对router也做了配置，一些常用的方法也已封装，开箱即用，可以非常好的简化项目过程中。


## **目录说明**

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




## **系统环境及依赖项说明**  

使用此框架，需要保证已具有如下环境：
- `node@10.x`
- `npm@6.9.x`
- `npx@6.9.x`
  
项目内主要封装的依赖项有：
- `react@16.9`
- `babel@7.5.5`
- `antd@3.22.1`
- `react-router@5.0`
 
 **为防止升级后各个依赖包之间起冲突，所有依赖项均已锁定版本，无特殊需求禁止在项目中进行依赖项升级！**
 

## **使用方式**   

&emsp;&emsp;项目的使用方式基本沿用create-react-app的使用方式，通过对/src/view/下面的文件的变动来进行项目开发。
支持的命令：  
以开发模式启动项目： 
`npm run dev`   
以生产模式启动项目（仅做测试，一般不常用）：`npm run start`   
以生产模式进行项目打包：`npm run build`

默认端口可以在package.json中，config字段修改。


## **开发注意事项** *

框架使用规范：
* 所有请求应当从redux中分离出来，"/src/request"负责数据请求，"/src/redux"负责状态管理，从而减低耦合度，增加请求和状态的可维护性。
* 所有业务组件应当是独立的，即没有任何props值也能单独调用的。
* 应当分层级来控制路由，不推荐把所有路由都写在一个文件中，为了统一管理路由及参数，禁止在/src/view/router文件夹以外创建路由。
* 开发过程中，根据项目需求，可以对文件夹进行增删改的操作，但是目录结构一定要简单，层级不要过深，尽量扁平化，文件名要清晰。

路由的相关规则：   
* jf-web-app支持从其他任意系统带参数，跳转到当前系统的指定页面中；
* 项目内，不同业务组件之间的跳转不受此规则影响
* 从其他项目跳转到jf-web-app项目的完整的URL应该是如下格式：
* http://localhost:4000/loading?otherParams=1&orgcode=1&token=2&rt='{"p":{"a":1,"b":2},"t":"/des/two/"}'
* 在有基础上增加一个rt参数，rt参数为json格式的字符串，rt.t为需要跳转到对应的地址，rt.p为跳转需要的参数
* loading组件可设置是否需要鉴权等。

单后台和多后台数据请求方式：
* 调用/src/util/request-ms.js或/src/util/request.js中的setConfig方法，设置后端地址、token、orgcode,实例化Axios请求对象。
* 调用request请求方法，向后端发送请求，该方法同时支持回调函数写法和Promise写法。
* 单后台数据请求方法较为常用。
  
websocket请求方式：
* 调用/src/util/request-ws.js中的setWSConfig方法，设置后端地址、token、orgcode,实例化webSocket请求对象。
* 调用request请求方法，向后端发送请求，该方法同时支持回调函数写法和Promise写法。
* websocet需要后端也支持；

数据加密：
* 如果需要数据加密，则可以调用/src/util/encrypt.js中的相关方法，该文件提供“aes-128-cbc”加密算法，对字符串和对象进行加密。
* 调用setSercrtKey()方法来设置加密秘钥，该函数有两种调用方式，一种是不带任何参数，加密秘钥使用package.json中，config.defaultSKey字段来作为加密秘钥。第二种方式是直接带一个长度为16位的字符串为参数，该参数即为加密秘钥。


## **项目特性及维护方式**   

本框架计划支持：
- hooks
- ts

维护方式为，在线维护github；   
github上，alpha为维护版本，master版本为正式使用版本；   
