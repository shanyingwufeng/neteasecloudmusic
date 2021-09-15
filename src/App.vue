<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
    <Bottom />
</template>

<script>
import Bottom from "@/components/Bottom.vue";

export default {
    name: "App",
    components: { Bottom },
};
</script>

<style lang="scss">
#app {
    height: 100vh;
    font-size: 12px;
}
</style>
