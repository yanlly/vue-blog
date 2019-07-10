<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
          <a href="javascript:;" :class="{on: login}" @click="login=true">登录</a>
          <a href="javascript:;" :class="{on: !login}" @click="login=false">注册</a>
      </div>
      <form class="login_content">
        <!-- 登录 -->
        <div :class="{on: login}">
          <section class="input_message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="logName">
          </section>
          <section class="input_message">
            <input type="password" maxlength="8" placeholder="密码" v-model="logPwd">              
          </section>
          <button class="login_submit" @click="loginu" type="button">登录</button>
        </div>
        <!-- 注册 -->
        <div :class="{on: !login}">            
          <section class="input_message">
            <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="regName">
          </section>
          <section class="input_message">
            <input type="password" maxlength="8" placeholder="密码" v-model="regPwd">
          </section>
          <button class="reg_submit" @click="register" type="button">注册</button>
          <p class="reg_hint">温馨提示：注册代表自动同意<a href="javascript:;">《用户服务协议》</a></p>            
        </div>          
      </form>
      <!-- 回退 -->
      <a href="javascript:" class="go_back iconfont iconback" @click="$router.back()"></a>
    </div>
  </section>
</template>
<script>
  import {createUser,sendUser} from '../../api'
	export default {
    data(){
      return{
        login: true,//true代表登录，false代表注册
        logName: '',
        logPwd: '' ,
        regName: '',
        regPwd: '',
        u: this.$store.state.users    
      }
    },
    methods: {
      //注册
      register(){
        if(this.regName.trim() === "" || this.regPwd.trim() === ""){
            Toast({
              message: '请输入用户名或密码！',
              duration: 1200
            });
            return;
        }else{
          createUser({
            regName: this.regName,
            regPwd: this.regPwd
          }).then(res => {
            if(res.status===204){
              this.regName = '';
              this.regPwd = '';
              Toast({
                message: '该账号已注册！',
                duration: 1200
              });
            }else{
              this.regName = '';
              this.regPwd = '';
              this.login = true;
              Toast({
                  message: '注册成功，请登录。',
                  duration: 1200
              });
            }
          });  
        }
      },
      //登录
      loginu(){
        if(this.logName.trim() === "" || this.logPwd.trim() === ""){
            Toast({
              message: '请输入用户名或密码！',
              duration: 1200
            });
            return;
        }else{
          sendUser({
            logName: this.logName,
            logPwd: this.logPwd
          }).then(res => {
            if(res.status===200){
              Toast({
                message: '登录成功！',
                duration: 1200
              });
              this.$store.dispatch('recordUser', this.logName)
              this.$router.push('/layouts')
            }else{
              Toast({
                message: '用户名或密码错误！',
                duration: 1200
              });
              this.logName = '';
              this.logPwd = '';
            }
          })
        }
      }
    },
	}
</script>
<style lang = "less" scoped>
  @bg-color: #26a2ff;
  .loginContainer           { width: 100%; height: 100%; background: #fff;
    .loginInner             { padding-top: 60px; width: 80%; margin: 0 auto;
      .login_header         { padding-bottom: 20px; text-align: center;
        a                   { color: #333; font-size: 20px; padding-bottom: 4px;
          &:first-child     { margin-right: 40px; }
          &.on              { color: @bg-color; font-weight: 700; border-bottom: 2px solid @bg-color; }
        }
      }
      .login_content div    { display: none;
        &.on                { display: block; }
        .input_message      { position: relative; margin-top: 16px; height: 48px; font-size: 14px;
          input             { width: 100%; height: 100%; padding-left: 10px; box-sizing: border-box; border: 1px solid #ddd; border-radius: 4px; outline: 0; font:14px Arial; 
            &:focus         { border: 1px solid @bg-color; }
          }
        }
        .login_submit       { width: 100%; margin-top: 30px; border-radius: 4px; background: @bg-color; color: #fff; text-align: center; font-size: 16px; line-height: 42px; border: 0; }
        .reg_submit         { .login_submit }
        .reg_hint           { margin-top: 12px; color: #999; font-size: 14px; line-height: 20px; text-align: center;
          a                 { color: @bg-color; }
        }
      }
      .go_back              { position: absolute; top: 10px; left: 10px; font-size: 22px; }
    }
  }
</style>