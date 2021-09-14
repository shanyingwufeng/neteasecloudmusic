<!-- 首页 -->
<template>
    <div class="home">
        <!-- 顶部栏 -->
        <TopBar />
        <!-- 轮播图 -->
        <SlideShow :data="banner" />
        <!-- 中间导航  -->
        <CenterNav />
        <!-- 推荐歌单 -->
        <RecommendPlayList :data="recommendPlayList" />
        <!-- 音乐日历 -->
        <MusicCalendar :data="musicCalendar" />
        <!-- 精品歌单 -->
        <BoutiquePlayList />
        <!-- 华语精品 -->
        <!-- <ChineseBoutique /> -->
        <!-- 精选音乐视频 -->
        <BoutiqueMusicVideo :data="musicVideo" />
        <!-- 你的雷达歌单 -->
        <RadarPlaylist :data="radarPlayList" />
        <!-- 新歌新碟数字专辑 -->
        <NewAlbumNewSong :data="newAlbumNewSong" />
        <!-- 专属场景歌单 -->
        <OffcialPlayList :data="offcialPlayList" />
        <!-- 24小时播客 -->
        <PodCast24 :data="podCast24" />
        <!-- 视频合辑 -->
        <VideoCollection :data="videoCollection" />
    </div>
</template>

<script>
import TopBar from "@/views/home/TopBar.vue";
import SlideShow from "@/views/home/SlideShow.vue";
import CenterNav from "@/views/home/CenterNav.vue";
import RecommendPlayList from "@/views/home/RecommendPlayList.vue";
import MusicCalendar from "@/views/home/MusicCalendar.vue";
import BoutiquePlayList from "@/views/home/BoutiquePlayList.vue";
import ChineseBoutique from "@/views/home/ChineseBoutique.vue";
import BoutiqueMusicVideo from "@/views/home/BoutiqueMusicVideo.vue";
import RadarPlaylist from "@/views/home/RadarPlaylist.vue";
import NewAlbumNewSong from "@/views/home/albumandsong/NewAlbumNewSong.vue";
import OffcialPlayList from "@/views/home/OffcialPlayList.vue";
import PodCast24 from "@/views/home/PodCast24.vue";
import VideoCollection from "@/views/home/VideoCollection.vue";

import $store from "@/store/index.js";
import { onMounted, reactive, toRefs } from "vue";
import { getHomePageInfo } from "@/api/home/index.js";

export default {
    name: "Home",
    components: {
        TopBar,
        SlideShow,
        CenterNav,
        RecommendPlayList,
        MusicCalendar,
        BoutiquePlayList,
        ChineseBoutique,
        BoutiqueMusicVideo,
        RadarPlaylist,
        OffcialPlayList,
        PodCast24,
        VideoCollection,
        NewAlbumNewSong,
    },

    setup() {
        const state = reactive({
            banner: [], // 顶部轮播图
            recommendPlayList: '', // 推荐歌单
            musicCalendar: '', // 音乐日历
            musicVideo: '', // 精选音乐视频
            radarPlayList: '', // 雷达歌单
            offcialPlayList: '', // 专属场景歌单
            newAlbumNewSong: [], // 新歌新碟数字专辑
            podCast24: '', // 24小时播客
            videoCollection: '', // 视频合辑
        });

        onMounted(() => {
            getHomePageInfo().then(async (res) => {
                state.banner = res.data.data.blocks[0].extInfo.banners;
                state.recommendPlayList = res.data.data.blocks[1];
                state.newAlbumNewSong = res.data.data.blocks[2];
                state.musicCalendar = res.data.data.blocks[3];
                state.musicVideo = res.data.data.blocks[5];
                state.radarPlayList = res.data.data.blocks[6];
                state.offcialPlayList = res.data.data.blocks[7];
                state.podCast24 = res.data.data.blocks[9];
                state.videoCollection = res.data.data.blocks[10];
                // console.log(res.data.data.blocks[10]);
            });

            $store.commit("showFooterTabBar");
            $store.commit("showBottom");
        });
        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.home {
    background-color: #f5f5f5;
}
</style>
