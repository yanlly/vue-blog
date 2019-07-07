import {
  getBlogList,
  getUser
} from '../api';

//存储blog数据
export const getBlog = ({commit}) => {
  return new Promise((resolve) => {
    getBlogList().then((res) => {
      commit('GETBLOGS', res.data.blogs);
      resolve();
    });
  });
};

//存储注册数据
export const onLogin = ({commit}) => {
  return new Promise((resolve) => {
    getUser().then((res) => {
      commit('GETUSER', res.data.users);
      resolve();
    });
  });
};

//记录登录成功的帐号
export const recordUser = ({commit}, userInfo) => {
  commit('RECEIVE_USER_INFO', userInfo)
};

//清除登录成功的帐号
export const resetUser = ({commit}) => {
  commit('RESET_USER_INFO')
};

//存储id
export const getId = ({commit}, id) => {
  commit('GETID', id)
};

//是否开启侧边
export const toggleStatus = ({commit}) => {
  commit('OPENSTATUS'); 
};

//存储评论
export const getComment = ({commit}, comment) => {
  commit('GETCOMMENT', comment)
};