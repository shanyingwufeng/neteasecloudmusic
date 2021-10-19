<!-- 首页-雷达歌单 -->
<template>
    <div class="homeRadarPlaylist home-card">
        <TitleBar>
            <template v-slot:left>雷达歌单</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, watch, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "HomeRadarPlalist",
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
