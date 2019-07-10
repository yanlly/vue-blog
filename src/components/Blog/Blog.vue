<template>
	<div>
        <mt-header fixed title="个人博客">
            <mt-button class="iconfont iconback" slot="left" @click.native="$router.push('/layouts')">返回</mt-button> 
            <mt-button class="iconfont iconsearch" slot="right" @click.native="$router.push({path: '/search'})"></mt-button>  
        </mt-header>
            <article v-for="(item,index) in blog" :key="index">
                <!-- 文章部分 -->
                <section class="art_box">
                    <h2 class="art_title">{{item.title}}</h2>
                    
                    <div class="art_con">
                        <p v-html="item.text"></p>
                    </div>
                </section>
                <!-- 评论部分 -->
                <section class="comment_box">
                    <div class="comment_title"><i class="iconfont iconwrite"></i>  评论一下</div>
                    <div class="comment_info">
                        <textarea class="comment" placeholder="想说些什么呢..." v-model="content"></textarea>
                        <label for="comment-name" class="comment_name">昵称：</label>
                        <input class="name_input" type="text" id="comment-name" placeholder="必填"  v-model="name">
                        <a href="javascipt:;" class="send" @click="add">发表评论</a>
                    </div>
                    <div class="comment_list">
                        <div class="comment_item"><i class="iconfont iconmsg"></i>  评论列表</div>
                         <!-- 评论内容组件 -->   
                        <Item/> 
                    </div>          
                </section>               
            </article>
       
	</div>
</template>
<script>
    import moment from 'moment'
    import Item from "./Item.vue"
	export default {
		components: {
            Item
        },
        data() {
            return{
                id: this.$route.query.id,
                content: '',
                name: '',
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        },
        computed: {
            // 获取文章内容
            blog() {
                this.$store.dispatch('getId',this.id);
                this.$store.dispatch('getBlog');
                return this.$store.getters.getBlogInfo        
            }
        },
        methods: {
            // 得到评论内容
            add(){
                const content=this.content.trim()
                const name=this.name.trim()
                const date=this.date
                const id=this.id
                if(!content || !name){
                    Toast({
                        message: '内容或昵称不能为空！',
                        duration: 1200
                    });                    
                    return
                }else{
                    const comment={
                        content: content,
                        name: name,
                        date: date,
                        id: id
                    }
                    this.$store.dispatch('getComment', comment);//把评论内容放到state
                    this.content= '';
                }
            }
        }
	}
</script>
<style lang = "less" scoped>
    @comment-color: #748594;
    .mint-header                { height: 50px;
        .mint-header-button 
            .iconsearch         { float: right; }
    }

    .art_box                    { background-color: #fff; margin-top: 60px;
        .art_title              { font-size: 25px; margin:0 20px; padding-top:20px; }
        .art_con                { line-height: 30px; padding: 20px; }
    }

    .comment_box                { margin: 10px 0 0; padding:20px; box-sizing: border-box; background-color: #fff;
        .comment_title          { font-size: 15px; color:@comment-color; line-height: 2; border-bottom: @comment-color 1px solid; }
        .comment_info           { width: 90%; height:120px; margin-left: 5%; margin-top:30px; border:1px @comment-color solid;
            .comment            { box-sizing: border-box; width: 100%; height: 70%; padding: 10px; resize: none; outline: none; border:none; border-bottom: 1px @comment-color solid; font-size: 14px; }   
            .comment_name       { font-size: 14px; color:#566573; margin-left:10px; }
            .name_input         { width:100px; height: 27px; border:none;  outline:none; font-size: 14px; color:#566573; 
                &::-webkit-input-placeholder    { color:red; }
            }
            .send               { float: right; line-height: 27px; margin-right: 10px; }
        }
        .comment_list           { margin-bottom: 50px;
            .comment_item       { clear: both; margin-top: 20px; color:@comment-color; line-height: 2; border-bottom: @comment-color 1px solid; }  
        }
    }
</style>