<template>
    <div class="lay" >
        <mt-header fixed title="个人博客">
            <mt-button  class="iconfont iconlist" slot="left" @click.native="$store.dispatch('toggleStatus')">返回</mt-button> 
            <div slot="right" class="right-part">
                <mt-button class="iconfont iconsearch" @click.native="onSearch"></mt-button>
                <input type="text" class="search" :class="{active: isActive}" placeholder="搜索" v-model="val">
            </div>
        </mt-header>
        
        <router-view></router-view>
        <Profile  :class="{'profile-toggle': openStatus}" />
    </div>
</template>

<script>
    import BlogList from "./BlogList.vue"
    import Profile from "./Profile.vue"
    export  default {
        components: {
            BlogList,
            Profile
		},
        data () {
            return {
                val: '',
                isActive: false, 
            }
        },
        methods: {
           onSearch(){
               if(!this.val.trim()){
                    this.isActive=!this.isActive
               }else{
                    let searchVal=this.val;
                    this.$router.push({path: '/search', query: { search:searchVal}});
                    searchVal=''
               }
           },  
        },
        computed: {
            openStatus() {
                return this.$store.state.openStatus;
            },
        },
    };
</script>

<style>
    .mint-header{
        height: 50px;
    }
    .mint-header-title{
        font-size: 20px;
    }
    .right-part{
        position: relative; 
    }
    .right-part .search{
        position: absolute;
        top: 10px;
        right: 12px;
        font-size: 16px;
        padding: 5px;
        width: 0;
        border: none;
        transition: width 0.5s;
    }
    .right-part .search:focus{
        border: none;
    }
    .right-part .active{
        width: 80px;
    }
    .iconsearch{
        float: right;
        z-index: 1;
        padding: 5px;
    }
</style>