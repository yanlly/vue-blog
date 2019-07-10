# vue-blog

### 技术栈
```
vue2 + vuex + vue-router + webpack + mint-ui + mock.js + less
```

### 目录结构
<pre>
.        
├── build                              // 构建服务和webpack配置
├── config                             // 项目不同环境的配置
├── dist                               // 项目build目录
├── index.html                         // 项目入口文件
├── package.json                       // 项目配置文件
├── src                                // 生产目录
│   ├── api                            // css js 和图片资源
│   ├── assets                         // css 和图片资源
│   ├── components                     
│   │   ├── Blog                       // 文章组件
│   │   ├── Layouts                    // 首页组件
│   │   │   └── children               // 子路由组件
│   │   ├── Login                      // 登录组件
│   │   └── Search                     // 查找组件
│   ├── mock                           // 模拟数据
│   ├── router                         // 路由配置
│   ├── vuex                           // vuex状态管理器
│   ├── App.vue                        // 页面入口文件
│   └── main.js                        // 程序入口文件
</pre>