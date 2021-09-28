<!-- 歌单 -->
<template>
    <div class="playList">
        <PlayListTop :playlist="playlist" :author="author" />

        <!-- 数据加载完成之前的动画 -->
        <Loading v-if="loading" />

        <PlayListSong :playlist="playlist" :tracks="tracks" v-if="!loading" />
    </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
    getPlayListDetail,
    getSongDetail,
    getMyPlayListDetail,
} from "@/api/index";
import Loading from "@/components/Loading.vue";
import PlayListTop from "@/views/playlist/PlayListTop.vue";
import PlayListSong from "@/views/playlist/PlayListSong.vue";
import { Toast } from "vant";

export default {
    name: "PlayList",
    components: { Loading, PlayListTop, PlayListSong },

    setup() {
        const route = useRoute();

        const store = useStore();

        const state = reactive({
            list: [],
            playlist: {
                trackIds: [],
                subscribedCount: 0,
            },
            author: {},
            comment: 0,
            tracks: [],
            trackIds: "",
        });

        const id = route.query.id;

        onMounted(async () => {
            if (localStorage.getItem("userLoginInfo")) {
                store.commit("showLoading");
                await getMyPlayListDetail(id)
                    .then((res) => {
                        // console.log(res.data.playlist.tracks);
                        state.playlist = res.data.playlist;
                        state.author = res.data.playlist.creator;
                        state.tracks = res.data.playlist.tracks;
                        store.commit("setPlayList", state.tracks);
                        store.commit("hiddenLoading");
                    })
                    .catch(() => {
                        store.commit("hiddenLoading");
                        Toast("加载失败");
                    });
            } else {
                store.commit("showLoading");
                await getPlayListDetail(id)
                    .then((res) => {
                        state.playlist = res.data.playlist;
                        state.author = res.data.playlist.creator;
                        // 所有歌曲的id;
                        state.trackIds = res.data.playlist.trackIds
                            .map((x) => {
                                return x.id;
                            })
                            .toString();

                        // const result = [];
                        // const arr = res.data.playlist.trackIds.map((x) => {
                        //     return x.id;
                        // });
                        // for (let i = 0; i < arr.length; i += 10) {
                        //     result.push(arr.slice(i, i + 10));
                        // }
                        // console.log(result[state.page].toString());

                        // state.trackIds = result[state.page].toString();

                        getSongDetail(state.trackIds).then((res) => {
                            // 所有歌曲信息
                            state.tracks = res.data.songs;
                            store.commit("setPlayList", state.tracks);
                            store.commit("hiddenLoading");
                        });
                    })
                    .catch(() => {
                        store.commit("hiddenLoading");
                        Toast("加载失败");
                    });
            }
        });

        return {
            ...toRefs(state),
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
