<!-- 首页新歌新碟数字专辑子组件 -->
<template>
    <div class="homeHotPodcasts home-card">
        <TitleBar>
            <template v-slot:left>热门播客</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <div class="swiper-container homeHotPodcasts-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, id) in list" :key="id">
                    <div
                        class="item"
                        v-for="(sonItem, index) in item"
                        :key="index"
                        @click="play(sonItem)"
                    >
                        <div class="image">
                            <img v-lazy="sonItem.uiElement.image.imageUrl" />
                            <span class="iconfont icon-bofang8 bofang"></span>
                        </div>
                        <div class="content">
                            <div class="top">
                                <span class="mainTitle">{{
                                    sonItem.uiElement.mainTitle.title
                                }}</span>
                                <div class="subTitle">
                                    <van-tag
                                        plain
                                        v-for="(labelTextsItem, i) in sonItem
                                            .uiElement.labelTexts"
                                        :key="i"
                                        :class="{
                                            orange:
                                                labelTextsItem.indexOf('万') !=
                                                -1,
                                        }"
                                    >
                                        <span>{{ labelTextsItem }} </span>
                                    </van-tag>
                                    <span class="desc">{{
                                        sonItem.uiElement.mainTitle.title
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import { ref, onUpdated, watch } from "vue";
import { Swiper } from "swiper";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { spArr } from "@/utils";

export default {
    name: "HomeHotPodcasts",
    components: { TitleBar },
    props: ["data"],
    setup(props) {
        const list = ref([]);

        const store = useStore();
        const router = useRouter();

        watch(
            () => props.data,
            (newValue) => {
                list.value = spArr(newValue.creatives, 3);
            }
        );

        onUpdated(() => {
            new Swiper(".homeHotPodcasts-swiper", {
                slidesPerView: 1,
                spaceBetween: 14,
            });
        });

        const play = async (item) => {
            // if (item.resourceType === "song") {
            //     store.commit("play/setPlayState", false);
            //     await store.dispatch("play/setPlaySongInfo", item.resourceId);
            //     store.commit("play/setPlayState", true);
            // } else if (item.resourceType === "album") {
            //     router.push({
            //         path: "/album",
            //         query: { id: item.resourceId },
            //     });
            // }
        };

        return { list, play };
    },
};
</script>

<style scoped lang='scss'>
.homeHotPodcasts {
    background-color: #fff;
    .titleBar {
        padding-bottom: 8px;
    }
    .swiper-container {
        padding: 0 28px $padding $padding;
        .swiper-wrapper {
            display: flex;
            justify-content: space-between;
            .swiper-slide {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .item {
                    display: flex;
                    align-items: center;
                    .image {
                        position: relative;
                        img {
                            display: block;
                            width: 64px;
                            height: 64px;
                            margin-right: 10px;
                            border-radius: 10px;
                        }
                        .bofang {
                            position: absolute;
                            right: 16px;
                            bottom: 4px;
                            color: rgba($color: #fff, $alpha: 0.8);
                            font-size: 16px;
                        }
                    }
                    .content {
                        display: flex;
                        flex-direction: column;
                        width: 80%;
                        padding: 14px 0;
                        border-bottom: 1px solid rgba(235, 234, 234, 0.5);
                        .mainTitle {
                            @include ellipsis1();
                            margin-right: 4px;
                            margin-bottom: 4px;
                            font-size: 16px;
                        }
                        .subTitle {
                            display: flex;
                            align-items: center;
                            .van-tag {
                                padding: 2px 4px;
                                color: #9c9c9c;
                                &.orange {
                                    background-color: rgba(
                                        $color: #fcf1dd,
                                        $alpha: 0.6
                                    );
                                    color: #e5b041;
                                    border-radius: 4px
                                }
                            }
                            .desc {
                                @include ellipsis1();
                                margin-left: 4px;
                                color: #757575;
                                font-size: 14px;
                            }
                        }
                    }
                    &:last-child {
                        .content {
                            border-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
