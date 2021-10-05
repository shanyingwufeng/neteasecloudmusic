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
        const intervalId = ref(0);
        const playState = computed(() => store.state.play.playState);

        const updateTime = () => {
            store.commit("play/setPlayCurrentTime", 0);
            intervalId.value = setInterval(() => {
                // console.log(audio._value.currentTime);
                store.commit(
                    "play/setPlayCurrentTime",
                    audio._value.currentTime
                );
            }, 1000);
        };

        watch(playState, () => {
            if (playState.value) {
                audio.value.play();
                updateTime();
            } else {
                audio.value.pause();
                clearInterval(intervalId.value);
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
