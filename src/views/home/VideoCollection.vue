<!-- 首页-视频合辑 -->
<template>
    <div class="videoCollection home-card">
        <TitleBar :titleBarName="titleBarName" rightText="更多" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import { reactive, onUpdated, toRefs } from "vue";
import { useStore } from "vuex";

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
