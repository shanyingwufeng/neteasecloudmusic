<!-- 首页 -->
<template>
    <div class="home">
        <!-- 顶部栏 -->
        <TopBar />
        <!-- 轮播图 -->
        <SlideShow />
        <!-- 图标列表栏 -->
        <CenterNav />
        <!-- 推荐歌单 -->
        <RecommendPlayList />
        <!--精品歌单 -->
        <BoutiquePlayList />
        <!--精选歌单 -->
        <TopPlayList />
    </div>
</template>

<script>
import TopBar from "@/views/home/TopBar.vue";
import SlideShow from "@/views/home/SlideShow.vue";
import CenterNav from "@/views/home/CenterNav.vue";
import RecommendPlayList from "@/views/home/RecommendPlayList.vue";
import BoutiquePlayList from "@/views/home/BoutiquePlayList.vue";
import TopPlayList from "@/views/home/TopPlayList.vue";

export default {
    name: "Home",
    components: {
        TopBar,
        SlideShow,
        CenterNav,
        RecommendPlayList,
        BoutiquePlayList,
        TopPlayList,
    },
};
</script>

<style scoped lang='scss'>
.home {
    margin-bottom: 50px;
    background-color: rgb(240, 240, 240);
}
</style>
