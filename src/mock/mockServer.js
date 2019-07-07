import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs'
import Blogs from './data.json'
import Users from './user.json'


export default {
    start() { 
      let mock = new MockAdapter(axios); // 创建 MockAdapter 实例
      // 获取blog列表
      mock.onGet('/blog/list').reply(config => { //  config 指前台传过来的值
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
      
      // 删除blog
      mock.onPost('/blog/delete').reply(config => {
        let {id} = JSON.parse(config.data);
          Blogs.some((t) => {
            if (t.id === id) {
              t.isDelete= true
              return true;
            }
          });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200]);
          }, 200);
        });
      });

      // 添加blog
      mock.onPost('/blog/add').reply(config => {
        let {title,tag,text,time} = JSON.parse(config.data);
          Blogs.unshift({
            id: Mock.Random.guid(),
            title: title,
            img: "../../static/images/pic1.jpg",
            text: text,
            tag: tag,
            time: time,
            isDelete: false,
          });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200]);
          }, 200);
        });
      });

      //注册帐号
      mock.onPost('/createuser').reply(config => {
        let {regName,regPwd} = JSON.parse(config.data);
        Users.unshift({
            regName: regName,
            regPwd: regPwd,           
          });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200]);
          }, 200);
        });
      });
      
      //返回注册的数据
      mock.onGet('/getuser').reply(config => {        
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              users: Users
            }]);
          }, 200);
        });
      });
    }
  };