<template>
	<ul class="comment_msg">    
        <li class="comment_text" v-for="(item,index) in comment" :key="index">
            <p class="info_text">{{item.content}}</p>
            <p class="info_msg">
                <span class="msg_time">{{item.date}}</span>
                <span class="msg_name"><i class="iconfont iconperson"></i>{{item.name}}</span>
            </p>
        </li>
  </ul>
</template>
<script>
    import {addCmnum} from '../../api'
	export default {
        data() {
            return{
                id: this.$route.query.id,
            }
        },
        computed: {
            comment(){
                const data = this.$store.state.comment;
                const id =this.id;
                let comment =[]
                for(let i=0;i<data.length;i++){      //筛选出不同文章的评论
                    if(data[i].id===id){
                        comment.push(data[i])
                    }   
                }
                addCmnum({                           //向后台发送本文的评论次数
                    id: this.id,
                    cmnum: comment.length
                });
                return comment;  
            }
        }
	}
</script>
<style lang = "less" scoped>
    @comment-color: #748594;
    .comment_text           { margin:20px 10px; padding-bottom:20px; border-bottom: 1px @comment-color solid;
        .info_text          { font-size:15px; line-height: 28px; margin-bottom: 10px; }
        .info_msg           { width: 100%; overflow: hidden; line-height: 18px; 
            .msg_time       { float: left; font-size: 14px; color: @comment-color; }
            .msg_name       { font-size: 14px; float: right;
                .iconperson { color: @comment-color; font-size: 14px; margin-right:5px; }
            }
        }
    }
</style>