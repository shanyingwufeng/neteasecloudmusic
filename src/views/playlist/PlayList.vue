<!-- 歌单 -->
<template>
    <div class="playList">
        <PlayListTop
            :playlist="playlist"
            @showPlayListCover="showPlayListCover"
        />
        <Loading v-if="loading" />
        <PlayListSong
            :playlist="playlist"
            :songList="songList"
            v-if="!loading"
        />
    </div>
</template>

<script>
import PlayListTop from "@/views/playlist/PlayListTop.vue";
import Loading from "@/components/Loading.vue";
import PlayListSong from "@/views/playlist/PlayListSong.vue";
import { reactive, onMounted, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getSongDetail } from "@/api/play/index.js";

export default {
    name: "PlayList",
    components: {
        PlayListTop,
        Loading,
        PlayListSong,
    },
    setup() {
        const state = reactive({
            playlist: "",
            author: "",
            songList: "",
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        // 显示歌单封面
        const showPlayListCover = () => {
            state.playListCover = false;
        };

        onMounted(async () => {
            store.commit("setLoading", true);
            await store.dispatch("play/setPlayList", id);
            state.playlist = store.state.play.playList;
            store.commit(
                "play/setSongIds",
                state.playlist.trackIds.map((x) => {
                    return x.id;
                })
            );
            await getSongDetail(
                state.playlist.trackIds
                    .map((x) => {
                        return x.id;
                    })
                    .toString()
            ).then((res) => {
                state.songList = res.data.songs;
                // store.commit("play/setSongList", state.songList);
                store.commit("setLoading", false);
            });
        });

        return {
            ...toRefs(state),
            showPlayListCover,
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.playList {
    overflow: scroll;
    height: 100vh;
    .loading {
        margin-top: 70px;
    }
}
</style>
