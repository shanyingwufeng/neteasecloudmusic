<!-- 首页-推荐歌单 -->
<template>
    <div class="recommend-playList home-playList">
        <TitleBar :titleBarName="titleBarName" rightText="更多" />
        <PlayListSwiper :list="list" :point="1" />
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";

export default {
    name: "RecommendPlayList",
    components: { TitleBar, PlayListSwiper },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        onUpdated(() => {
            state.titleBarName =
                props.data.uiElement.subTitle.title;
            state.list = props.data.creatives;
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.recommend-playList {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
