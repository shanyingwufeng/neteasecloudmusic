<!-- 音乐播放组件 -->
<template>
    <div class="audio">
        <audio
            ref="audio"
            @ended="!$store.getters.playState"
            :src="`https://music.163.com/song/media/outer/url?id=${$store.getters.songId}.mp3`"
        ></audio>
    </div>
</template>

<script>
import { computed, ref, watch, toRefs, onMounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "Audio",
    setup() {
        const store = useStore();

        const audio = ref(null);

        const playState = computed(() => store.state.playState);

        watch(playState, () => {
            if (playState.value) {
                audio.value.play();
            } else {
                audio.value.pause();
            }
        })

        return { audio };
    },
};
</script>

<style scoped lang='scss'>
</style>
