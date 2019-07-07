<template>
    <div class="bloglist">
        <mt-header fixed title="搜索结果">
            <mt-button  class="iconfont iconback" slot="left" @click.native="$router.back()">返回</mt-button>   
        </mt-header>
        <div class="kong"></div>
        <div class="blogs"  v-for="(blog,index) in blogList" :key="index">
            <img :src="blog.img" alt="" class="blogpic">
            <div class="blogmsg"> 
                <router-link :to="{path:'/blog',query:{ id:blog.id}}" class="blogtitle">{{blog.title}}</router-link>      
                <p class="blogtext">{{blog.text}}</p>
                <ul class="bloginfo">
                    <li class="blog_tag"><i class="iconfont iconcaidan"></i>{{blog.tag}}</li>
                    <li class="blog_time"><i class="iconfont icontime"></i>{{blog.time}}</li>
                </ul>                               
            </div>                      
        </div>
    </div>
</template>
<script>
	export default {
        data() {
            return{
                id: "",
                search: this.$route.query.search,
            }
        },
        computed: {
            blogList() {
                this.$store.dispatch('getBlog')
                let blogArr= this.$store.state.blogList,
                searchVal=this.search.toLowerCase();
                if(!searchVal){
                    return blogArr
                }else{
                    blogArr = blogArr.filter(function(item){
                        if(item.title.toLowerCase().indexOf(searchVal) !== -1 || 
                        item.tag.toLowerCase().indexOf(searchVal) !== -1 || item.text.toLowerCase().indexOf(searchVal) !== -1){
                            return item;
                        }
                    })
                    return blogArr;
                }  
            }
        },
	}
</script>
<style>
    .kong{
        height: 50px;
    }
    .bloglist{
        background-color: #efefef;
    }
    .mint-swipe {
        height: 160px;
        margin-top: 51px;
    }
    .blogs{
        margin:10px 0;
        padding:10px 15px;
        background: #fff;
        overflow: hidden;
    }       
    .blogs .blogpic{
        width:36%;
        float: left;
    }
    .blogs .blogmsg{
        width:60%;
        float: right;
    }
    .blogs .blogmsg .blogtitle{
        color: #000;
        font-weight: 600;
        line-height: 24px;
    }
    .blogs .blogmsg .blogtext{
        font-size: 13px;
        height:40px;
        line-height: 22px;
        margin:0;
        overflow: hidden;
    }
     .blogs .bloginfo li { 
        float: left; 
        font-size: 13px; 
        margin-right: 15px; 
        color: #748594; 
        margin-top: 10px;
    }
    .blogs .bloginfo li .iconfont{
        font-size: 13px;
        margin-right: 3px;
    }
</style>