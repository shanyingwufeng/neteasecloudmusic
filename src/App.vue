<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component
                :is="Component"
                v-if="$route.meta.keepAlive"
                :key="$route.path"
            />
        </keep-alive>
        <transition name="fade">
            <component :is="Component" v-if="!$route.meta.keepAlive" />
        </transition>
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
    height: 100vh;
    font-size: 12px;
    .van-popup.logout-close {
        .top {
            display: flex;
            align-items: center;
            height: 30%;
            padding: 0 $padding;
            border-bottom: 1px solid rgba($color: #999999, $alpha: 0.2);
            color: #555;
            font-size: 14px;
        }
        .bottom {
            display: flex;
            flex-direction: column;
            height: 70%;
            padding: 0 18px;
            span {
                flex: 1;
                display: flex;
                align-items: center;
                font-size: 16px;
            }
        }
    }
}
</style>
