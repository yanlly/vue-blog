<template>
  <div>
    <form class="add">
      <div>
        <label for="name">标题：</label>
        <input type="text" id="title" v-model="title"/>
      </div>
      <div>
        <label for="msg">正文：</label>
        <textarea id="msg" v-model="text"></textarea>
      </div>
      <div class="button">
        <a @click="onAdd();$router.push('/layouts')">发表博文</a>
      </div>      
    </form>
  </div>   
</template>
<script>
  import moment from 'moment'
	import {addBlog} from '../../../api'
	export default {		
    data(){
      return {
        title: "",
        text: "",
        time: moment().format('YYYY-MM-DD'),
      }
    },
    methods: {     
      onAdd(){
        if(this.title.trim() === "" || this.text.trim() === "" ) {
          Toast({
              message: '请填写完每一项信息!',
              duration: 1200
            });
          return;
        }else{
          addBlog({
            title: this.title,
            text: this.text.replace(/\n/g,'<br/>'), //添加换行
            time: this.time
          });
          Toast({
              message: '添加成功',
              duration: 1200
            });
          this.title="";
          this.text ="";
        }           
      }
    },
	}
</script>
<style lang = "less" scoped>
  .box { font: 16px sans-serif; width: 80%; box-sizing: border-box; border: 1px solid #999; padding: 4px 10px; outline: none; resize: none; white-space: pre-line;}
  .add                  { position: fixed; top: 35px; width: 100%; box-sizing: border-box; padding: 30px 15px;
    div                 { margin-top: 20px;
      label             { display: inline-block; width: 16%; text-align: right; }
      input             { .box }
      textarea          { vertical-align: top; height: 100px; .box;}
    }
    .button a           { margin-left: 17%; font-size: 15px; padding: 2px 5px; border: 1px solid #999; border-radius: 5px; }
  }
</style>