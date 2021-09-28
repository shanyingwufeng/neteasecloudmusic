<!-- 首页-雷达歌单 -->
<template>
    <div class="radar-playList home-card">
        <TitleBar titleBarName="雷达歌单" rightText="更多" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "RadarPlaylist",
    components: { TitleBar, PlayListSwiper },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        onUpdated(() => {
            state.list = props.data.creatives;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
</style>
