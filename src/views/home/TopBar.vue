<!-- 首页-顶部栏 -->
<template>
    <div class="topBar" :class="{ scroll: scroll }">
        <div class="left">
            <van-cell
                @click="showSideBar"
                class="iconfont icon-icon-"
                :class="{ scroll: scroll }"
            ></van-cell>
            <van-popup
                v-model:show="isSideBarShow"
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
        <router-link class="center" :class="{ scroll: scroll }" to="/search">
            <div>
                <span class="iconfont icon-sousuo"></span>
            </div>
            <div class="searchKeyword">
                <swiper
                    :autoplay="autoplay"
                    :loop="loop"
                    :speed="speed"
                    :direction="direction"
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
            isSideBarShow: false,
            searchKeyword: [],
            isSwiperKeep: false,
            scroll: false,
        });

        const showSideBar = () => {
            state.isSideBarShow = true;
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
            getSearchHot().then((res) => {
                state.searchKeyword = res.data.result.hots;
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
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: $padding;
    background-color: rgb(240, 240, 240);
    box-shadow: 0 -1px $color-white-background;
    z-index: 999;
    &.scroll {
        padding-bottom: 8px;
        background-color: $color-white-background;
    }
    .left {
        .van-cell {
            display: flex;
            padding: 0;
            background-color: rgb(240, 240, 240);
            &:before {
                color: #555;
                font-size: $font-size-medium;
            }
            &.scroll {
                background-color: $color-white-background;
            }
        }
    }
    .center {
        display: flex;
        align-items: center;
        width: 82%;
        height: 30px;
        padding: 0 12px;
        background-color: $color-white-background;
        border-radius: 14px;
        &.scroll {
            background-color: rgba(235, 235, 235, 0.5);
        }
        .iconfont {
            margin-right: 6px;
            color: rgb(148, 148, 148);
            font-size: 14px;
        }
        .searchKeyword {
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            color: #999;
            .text {
                color: rgb(148, 148, 148);
                font-size: 14px;
            }
            .swiper-container {
                height: 60px;
            }
        }
    }
    .right {
        margin-top: 2px;
        .iconfont {
            font-size: 20px;
        }
    }
}
</style>
