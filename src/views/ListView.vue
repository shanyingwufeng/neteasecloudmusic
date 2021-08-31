<!-- 歌单列表 -->
<template>
    <div class="listView">
        <listViewTop
            :playlist="state.playlist"
            :author="state.author"
        ></listViewTop>
        <play-list
            :playlist="state.playlist"
            :tracks="state.tracks"
        ></play-list>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getPlayListDetail, getPlayListComment } from "@/api/index";
import ListViewTop from "@/components/ListViewTop.vue";
import PlayList from "@/components/PlayList.vue";
import $store from "@/store/index.js";

export default {
    name: "ListView",
    components: {
        ListViewTop,
        PlayList,
    },
    setup() {
        let state = reactive({
            list: [],
            playlist: {
                trackIds: [],
                subscribedCount: 0,
            },
            author: {},
            comment: 0,
            tracks: [],
        });
        const route = useRoute();
        onMounted(() => {
            let id = route.query.id;
            getPlayListDetail(id).then((res) => {
                state.playlist = res.data.playlist;
                state.author = res.data.playlist.creator;
                state.tracks = res.data.playlist.tracks;
                $store.commit("setPlayList", state.tracks);
            });
        });
        return { state };
    },
};
</script>

<style scoped lang='scss'>
</style>