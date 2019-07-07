import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex); 

const state = {
  users: [], //注册数据
  user: sessionStorage.getItem('user') || '', //登录成功的帐号数据
  openStatus: false, //是否开启侧边
  blogList: [], //blog数据
  id: '', //每篇blog的id
  comment: [], //评论数据
};

// mutations
const mutations = {
  //记录登录成功的帐号
  RECEIVE_USER_INFO(state,userInfo) {
    sessionStorage.setItem("user", userInfo);
    state.user = userInfo;
  },
  //清除登录成功的帐号
  RESET_USER_INFO (state) {
    sessionStorage.removeItem("user");
    state.user = '';
  },
  //存储注册数据
  GETUSER(state, data) {    
    state.users = data;
  },
  //是否开启侧边
  OPENSTATUS(state) { 
    state.openStatus = !state.openStatus;
  },
  //存储blog数据
  GETBLOGS(state, data) { 
    state.blogList = data;
  },
  //存储id
  GETID(state, data) { 
    state.id = data;
  },
  //存储评论
  GETCOMMENT(state, data){
    state.comment.unshift(data) ;
  }
};

// 创建 store 实例并且导出
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
