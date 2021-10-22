<!-- 歌单 -->
<template>
    <div class="playlist wrapper">
        <PlayListTop :playlist="playList" />
        <Loading v-if="loading" />
        <PlayListSong :playList="playList" v-show="!loading" />
    </div>
</template>

<script>
import PlayListTop from "@/views/playlist/PlayListTop.vue";
import Loading from "@/components/Loading.vue";
import PlayListSong from "@/views/playlist/PlayListSong.vue";
import { reactive, onMounted, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    name: "Playlist",
    components: { PlayListTop, Loading, PlayListSong },

    setup() {
        const state = reactive({
            playList: "",
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        onMounted(async () => {
            await store.dispatch("play/setPlayList", id);
            state.playList = store.state.play.playList;
        });

        return {
            ...toRefs(state),
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.playlist {
    width: 100%;
    min-height: 100vh;
    .loading {
        margin-top: 50px;
    }
}
</style>
