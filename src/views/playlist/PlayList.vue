<!-- 歌单 -->
<template>
    <!-- 数据加载完成之前的动画 -->
    <loading v-show="loading"></loading>
    <div class="playList">
        <PlayListTop :playlist="playlist" :author="author"></PlayListTop>
        <PlayListSong :playlist="playlist" :tracks="tracks"></PlayListSong>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getPlayListDetail, getSongDetail } from "@/api/index";
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
            trackIds: [],
        });

        const id = route.query.id;

        onMounted(async () => {
            store.commit("showLoading");
            await getPlayListDetail(id)
                .then((res) => {
                    state.playlist = res.data.playlist;
                    state.author = res.data.playlist.creator;
                    // 所有歌曲的id
                    state.trackIds = res.data.playlist.trackIds
                        .map((x) => {
                            return x.id;
                        })
                        .toString();
                    getSongDetail(state.trackIds).then((res) => {
                        // 所有歌曲信息
                        state.tracks = res.data.songs;
                        store.commit("setPlayList", state.tracks);
                        store.commit("hideLoading");
                    });
                })
                .catch(() => {
                    store.commit("hideLoading");
                    Toast("加载失败");
                });
        });

        return {
            ...toRefs(state),
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
</style>
