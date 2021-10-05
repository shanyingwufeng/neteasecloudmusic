<!-- 首页-推荐歌单 -->
<template>
    <div class="recommend-playList home-card">
        <TitleBar titleBarName="推荐歌单" rightText="更多" />
        <div class="playList-swiper home-card-swiper">
            <swiper :slidesPerView="slidesPerView" :spaceBetween="spaceBetween">
                <swiper-slide v-for="(item, id) in list2" :key="id">
                    <router-link
                        :to="{
                            path: '/playlist',
                            query: { id: item.id },
                        }"
                    >
                        <div v-if="id === 0">
                            <div class="firstImage" v-if="isSwiperKeep">
                                <van-swipe
                                    style="height: 140px"
                                    vertical
                                    loop
                                    :duration="700"
                                    :autoplay="4000"
                                    :show-indicators="false"
                                >
                                    <van-swipe-item
                                        v-for="(list1Item, id) in list1"
                                        :key="id"
                                    >
                                        <router-link
                                            :to="{
                                                path: '/playlist',
                                                query: { id: list1Item.id },
                                            }"
                                            class="vanSwiperItem"
                                        >
                                            <img v-lazy="list1Item.picUrl" />
                                            <span class="name">{{
                                                list1Item.name
                                            }}</span>
                                            <span
                                                class="iconfont icon-wuxian"
                                            ></span
                                        ></router-link>
                                    </van-swipe-item>
                                </van-swipe>
                                <!-- <swiper
                                    :autoplay="autoplay"
                                    :loop="loop"
                                    :speed="speed"
                                    :direction="direction"
                                >
                                    <swiper-slide
                                        v-for="(list1Item, id) in list1"
                                        :key="id"
                                    >
                                        <router-link
                                            :to="{
                                                path: '/playlist',
                                                query: { id: list1Item.id },
                                            }"
                                        >
                                            <img v-lazy="list1Item.picUrl" />
                                            <span class="name">{{
                                                list1Item.name
                                            }}</span>
                                            <span
                                                class="iconfont icon-wuxian"
                                            ></span
                                        ></router-link>
                                    </swiper-slide>
                                </swiper> -->
                            </div>
                        </div>
                        <div v-else>
                            <img v-lazy="item.picUrl" />
                            <span class="name">{{ item.name }}</span>
                            <PlayCount :playCount="item.playCount" :point="1" />
                        </div>
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, onActivated, onDeactivated, toRefs } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import PlayCount from "@/components/PlayCount.vue";
import { getRecommendPlayList } from "@/api/home/index.js";
import { getRandomArrayValue } from "@/utils/index.js";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
    name: "RecommendPlayList",
    components: {
        TitleBar,
        PlayListSwiper,
        PlayCount,
        Swiper,
        SwiperSlide,
    },
    setup() {
        const state = reactive({
            list1: [],
            list2: [],
            isSwiperKeep: false,
        });

        // swiper相关配置属性放在swiper_options这个变量里
        const swiper_options = reactive({
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 800,
            direction: "vertical",
            observeParents: true,
            observer: true,
            slidesPerView: 3,
            spaceBetween: 14,
            parallax: true,
        });

        onMounted(() => {
            getRecommendPlayList().then((res) => {
                state.list = getRandomArrayValue(res.data.result, 12);
                state.list1 = state.list.slice(0, 5);
                state.list2 = state.list.slice(5, 11);
            });
        });

        onActivated(() => {
            state.isSwiperKeep = true;
        });

        onDeactivated(() => {
            state.isSwiperKeep = false;
        });

        return {
            ...toRefs(state),
            ...toRefs(swiper_options),
        };
    },
};
</script>

<style scoped lang='scss'>
.recommend-playList {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    .playList-swiper {
        .swiper-container {
            height: 140px;
            padding-right: 24px;
            .swiper-wrapper {
                overflow: hidden;
                .swiper-slide {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    border-radius: 12px;
                    img {
                        display: block;
                        width: 100%;
                        margin-bottom: 4px;
                        border-radius: 10px;
                    }
                    .name {
                        @include ellipsis2();
                    }
                    .firstImage {
                        overflow: hidden;
                        .icon-wuxian {
                            position: absolute;
                            top: -8px;
                            right: 2px;
                            color: #fff;
                            font-size: 28px;
                        }
                    }
                    // .firstImage {
                    //     overflow: hidden;
                    //     .swiper-container {
                    //         height: 160px;
                    //         padding-right: 0;
                    //         .icon-wuxian {
                    //             position: absolute;
                    //             top: 0;
                    //             right: 4px;
                    //             color: #fff;
                    //             font-size: 22px;
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
}
</style>
