
import Vue from 'vue'
import App from './App'
import router from './router'
import { Header, Button, Swipe, SwipeItem, Toast, MessageBox } from 'mint-ui';
import store from './vuex/store'; 
import Mock from './mock'; // 引入mock模块
import './assets/iconfont/iconfont.css' 
Mock.start(); //并且执行初始化函数

Vue.component(Header.name, Header);
Vue.component(Button.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
window.Toast= Toast;
window.MessageBox= MessageBox

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
