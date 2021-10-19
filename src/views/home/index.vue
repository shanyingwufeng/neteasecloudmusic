<!-- 首页 -->
<template>
    <div
        class="home"
        :style="{ paddingBottom: playSong.id ? '110px' : '70px' }"
    >
        <!-- 顶部栏 -->
        <HomeTopBar />
        <!-- 轮播图 -->
        <HomeSlideShow />
        <!-- 中间导航  -->
        <HomeCenterNav />
        <!-- 推荐歌单 -->
        <HomeRecommendPlaylist />
        <!-- 新歌新碟数字专辑 -->
        <HomeNewResource :data="homeData[3]" />
        <!-- 排行榜 -->
        <HomeLeaderboard />
        <!-- 音乐日历 -->
        <HomeMusicCalendar :data="homeData[4]" />
        <!-- 精选音乐视频 -->
        <HomeSelectedMusicVideo :data="homeData[5]" />
        <!-- 雷达歌单 -->
        <HomeRadarPlaylist :data="homeData[6]" />
        <!-- 专属场景歌单 -->
        <HomeOffcialPlaylist :data="homeData[7]" />
        <!-- 热门播客 -->
        <HomeHotPodcasts :data="homeData[8]" />
        <!-- 广播电台和24小时播客 -->
        <HomeBroadCastPodCast24 :data="homeData[9]" />
        <!-- 视频合辑 -->
        <HomeVideoCollection :data="homeData[10]" />
        <!-- 精品歌单 -->
        <HomeBoutiquePlaylist />
    </div>
</template>

<script>
import HomeTopBar from "@/views/home/HomeTopBar.vue";
import HomeSlideShow from "@/views/home/HomeSlideShow.vue";
import HomeCenterNav from "@/views/home/centernav/HomeCenterNav.vue";
import HomeRecommendPlaylist from "@/views/home/HomeRecommendPlaylist.vue";
import HomeNewResource from "@/views/home/newresource/HomeNewResource.vue";
import HomeLeaderboard from "@/views/home/HomeLeaderboard.vue";
import HomeMusicCalendar from "@/views/home/HomeMusicCalendar.vue";
import HomeSelectedMusicVideo from "@/views/home/HomeSelectedMusicVideo.vue";
import HomeRadarPlaylist from "@/views/home/HomeRadarPlaylist.vue";
import HomeOffcialPlaylist from "@/views/home/HomeOffcialPlaylist.vue";
import HomeHotPodcasts from "@/views/home/HomeHotPodcasts.vue";
import HomeBroadCastPodCast24 from "@/views/home/HomeBroadCastPodCast24.vue";
import HomeVideoCollection from "@/views/home/HomeVideoCollection.vue";
import HomeBoutiquePlaylist from "@/views/home/HomeBoutiquePlaylist.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "Home",
    components: {
        HomeTopBar,
        HomeSlideShow,
        HomeCenterNav,
        HomeRecommendPlaylist,
        HomeNewResource,
        HomeLeaderboard,
        HomeMusicCalendar,
        HomeSelectedMusicVideo,
        HomeRadarPlaylist,
        HomeOffcialPlaylist,
        HomeHotPodcasts,
        HomeBroadCastPodCast24,
        HomeVideoCollection,
        HomeBoutiquePlaylist,
    },

    setup() {
        const store = useStore();

        onMounted(() => {
            store.commit("bottom/setVisible", true);
            store.dispatch("home/getHomeData");
        });

        return {
            playSong: computed(() => store.state.play.playSong),
            homeData: computed(() => store.state.home.homeData),
        };
    },
};
</script>

<style scoped lang='scss'>
.home {
    line-height: 1.5;
    background: $color-background;
}
</style>
