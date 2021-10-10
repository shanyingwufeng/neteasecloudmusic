<!-- 首页-雷达歌单 -->
<template>
    <div class="homeRadarPlayList home-card">
        <TitleBar titleBarName="雷达歌单" rightText="更多" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, watch, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "HomeRadarPlayList",
    components: { TitleBar, PlayListSwiper },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        watch(
            () => props.data,
            (newValue) => {
                state.list = newValue.creatives;
            }
        );

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
</style>
