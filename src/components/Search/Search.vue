<template>
    <div class="bloglist">
        <div class="search_box">
            <i class="iconfont iconback" @click="$router.back()"></i>
            <input type="search" placeholder="搜索" class="search_content" v-model="val">
            <i class="iconfont iconsearch"></i>
        </div>
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
    import {deleteBlog} from '../../api'
	export default {
        data() {
            return{
                val: ''
            }
        },
        computed: {
            //返回与搜索内容相匹配的blog
            blogList() {
                this.$store.dispatch('getBlog')
                let blogArr= this.$store.state.blogList,
                searchVal=this.val.toLowerCase();
                if(!searchVal){
                    return 
                }else{
                    blogArr = blogArr.filter(function(item){
                        if(item.title.toLowerCase().indexOf(searchVal) !== -1 || item.text.toLowerCase().indexOf(searchVal) !== -1){
                            return item;
                        }
                    })
                    return blogArr;
                }  
            }
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
    .bloglist                       { background-color: #efefef;
        .search_box                 { width: 100%; height: 50px; background-color: #26a2ff; display: flex; box-sizing: border-box;
            .iconfont               { width: 15%; display: flex; align-items: center; justify-content: center; color: #fff; }
            .search_content         { flex: 1; padding: 4px 10px; margin: 10px 0; border-radius: 3px; }
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