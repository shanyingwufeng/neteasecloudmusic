<!-- 底部导航 -->
<template>
    <van-tabbar
        class="footer-tab-bar"
        v-model="active"
        active-color="red"
        inactive-color="#000"
    >
        <van-tabbar-item icon="home-o" to="/">发现</van-tabbar-item>
        <van-tabbar-item icon="search">播客</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
        <van-tabbar-item icon="service-o">k歌</van-tabbar-item>
        <van-tabbar-item icon="friends-o">云村</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { ref } from "vue";
export default {
    name: "FooterTabBar",
    components: {},
    setup() {
        let active = ref(0);
        return {
            active,
        };
    },
};
</script>

<style scoped lang='scss'>
.footer-tab-bar {
    position: fixed;
    bottom: 0;
    z-index: 999;
}
</style>