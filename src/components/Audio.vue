<!-- 音乐播放组件 -->
<template>
    <div class="audio" v-if="id">
        <audio
            ref="audio"
            @ended="!playState"
            :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
        ></audio>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
    name: "Audio",
    setup() {
        const store = useStore();
        const audio = ref();
        const playState = computed(() => store.state.play.playState);

        watch(playState, () => {
            if (playState.value) {
                audio.value.play();
            } else {
                audio.value.pause();
            }
        });

        return {
            audio,
            playState,
            id: computed(() => store.state.play.playSong.id),
        };
    },
};
</script>

<style scoped lang='scss'>
</style>
