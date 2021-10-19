<!-- 左侧菜单按钮 -->
<template>
    <div class="leftMenuBtn">
        <span @click="showSideBar" class="iconfont icon-icon- menuIcon"></span>
        <van-popup
            v-model:show="sideBarShow"
            position="left"
            :style="{
                width: '80vw',
                height: '100%',
                padding: '12px',
                background: 'rgb(240, 240, 240)',
            }"
        >
            <SideBar />
        </van-popup>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { reactive, toRefs } from "vue";

export default {
    name: "LeftMenuBtn",
    components: { SideBar },
    setup() {
        const state = reactive({
            sideBarShow: false,
        });

        const showSideBar = () => {
            state.sideBarShow = true;
        };

        return { ...toRefs(state), showSideBar };
    },
};
</script>

<style scoped lang='scss'>
</style>
