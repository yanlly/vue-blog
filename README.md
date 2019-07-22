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

### 布局
#### 部分布局使用了mint-ui
```js
import { Header, Button, Swipe, SwipeItem, Toast, MessageBox } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Button.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
window.Toast= Toast;
window.MessageBox= MessageBox

```

### 使用mock.js模拟真实接口返回的数据
#### 注册
```js
import Users from './user.json'                       //获取存储的账号信息

mock.onPost('/register').reply(config => {            //config 指前台传过来的值
    let {regName,regPwd} = JSON.parse(config.data);
    for(let i=0;i<Users.length;i++){
        if(Users[i].regName===regName){               //重复账号返回204
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve([204]);
                }, 200);
            });
        }else{                                        //其他注册成功
            Users.unshift({
                regName: regName,
                regPwd: regPwd,           
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve([200]);
                }, 200);
            });
        };
    };
});
```

#### 登录
```js
mock.onPost('/login').reply(config => {
    let {logName,logPwd} = JSON.parse(config.data);
    for(let i=0;i<Users.length;i++){
        if(Users[i].regName===logName & Users[i].regPwd===logPwd){ //验证登录帐号是否已注册且密码是否正确
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve([200]);
                }, 200);
            });
        }else{
            return new Promise((resolve, reject) => {    //登录帐号与已注册账号不匹配返回204
                setTimeout(() => {
                resolve([204]);
                }, 200);
            });
        }
    }
});
```

#### 获取后台数据
```js
import Blogs from './blog.json'                   //获取文章信息

mock.onGet('/blog/list').reply(config => { 
    let mockBlog = Blogs.filter(blog => {
        if (blog.isDelete === true) return false; // 过滤掉删除的blog。
        return true;
    });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve([200, {
            blogs: mockBlog 
        }]);
        }, 200);
    });
});
```

### 使用vuex管理数据
#### actions
```js
import { getBlogList } from '../api';     //获取blog数据接口

export const getBlog = ({commit}) => {    //从后台获取blog数据
  return new Promise((resolve) => {
    getBlogList().then((res) => {
      commit('GETBLOGS', res.data.blogs);
      resolve();
    });
  });
};

export const toggleStatus = ({commit}) => { //是否开启侧边
  commit('OPENSTATUS'); 
};

export const getComment = ({commit}, comment) => { //存储评论
  commit('GETCOMMENT', comment)
};
```

#### mutations
```js
GETBLOGS(state, data) {     //存储blog数据
    state.blogList = data;
},

OPENSTATUS(state) {         //是否开启侧边
    state.openStatus = !state.openStatus;
},

GETCOMMENT(state, data){    //存储评论
    state.comment.unshift(data) ;
}
```