<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component
                :is="Component"
                v-if="$route.meta.keepAlive"
                :key="$route.path"
            />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
        <!-- <transition name="slide">
            <component :is="Component" v-if="!$route.meta.keepAlive" />
        </transition> -->
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
    line-height: 1.2;
    font-size: 12px;
    user-select: none;
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont,
        "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto, "PingFang SC",
        "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    -webkit-font-smoothing: antialiased;

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

// component wrapper
.wrapper {
    width: 100%;
    min-height: 100vh;
}

// slide styles!
.slide-enter-active,
.slide-leave-active {
    transition: all 0.4s ease-out;
}

.slide-enter-to {
    position: absolute;
    right: 0;
}

.slide-enter-from {
    position: absolute;
    right: -100%;
}

.slide-leave-to {
    position: absolute;
    left: -100%;
}

.slide-leave-from {
    position: absolute;
    left: 0;
}
</style>
