import axios from 'axios';

//获取blog数据接口
export const getBlogList = params => { 
  return axios.get(`/blog/list`, { 
    params: params
  });
};

//删除blog接口
export const deleteBlog = params => {
  return axios.post(`/blog/delete`, params).then(res => res.data);
};

//添加blog接口
export const addBlog = params => {
  return axios.post(`/blog/add`, params).then(res => res.data);
};

//评论次数接口
export const addCmnum = params => {
  return axios.post(`/blog/cmnum`, params).then(res => res.data);
};

//注册接口
export const createUser = params => {
  return axios.post(`/createuser`, params);
};

//登录接口
export const sendUser = params => {
  return axios.post(`/senduser`, params);
};