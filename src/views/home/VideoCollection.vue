<!-- 首页-视频合辑 -->
<template>
    <div class="videoCollection home-playList">
        <TitleBar :titleBarName="titleBarName" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "VideoCollection",
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
