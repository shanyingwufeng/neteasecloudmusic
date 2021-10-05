<!-- 首页 -->
<template>
    <div class="home" :style="{ paddingBottom: pb() }">
        <!-- 顶部栏 -->
        <TopBar />
        <!-- 轮播图 -->
        <SlideShow />
        <!-- 中间导航  -->
        <CenterNav />
        <!-- 推荐歌单 -->
        <RecommendPlayList />
        <!-- 新歌新碟数字专辑 -->
        <NewAlbumNewSong :data="newAlbumNewSong" />
        <!-- 音乐日历 -->
        <MusicCalendar :data="musicCalendar" />
        <!-- 精选音乐视频 -->
        <BoutiqueMusicVideo :data="musicVideo" />
        <!-- 雷达歌单 -->
        <RadarPlaylist :data="radarPlayList" />
        <!-- 专属场景歌单 -->
        <OffcialPlayList :data="offcialPlayList" />
        <!-- 广播电台和24小时播客 -->
        <BroadCastAndPodCast24 :data="broadCastAndPodCast24" />
        <!-- 视频合辑 -->
        <VideoCollection :data="videoCollection" />
        <!-- 精品歌单 -->
        <BoutiquePlayList />
    </div>
</template>

<script>
import TopBar from "@/views/home/TopBar.vue";
import SlideShow from "@/views/home/SlideShow.vue";
import CenterNav from "@/views/home/CenterNav.vue";
import RecommendPlayList from "@/views/home/RecommendPlayList.vue";
import NewAlbumNewSong from "@/views/home/albumandsong/NewAlbumNewSong.vue";
import MusicCalendar from "@/views/home/MusicCalendar.vue";
import BoutiqueMusicVideo from "@/views/home/BoutiqueMusicVideo.vue";
import RadarPlaylist from "@/views/home/RadarPlaylist.vue";
import OffcialPlayList from "@/views/home/OffcialPlayList.vue";
import BroadCastAndPodCast24 from "@/views/home/BroadCastAndPodCast24.vue";
import VideoCollection from "@/views/home/VideoCollection.vue";
import BoutiquePlayList from "@/views/home/BoutiquePlayList.vue";
import { useStore } from "vuex";
import { onActivated, reactive, toRefs } from "vue";
import { getHomePageInfo } from "@/api/home/index.js";

export default {
    name: "Home",
    components: {
        TopBar,
        SlideShow,
        CenterNav,
        RecommendPlayList,
        NewAlbumNewSong,
        MusicCalendar,
        BoutiqueMusicVideo,
        RadarPlaylist,
        OffcialPlayList,
        BroadCastAndPodCast24,
        VideoCollection,
        BoutiquePlayList,
    },

    setup() {
        const state = reactive({
            newAlbumNewSong: [], // 新歌新碟数字专辑
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
            store.commit("bottom/setIsShow", true);
            getHomePageInfo().then(async (res) => {
                state.newAlbumNewSong = res.data.data.blocks[3];
                state.musicCalendar = res.data.data.blocks[4];
                state.musicVideo = res.data.data.blocks[5];
                state.radarPlayList = res.data.data.blocks[6];
                state.offcialPlayList = res.data.data.blocks[7];
                state.broadCastAndPodCast24 = res.data.data.blocks[9];
                state.videoCollection = res.data.data.blocks[10];
                // console.log(res.data.data.blocks);
            });
        });

        return { ...toRefs(state), pb };
    },
};
</script>

<style scoped lang='scss'>
.home {
    background: $color-background;
}
</style>
