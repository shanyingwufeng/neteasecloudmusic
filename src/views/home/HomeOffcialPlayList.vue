<!-- 首页-专属场景歌单 -->
<template>
    <div class="homeOffcialPlayList home-card">
        <TitleBar :titleBarName="titleBarName" rightText="更多" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, watch, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "HomeOffcialPlayList",
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
                state.titleBarName = newValue.uiElement.subTitle.title;
                state.list = newValue.creatives;
            }
        );

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
</style>
