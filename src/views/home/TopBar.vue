<!-- 首页-顶部栏 -->
<template>
    <div class="topBar" :class="{ scroll: scroll }">
        <div class="left">
            <span
                @click="showSideBar"
                class="iconfont icon-icon-"
                :class="{ scroll: scroll }"
            >
            </span>
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
        <router-link class="center" :class="{ scroll: scroll }" to="/searchpage">
            <span class="iconfont icon-sousuo1"></span>
            <div class="searchKeyword">
                <swiper
                    :autoplay="autoplay"
                    :loop="loop"
                    :speed="speed"
                    :direction="direction"
                    :observeParents="observeParents"
                    :observer="observer"
                    v-if="isSwiperKeep"
                >
                    <swiper-slide v-for="(item, id) in searchKeyword" :key="id">
                        <span class="text">{{ item.first }}</span>
                    </swiper-slide>
                </swiper>
            </div>
        </router-link>
        <div class="right">
            <span class="iconfont icon-changge"></span>
        </div>
    </div>
</template>

<script>
import SideBar from "@/views/home/SideBar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { toRefs, reactive, onActivated, onDeactivated, onMounted } from "vue";
import { getSearchHot } from "@/api/search/index";

export default {
    name: "TopBar",
    components: {
        SideBar,
        Swiper,
        SwiperSlide,
    },
    setup() {
        const state = reactive({
            sideBarShow: false,
            searchKeyword: [],
            isSwiperKeep: false,
            scroll: false,
        });

        const showSideBar = () => {
            state.sideBarShow = true;
        };

        // swiper相关配置属性放在swiper_options这个变量里
        const swiper_options = reactive({
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 1400,
            direction: "vertical",
            observeParents: true,
            observer: true,
        });

        const windowScroll = () => {
            // 滚动条距离页面顶部的距离
            // 以下写法原生兼容
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop !== 0) {
                state.scroll = true;
            } else {
                state.scroll = false;
            }
        };

        onMounted(() => {
            window.addEventListener("scroll", windowScroll);
        });

        onActivated(() => {
            state.isSwiperKeep = true;
            getSearchHot()
                .then((res) => {
                    state.searchKeyword = res.data.result.hots;
                })
                .catch(() => {
                    state.searchKeyword = [];
                });
        });

        onDeactivated(() => {
            state.isSwiperKeep = false;
        });

        return { ...toRefs(state), showSideBar, ...toRefs(swiper_options) };
    },
};
</script>

<style scoped lang='scss'>
.topBar {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 58px;
    padding: $padding;
    background-color: #f0f0f0;
    z-index: 999;
    &.scroll {
        padding-bottom: 8px;
        background-color: $color-white-background;
    }

    .left {
        .icon-icon- {
            font-size: $font-size-medium;
        }
    }

    .center {
        display: flex;
        align-items: center;
        width: 82%;
        height: 30px;
        padding: 0 14px;
        background-color: $color-white-background;
        border-radius: 14px;
        &.scroll {
            background-color: rgba(235, 235, 235, 0.5);
        }
        .icon-sousuo1 {
            display: flex;
            margin-right: 6px;
            color: #333;
            font-size: 16px;
        }
        .searchKeyword {
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            .text {
                color: rgb(148, 148, 148);
                font-size: 14px;
            }
            .swiper-container {
                height: 40px;
            }
        }
    }

    .right {
        .iconfont {
            font-size: $font-size-medium;
        }
    }
}
</style>
