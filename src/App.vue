<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
    <Bottom />
    <Audio />
</template>

<script>
import Bottom from "@/components/Bottom.vue";
import Audio from "@/components/Audio.vue";

export default {
    name: "App",
    components: { Bottom, Audio },
};
</script>

<style lang="scss">
#app {
    height: 100%;
    font-size: 12px;
}
</style>
