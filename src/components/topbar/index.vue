<!-- 页面顶部栏 -->
<template>
    <div class="topBar">
        <slot name="left">
            <div class="left">
                <TopBarLeftMenuBtn />
            </div>
        </slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
import TopBarLeftMenuBtn from "@/components/topbar/TopBarLeftMenuBtn.vue";

export default {
    name: "TopBar",
    components: { TopBarLeftMenuBtn },
};
</script>

<style scoped lang='scss'>
.topBar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: $padding;
    z-index: 999;
}
</style>
