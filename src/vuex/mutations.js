export const mutations = {
  RECEIVE_USER_INFO(state,userInfo) {
    sessionStorage.setItem("user", userInfo);
    state.user = userInfo;
  },
  RESET_USER_INFO (state) {
    sessionStorage.removeItem("user");
    state.user = '';
  },

  OPENSTATUS(state) { 
    state.openStatus = !state.openStatus;
  },

  GETBLOGS(state, data) { 
    state.blogList = data;
  },

  GETID(state, data) { 
    state.id = data;
  },

  GETCOMMENT(state, data){
    state.comment.unshift(data) ;
  }
};