<template>
    <router-view></router-view>
    <playController></playController>
    <footer-tab-bar></footer-tab-bar>
</template>

<script>
import PlayController from "@/components/PlayController.vue";
import FooterTabBar from "@/components/FooterTabBar.vue";

export default {
    name: "App",
    components: {
        PlayController,
        FooterTabBar,
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    font-family: "微软雅黑";
    box-sizing: border-box;
}

a {
    color: #333;
    text-decoration: none;
}
</style>
