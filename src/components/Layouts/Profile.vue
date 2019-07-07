<template>
  <div class="profile-page">
    <div class="page-left">
      <section class="profile-number">
        <span class="user-icon"></span>
        <router-link to="/login" class="user-info-top"  v-if="!users">登录/注册</router-link>
        <div class="user-info-top" v-else>{{users}}</div>
      </section>

      <section class="profile_my_order">
        <a href='javascript:' class="my_order">
          <span class="iconfont iconindex"></span>
          <router-link to="/layouts/bloglist" class="my_order_div" @click.native="$store.dispatch('toggleStatus')">博文主页</router-link>
          <span class="iconfont iconright"></span>
        </a>
        <a href='javascript:' class="my_order">
          <span class="iconfont iconmanage"></span>
          <router-link to="/layouts/delete" class="my_order_div" @click.native="$store.dispatch('toggleStatus')">管理博文</router-link>
          <span class="iconfont iconright"></span>
        </a>
        <a href="javascript:" class="my_order">
          <span class="iconfont iconadd-list"></span>
          <router-link to="/layouts/add" class="my_order_div" @click.native="$store.dispatch('toggleStatus')">添加博文</router-link>
          <span class="iconfont iconright"></span>
        </a>
        <button class="msg_out"  v-if="users" @click="$store.dispatch('resetUser')">退出登录</button>
      </section>
    </div>
    <div class="page-right" @click="$store.dispatch('toggleStatus')"></div>
  </div>   
</template>
<script>	
	export default {		
    computed: {
      users () {
        return this.$store.state.user
      }
    }  
	}
</script>
<style>
  .profile-page{
    position: fixed;
    top: 50px;
    left: -100%;
    z-index: 999;    
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }
  .profile-toggle{
    left: 0;
  }
  .profile-page .page-left{
    width: 70%;
    height: 100%;
    float: left;
    background-color: #fff;
  }
  .profile-page .page-right{
    width: 30%;
    height: 100%;
    float: right;
    background-color: rgba(0,0,0,0.3);
  }
  .profile-number {
    position: relative; 
    background: url(./images/bg.jpg) no-repeat 0 0;
    height: 125px;
  }
  .profile-number .user-icon{
    position: absolute;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    background: url(./images/person.svg) no-repeat 0 0;
    background-color: #26a2ff;
  }
  .profile-number .user-info-top{
    display: inline-block;
    color: #fff;
    font-size: 16px;
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
  }

  .profile_my_order {
    position: relative;
    background: #fff;
  }
  .profile_my_order::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
  }
  .profile_my_order .my_order {
    display: flex;
    align-items: center;
    padding:0 10px;
  }
  .profile_my_order .my_order .iconfont{  
    margin-right:5px;
  }
  .profile_my_order .my_order .my_order_div {
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 18px 10px 18px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }
  .profile_my_order .msg_out {
    width: 100%;
    margin-top: 30px;
    background: #c70b0b;
    color: #fff;
    font-size: 15px;
    line-height: 36px;
    border: 0;
  }
</style>