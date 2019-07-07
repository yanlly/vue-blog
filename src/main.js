// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Header, Button, Swipe, SwipeItem, Toast, Search } from 'mint-ui';
import store from './vuex/store'; 
import Mock from './mock'; // 引入mock模块
import './assets/iconfont/iconfont.css' 
Mock.start(); //并且执行初始化函数

Vue.component(Header.name, Header);
Vue.component(Button.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);
window.Toast= Toast

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
