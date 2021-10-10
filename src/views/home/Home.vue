<!-- 首页 -->
<template>
    <div class="home" :style="{ paddingBottom: pb() }">
        <!-- 顶部栏 -->
        <HomeTopBar />
        <div class="content">
            <!-- 轮播图 -->
            <HomeSlideShow />
            <!-- 中间导航  -->
            <HomeCenterNav />
            <!-- 推荐歌单 -->
            <HomeRecommendPlayList />
            <!-- 新歌新碟数字专辑 -->
            <HomeNewSongAndNewAlbum :data="newSongAndnewAlbum" />
            <!-- 排行榜 -->
            <HomeTopList />
            <!-- 音乐日历 -->
            <HomeMusicCalendar :data="musicCalendar" />
            <!-- 精选音乐视频 -->
            <HomeBoutiqueMusicVideo :data="musicVideo" />
            <!-- 雷达歌单 -->
            <HomeRadarPlaylist :data="radarPlayList" />
            <!-- 专属场景歌单 -->
            <HomeOffcialPlayList :data="offcialPlayList" />
            <!-- 广播电台和24小时播客 -->
            <HomeBroadCastAndPodCast24 :data="broadCastAndPodCast24" />
            <!-- 视频合辑 -->
            <HomeVideoCollection :data="videoCollection" />
            <!-- 精品歌单 -->
            <HomeBoutiquePlayList />
        </div>
    </div>
</template>

<script>
import HomeTopBar from "@/views/home/HomeTopBar.vue";
import HomeSlideShow from "@/views/home/HomeSlideShow.vue";
import HomeCenterNav from "@/views/home/HomeCenterNav.vue";
import HomeRecommendPlayList from "@/views/home/HomeRecommendPlayList.vue";
import HomeNewSongAndNewAlbum from "@/views/home/homenewsongandnewalbum/HomeNewSongAndNewAlbum.vue";
import HomeTopList from "@/views/home/HomeTopList.vue";
import HomeMusicCalendar from "@/views/home/HomeMusicCalendar.vue";
import HomeBoutiqueMusicVideo from "@/views/home/HomeBoutiqueMusicVideo.vue";
import HomeRadarPlaylist from "@/views/home/HomeRadarPlaylist.vue";
import HomeOffcialPlayList from "@/views/home/HomeOffcialPlayList.vue";
import HomeBroadCastAndPodCast24 from "@/views/home/HomeBroadCastAndPodCast24.vue";
import HomeVideoCollection from "@/views/home/HomeVideoCollection.vue";
import HomeBoutiquePlayList from "@/views/home/HomeBoutiquePlayList.vue";
import { useStore } from "vuex";
import { onActivated, reactive, toRefs } from "vue";
import { getHomePageInfo } from "@/api/home/index.js";

export default {
    name: "Home",
    components: {
        HomeTopBar,
        HomeSlideShow,
        HomeCenterNav,
        HomeRecommendPlayList,
        HomeNewSongAndNewAlbum,
        HomeTopList,
        HomeMusicCalendar,
        HomeBoutiqueMusicVideo,
        HomeRadarPlaylist,
        HomeOffcialPlayList,
        HomeBroadCastAndPodCast24,
        HomeVideoCollection,
        HomeBoutiquePlayList,
    },

    setup() {
        const state = reactive({
            newSongAndnewAlbum: "", // 新歌新碟数字专辑
            musicCalendar: "", // 音乐日历
            musicVideo: "", // 精选音乐视频
            radarPlayList: "", // 雷达歌单
            offcialPlayList: "", // 专属场景歌单
            broadCastAndPodCast24: "", // 24小时播客
            videoCollection: "", // 视频合辑
        });

        const store = useStore();

        // padding-bottom 根据有没有本地存储的音乐而变化
        const pb = () => {
            return store.state.play.playSong.id ? "100px" : "50px";
        };

        onActivated(() => {
            store.commit("bottom/setVisible", true);
            getHomePageInfo().then((res) => {
                state.newSongAndnewAlbum = res.data.data.blocks[3];
                state.musicCalendar = res.data.data.blocks[4];
                state.musicVideo = res.data.data.blocks[5];
                state.radarPlayList = res.data.data.blocks[6];
                state.offcialPlayList = res.data.data.blocks[7];
                state.broadCastAndPodCast24 = res.data.data.blocks[9];
                state.videoCollection = res.data.data.blocks[10];
                // console.log(res.data.data.blocks[0]);
            });
        });

        return {
            ...toRefs(state),
            pb,
        };
    },
};
</script>

<style scoped lang='scss'>
.home {
    background: $color-background;
}
</style>
