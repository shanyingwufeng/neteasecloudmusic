<!-- 首页-视频合辑 -->
<template>
    <div class="videoCollection home-card" :style="{ paddingBottom: pb() }">
        <TitleBar :titleBarName="titleBarName" rightText="更多" />
        <PlayListSwiper :list="list" :point="0" />
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
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

        const store = useStore();

        // padding-bottom根据有没有本地存储的音乐而变化
        const pb = () => {
            return store.state.playControl.songName ? "100px" : "60px";
        };

        onUpdated(() => {
            state.titleBarName = props.data.uiElement.subTitle.title;
            state.list = props.data.creatives;
        });

        return { ...toRefs(state), pb };
    },
};
</script>

<style scoped lang='scss'>
.videoCollection {
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>
