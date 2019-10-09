# 更新日志：

**此项目的所有更改都将记录在此文件中**
# 


**Version : V0.4.4**

**Last Modify : 2019-10-09**

### 变动：

* 依赖项升级
* 尝试修复修改代码后，浏览器不能热更新的bug


#




**Version : V0.4.3**

**Last Modify : 2019-09-26**

### 变动：

* 在React的class语法中，增加对箭头函数的支持（不推荐在class里使用箭头函数）
* 依赖包：antd的版本升级 v3.23.3 => v3.23.4
* 新增依赖包express，用来支持打包后，使用`npm run builddev`命令来预览打包文件。


#


**Version : V0.4.2**

**Last Modify : 2019-09-18**

### 变动：

* 移除工具包中，`formatDate()` 函数,如项目中有日期格式化需求，可采用`moment`依赖


#

**Version : V0.4.1**

**Last Modify : 2019-09-17**

### 变动：
* 依赖包：node-cross-spawn v6.05 => v7.0.0 (不再支持node8以下的版本)
* 依赖包：antd的版本升级 v3.23.2 => v3.23.3
* 依赖包：sass-loader v7.3.1 => v8.0.0 

### bug修复：
* 修复redux-thunk的未提交的bug
* 修复生产模式下的打包路径修复
* 修复生产模式下的反调试bug

