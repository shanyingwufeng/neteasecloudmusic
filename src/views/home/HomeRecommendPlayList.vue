<!-- 首页-推荐歌单 -->
<template>
    <div class="homeRecommendPlaylist home-card">
        <TitleBar>
            <template v-slot:left>推荐歌单</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <div class="playList-swiper home-card-swiper">
            <swiper :slidesPerView="3" :spaceBetween="14">
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
                                    vertical
                                    :duration="700"
                                    :autoplay="4000"
                                    :show-indicators="false"
                                    :lazy-render="true"
                                    :touchable="false"
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
                            </div>
                        </div>
                        <div v-else>
                            <lazy-component>
                                <img v-lazy="item.picUrl" />
                                <span class="name">{{ item.name }}</span>
                                <PlayCount
                                    :playCount="item.playCount"
                                    :point="0"
                                />
                            </lazy-component>
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
import PlayCount from "@/components/PlayCount.vue";
import { getRecommendPlayList } from "@/api/playlist/index.js";
import { getRandomArrayValue } from "@/utils/index.js";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
    name: "HomeRecommendPlaylist",
    components: { TitleBar, PlayCount, Swiper, SwiperSlide },
    setup() {
        const state = reactive({
            list: [],
            list1: [],
            list2: [],
            isSwiperKeep: false,
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

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.homeRecommendPlaylist {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    .playList-swiper {
        .swiper-container {
            padding-right: 24px;
            .swiper-wrapper {
                .swiper-slide {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    border-radius: 12px;
                    img {
                        display: block;
                        width: 103px;
                        height: 103px;
                        margin-bottom: 4px;
                        border-radius: 10px;
                    }
                    .name {
                        @include ellipsis2();
                    }
                    .firstImage {
                        .icon-wuxian {
                            position: absolute;
                            top: -8px;
                            right: 2px;
                            color: #fff;
                            font-size: 26px;
                        }
                        .van-swipe {
                            height: 139px;
                        }
                    }
                }
            }
        }
    }
}
</style>
