<!--专辑-->
<template>
    <div class="album">
        <AlbumTop :album="album" />
        <Loading v-if="loading" />
        <AlbumSong :album="album" v-show="!loading" />
    </div>
</template>

<script>
import AlbumTop from "@/views/album/AlbumTop.vue";
import Loading from "@/components/Loading.vue";
import AlbumSong from "@/views/album/AlbumSong.vue";
import { reactive, onMounted, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    name: "Album",
    components: { AlbumTop, Loading, AlbumSong },

    setup() {
        const state = reactive({
            album: "",
        });

        const store = useStore();
        const route = useRoute();
        const id = route.query.id;

        onMounted(async () => {
            await store.dispatch("play/setAlbum", id);
            state.album = store.state.play.album;
        });

        return {
            ...toRefs(state),
            loading: computed(() => store.state.loading),
        };
    },
};
</script>

<style scoped lang='scss'>
.album {
    .loading {
        margin-top: 60px;
    }
}
</style>
