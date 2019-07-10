import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs'
import Blogs from './blog.json'
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
      
      
      // 评论次数
      mock.onPost('/blog/cmnum').reply(config => {
        let {id,cmnum} = JSON.parse(config.data);
          Blogs.some((t) => {
            if (t.id === id) {
              t.cmnum= cmnum
              return true;
            }
          });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200]);
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
        let {title,text,time} = JSON.parse(config.data);
          Blogs.unshift({
            id: Mock.Random.guid(),
            title: title,
            img: "../../static/images/pic1.jpg",
            text: text,
            cmnum: "",
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
        for(let i=0;i<Users.length;i++){
          if(Users[i].regName===regName){               //重复账号返回204
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve([204]);
              }, 200);
            });
          }else{
            Users.unshift({
              regName: regName,
              regPwd: regPwd,           
            });
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve([200]);
              }, 200);
            });
          }
        }
      });
            
      //登录
      mock.onPost('/senduser').reply(config => {
        let {logName,logPwd} = JSON.parse(config.data);
        for(let i=0;i<Users.length;i++){
          if(Users[i].regName===logName & Users[i].regPwd===logPwd){
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
    }
  };