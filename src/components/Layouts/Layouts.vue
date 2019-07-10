<template>
    <div class="lay" >
        <mt-header fixed title="个人博客">
            <mt-button  class="iconfont iconlist" slot="left" @click.native="$store.dispatch('toggleStatus')">返回</mt-button> 
            <mt-button class="iconfont iconsearch" slot="right" @click.native="$router.push({path: '/search'})"></mt-button>
        </mt-header>
        
        <router-view></router-view>
        <Profile  :class="{'profile-toggle': openStatus}" />
    </div>
</template>

<script>
    import Profile from "./Profile.vue"
    export default {
        components: {
            Profile
		},
        computed: {
            openStatus() {
                return this.$store.state.openStatus;
            },
        },
    };
</script>

<style lang = "less" scoped>
    .mint-header                { height: 50px;
        .mint-header-button 
            .iconsearch         { float: right; }
    }
</style>