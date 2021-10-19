<!-- 首页-视频合辑 -->
<template>
    <div class="homeVideoCollection home-card">
        <TitleBar>
            <template v-slot:left>视频合辑</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <PlayListSwiper :list="list" :point="0" :titleBarName="titleBarName" />
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import { reactive, watch, toRefs } from "vue";

export default {
    name: "HomeVideoCollection",
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
