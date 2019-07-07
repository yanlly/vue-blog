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

//注册接口
export const createUser = params => {
  return axios.post(`/createuser`, params).then(res => res.data);
};

//获取注册数据接口
export const getUser = params => { 
  return axios.get(`/getuser`, { 
    params: params
  });
};