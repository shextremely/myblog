# myblog

> 自己练习开发的博客系统

## TL;DR

本系统仅是为了自己学习新技术用，故并没有对技术栈以及页面效果做更多的优化，系统将前后端集成到同一个项目中。

先介绍系统的主要技术栈：

* 前端
  1. [Nuxt](https://nuxtjs.org/guide), 一个基于Vue的服务端渲染应用框架;
  2. [element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation), 基于Vue2.0的桌面端组件库;
  3. [sass](https://www.sass.hk/docs/), CSS扩展语言;
  4. [axios](https://www.npmjs.com/package/axios), 针对浏览器和nodejs的基于Promise的HTTP库;
  5. 基于[marked](https://www.npmjs.com/package/marked)和[highlight.js](https://www.npmjs.com/package/highlight.js)技术自实现的markdown编辑器;

* 后端
  1. [express](http://www.expressjs.com.cn/), 基于nodejs平台的web开发框架;
  2. [mongoose](http://mongoosejs.com/docs/4.x/), 在nodejs环境下对mongodb进行操作的对象模型工具;
  3. Babel, 用于编写下一代Javascript的编辑器;

* 数据
  1. [MongoDB](https://www.mongodb.com/), 基于分布式文件存储的数据库

## Category

  这里对项目的目录结构做一个简单的说明：

  1. assets, 包含系统的未编译的资源，例如sass等；

  2. components, Vue组件目录，该目录下有三部分组成，目录下文件表示通用组件，home目录下为前端显示系统组件，admin为后台管理系统组件；

  3. exapi, 存放基于Express的后端代码，该目录下有包含其所对应的系统目录：
    * config, 存放配置信息, 目前主要是MongoDB链接信息;
    * controller, 控制层, 主要存放系统业务逻辑;
    * models, 模型层, 存放系统数据（文章、标签、用户等）的模型;
    * prototype, 存放原型的目录, 目的是存放控制层中的通用方法;
    * router, 后端请求API的路由分配;
    * app.js, 后端系统的入口文件;
    * index.js, 入口文件, 这里也是Babel的入口文件;
    * mongodb.js, MongoDB链接配置文件;

    注意这里把前后端合并到一个系统的前提是基于Nuxt的serverMiddleware属性，通过axios过滤，把以固定格式发送的HTTP请求转接到该服务系统中

  4. layouts, 包含系统所有的页面布局信息；

  5. middleware, 包含系统所有的中间件, 目前只有一个基于jsonwebtoken技术的用户认证中间件, 在渲染每个页面之前都会先执行该中间件系统；

  6. pages, 包含系统的所有页面，Nuxt自动将pages目录下的各文件以固定的方式创建前端路由信息；

  7. plugins, 包含所有在实例化跟Vue应用之前想要运行的JavaScript插件；

  8. static, 包含静态文件，build项目时该目录下的所有文件也会不做改变的生成在最终的项目中；

  9. store, 存放Vuex Store的文件目录；

  10. nuxt.config.js, 自定义Nuxt的配置信息；


## Build Setup

注意这里需要先配置MongoDB环境

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
