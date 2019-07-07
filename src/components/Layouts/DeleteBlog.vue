<template>
  <div class="del">
    <div class="delete-item" v-for="(blog,index) in blogList" :key="index">
      <div class="delete-top">{{blog.title}}</div>
      <div class="delete-bottom">
        <ul class="delete-info">
            <li class="delete-tag"><i class="iconfont iconcaidan"></i>{{blog.tag}}</li>
            <li class="delete-time"><i class="iconfont icontime"></i>{{blog.time}}</li>
        </ul>
        <a class="delete-button iconfont icondelete" @click="onDelete(blog.id)" ></a>
      </div>
    </div> 
  </div>  
</template>
<script>
	import {deleteBlog} from '../../api'
	export default {
    data() {
      return{
        blog: {},          
      }
    },
    
    computed: {
      blogList() {
        this.$store.dispatch('getBlog')
        return this.$store.state.blogList;                
      }
    },

    methods: {      
      onDelete(k){            
        deleteBlog({
          id: k
        })      
      }
    },
	}
</script>
<style>
  .del {
    margin-top: 50px;
  }
  .delete-item{
    padding: 20px 30px 0;
    border-bottom: 1px #999 solid;
  }
  .delete-top{
    font-size: 20px;
    margin-bottom: 20px;
  }
  .delete-bottom{
    height: 30px;
  }
  .delete-bottom .delete-info li { 
    float: left; 
    font-size: 14px; 
    margin-right: 15px; 
    color: #748594; 
  }
  .delete-bottom .delete-info li .iconfont{
    font-size: 14px;
    margin-right: 3px;
  }
  .delete-bottom .delete-button{
    float: right;
    width: 20px;
    height: 20px;
  }
</style>