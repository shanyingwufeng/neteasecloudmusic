<!-- 首页-专属场景歌单 -->
<template>
    <div class="offcial-playList home-playList">
        <TitleBar :titleBarName="titleBarName" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "OffcialPlayList",
    components: { TitleBar, PlayListSwiper },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        onUpdated(() => {
            state.titleBarName = props.data.uiElement.subTitle.title;
            state.list = props.data.creatives;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
</style>
