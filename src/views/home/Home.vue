<!-- 首页 -->
<template>
    <div class="home">
        <!-- 顶部栏 -->
        <TopBar />
        <!-- 轮播图 -->
        <SlideShow />
        <!-- 中间导航 -->
        <CenterNav />
        <!-- 推荐歌单 -->
        <RecommendPlayList />
        <!-- 精品歌单 -->
        <BoutiquePlayList />
        <!-- 华语精品 -->
        <ChineseBoutique />
    </div>
</template>

<script>
import TopBar from "@/views/home/TopBar.vue";
import SlideShow from "@/views/home/SlideShow.vue";
import CenterNav from "@/views/home/CenterNav.vue";
import RecommendPlayList from "@/views/home/RecommendPlayList.vue";
import BoutiquePlayList from "@/views/home/BoutiquePlayList.vue";
import ChineseBoutique from "@/views/home/ChineseBoutique.vue";

export default {
    name: "Home",
    components: {
        TopBar,
        SlideShow,
        CenterNav,
        RecommendPlayList,
        BoutiquePlayList,
        ChineseBoutique,
    },
};
</script>

<style scoped lang='scss'>
.home {
    margin-bottom: 50px;
    background-color: #F5F5F5;
}
</style>
