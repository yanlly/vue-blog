<template>
    <div class="bloglist">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
                <img :src="img.url" class="img"/>
            </mt-swipe-item>
        </mt-swipe>
        <div class="blogs"  v-for="(blog,index) in blogList" :key="index">
            <img :src="blog.img" alt="image"  class="blogpic">
            
            <div class="blogmsg"> 
                <router-link :to="{path:'/blog',query:{ id:blog.id}}" class="blogtitle" >{{blog.title}}</router-link>     
                <p class="blogtext" v-html="blog.text"></p>
                <ul class="bloginfo">
                    <li class="blog_time"><i class="iconfont icontime"></i>{{blog.time}}</li>
                    <li class="blog_time"><i class="iconfont iconmsg"></i>{{blog.cmnum}}</li>
                    <li class="blog_delete" @click="onDelete(blog.id)"><i class="iconfont icondelete"></i></li>
                </ul>                               
            </div>                      
        </div>
    </div>
</template>
<script>
import {deleteBlog} from '../../../api'
	export default {
        computed: {
            blogList() {
                this.$store.dispatch('getBlog')
                return this.$store.state.blogList  
            },
            imgs() {
                return this.$store.state.imgs;
            },
        },
        methods: {
            onDelete(k){
                MessageBox.confirm('',{
                    title:'提示',
                    message:'确认删除此博客',
                    confirmButtonText:'确认',
                    cancelButtonText:'取消'
                }).then(action => {
                    if (action == 'confirm') {
                        deleteBlog({
                            id: k
                        }) 
                        MessageBox('提示', '操作成功');
                    }
                }).catch(error =>{
                    if(error == 'cancel'){
                        MessageBox('提示', '操作取消');
                    }
                });
            }
        },
	}
</script>
<style lang = "less" scoped>
    .bloglist                       { background-color: #efefef; overflow: hidden;
        .mint-swipe                 { height: 160px; margin-top: 51px;
            .img                    { width: 100%; height: auto; }
        } 
        .blogs                      { margin:10px 0; padding:10px 15px; background: #fff; overflow: hidden;
            .blogpic                { width:36%; float: left; }
            .blogmsg                { width:60%; float: right;
                .blogtitle          { color: #000; font-weight: 600; line-height: 24px; }
                .blogtext           { font-size: 13px; height:40px; line-height: 22px; margin:0; overflow: hidden; }
                .bloginfo 
                    li              { float: left; font-size: 13px; margin-right: 15px; color: #748594; margin-top: 10px;
                        .iconfont   { font-size: 13px; margin-right: 3px; }
                    }
                    .blog_delete    { float: right; }
            }
        } 
    }
</style>