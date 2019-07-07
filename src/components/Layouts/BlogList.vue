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
                imgs: [
                    {url: require('../../assets/img/carousel1_600x300.jpg')},
                    {url: require('../../assets/img/carousel2_600x300.jpg')},
                    {url: require('../../assets/img/carousel3_600x300.jpg')}
                ],
                search: this.$route.query.search,
            }
        },
        computed: {
            blogList() {
                this.$store.dispatch('getBlog')
                return this.$store.state.blogList  
            }
        },
        methods: {
            addId(n){
                this.$store.dispatch('getId',n);
                this.$store.dispatch('getBlog');    
            }
        },
	}
</script>
<style>
    .bloglist{
        background-color: #efefef;
        overflow: hidden;
    }
    .mint-swipe {
        height: 160px;
        margin-top: 51px;
    }
    .img{
        width: 100%;
        height: auto;
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