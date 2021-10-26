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
import HomeTopBar from "./HomeTopBar.vue";
import HomeSlideShow from "./HomeSlideShow.vue";
import HomeCenterNav from "./centernav/index.vue";
import HomeRecommendPlaylist from "./HomeRecommendPlaylist.vue";
import HomeNewResource from "./newresource/index.vue";
import HomeLeaderboard from "./HomeLeaderboard.vue";
import HomeMusicCalendar from "./HomeMusicCalendar.vue";
import HomeSelectedMusicVideo from "./HomeSelectedMusicVideo.vue";
import HomeRadarPlaylist from "./HomeRadarPlaylist.vue";
import HomeOffcialPlaylist from "./HomeOffcialPlaylist.vue";
import HomeHotPodcasts from "./HomeHotPodcasts.vue";
import HomeBroadCastPodCast24 from "./HomeBroadCastPodCast24.vue";
import HomeVideoCollection from "./HomeVideoCollection.vue";
import HomeBoutiquePlaylist from "./HomeBoutiquePlaylist.vue";
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
            if (localStorage.getItem("userLoginInfo")) {
                store.commit(
                    "user/setUser",
                    JSON.parse(localStorage.getItem("userLoginInfo"))
                );
            }
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
