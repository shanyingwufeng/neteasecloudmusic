<!-- 歌单 -->
<template>
    <div class="playList">
        <PlayListTop
            :playlist="playList"
            @showPlayListCover="showPlayListCover"
        />
        <Loading v-if="loading" />
        <PlayListSong
            :playList="playList"
            :songList="songList"
            v-show="!loading"
        />
    </div>
</template>

<script>
import PlayListTop from "@/views/playlist/PlayListTop.vue";
import Loading from "@/components/Loading.vue";
import PlayListSong from "@/views/playlist/PlayListSong.vue";
import { reactive, onMounted, toRefs, computed, toRaw } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getSongDetail } from "@/api/song/index.js";
import { spArr } from "@/utils/index.js";

export default {
    name: "PlayList",
    components: {
        PlayListTop,
        Loading,
        PlayListSong,
    },

    setup() {
        const state = reactive({
            playList: "",
            author: "",
            songList: [],
            ids: [],
            idArry: [],
            page: 0,
            isRefreshBool: true,
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        // 显示歌单封面
        const showPlayListCover = () => {
            state.playListCover = false;
        };

        const getSongList = async (arry) => {
            await getSongDetail(arry.toString())
                .then((res) => {
                    if (state.songList.length === 0) {
                        state.songList = res.data.songs;
                    } else {
                        state.songList = state.songList.concat(res.data.songs);
                    }
                })
                .catch(() => {
                    store.commit("setLoading", false);
                });
        };

        const isRefresh = () => {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            var scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;
            if (
                scrollTop + windowHeight >= scrollHeight &&
                state.isRefreshBool
            ) {
                state.isRefreshBool = false;
                refresh();
            }
        };

        const refresh = async () => {
            if (state.idArry.length > 1) {
                store.commit("setPlayListLoading", true);
                state.page++;
                if (state.page < state.idArry.length) {
                    await getSongList(state.idArry[state.page]);
                    state.isRefreshBool = true;
                }
                store.commit("setPlayListLoading", false);
            }
        };

        onMounted(async () => {
            window.addEventListener("scroll", isRefresh, true);
            store.commit("setLoading", true);
            await store.dispatch("play/setPlayList", id);
            state.playList = store.state.play.playList;
            state.ids = state.playList.trackIds.map((x) => {
                return x.id;
            });
            if (state.ids.length < 20) {
                await getSongList(state.ids);
            } else {
                state.idArry = spArr(state.ids, 20);
                await getSongList(state.idArry[state.page]);
            }
            store.commit("setLoading", false);
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
    height: 100vh;
    .loading {
        margin-top: 50px;
    }
}
</style>
