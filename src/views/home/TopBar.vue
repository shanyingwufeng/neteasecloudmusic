<!-- 首页-顶部栏 -->
<template>
    <div class="topBar">
        <div class="left">
            <van-cell
                @click="showSideBar"
                class="iconfont icon-icon-"
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
        <router-link class="center" to="/search">
            <div>
                <span class="iconfont icon-sousuo"></span>
            </div>
            <div class="searchKeyword">
                <swiper
                    :autoplay="autoplay"
                    :loop="loop"
                    :speed="speed"
                    :direction="direction"
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
import SideBar from "./SideBar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { toRefs, reactive, onMounted } from "vue";
import { getSearchHot } from "@/api/search/index";

export default {
    name: "TopBar",
    components: { SideBar, Swiper, SwiperSlide },
    setup() {
        const state = reactive({
            isSideBarShow: false,
            searchKeyword: [],
        });

        const showSideBar = () => {
            state.isSideBarShow = true;
        };

        // swiper相关配置属性放在swiper_options这个变量里
        let swiper_options = reactive({
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 600,
            direction: "vertical",
        });

        onMounted(() => {
            getSearchHot().then((res) => {
                state.searchKeyword = res.data.result.hots;
            });
        });

        return { ...toRefs(state), showSideBar, ...toRefs(swiper_options) };
    },
};
</script>

<style scoped lang='scss'>
.topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding);
    background-color: var(--color-home-topbarandslideshow-background);
    .left {
        .van-cell {
            display: flex;
            padding: 0;
            background-color: var(--color-home-topbarandslideshow-background);
            &:before {
                color: #555;
                font-size: 20px;
            }
        }
    }
    .center {
        display: flex;
        align-items: center;
        width: 82%;
        height: 30px;
        padding: 0 12px;
        background-color: #fff;
        border-radius: 14px;
        .iconfont {
            margin-right: 8px;
            font-size: 14px;
        }
        .searchKeyword {
            overflow: hidden;
            height: 30px;
            line-height: 32px;
            color: #999;
            font-size: 12px;
            .text {
                color: rgb(148, 148, 148);
                font-size: 14px;
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
