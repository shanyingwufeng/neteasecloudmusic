<!-- 轮播内容 -->
<template>
    <div class="playList-swiper home-card-swiper">
        <div class="swiper-container swiper">
            <div class="swiper-wrapper">
                <router-link
                    class="swiper-slide"
                    v-for="(item, id) in list"
                    :key="id"
                    :to="{
                        path: '/playlist',
                        query: { id: item.creativeId },
                    }"
                >
                    <lazy-component>
                        <img v-lazy="item.uiElement.image.imageUrl" />
                        <div
                            class="img"
                            v-if="titleBarName === '视频合辑'"
                        >
                            <span class="span1"></span>
                            <span class="span2"></span>
                            <span class="span3"></span>
                            <span class="span4"></span>
                        </div>
                        <span class="name">{{
                            item.uiElement.mainTitle.title
                        }}</span>
                        <PlayCount
                            :playCount="
                                item.resources[0].resourceExtInfo.playCount
                            "
                            :point="point"
                        />
                    </lazy-component>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onUpdated, watch } from "vue";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";

export default {
    name: "PlayListSwiper",
    components: { PlayCount },
    props: {
        list: {
            type: Array,
            default: "",
        },
        point: {
            type: Number,
            default: 0,
        },
        slidesPerView: {
            type: Number,
            default: 3,
        },
        spaceBetween: {
            type: Number,
            default: 14,
        },
        titleBarName: {
            type: String,
        },
    },
    setup(props) {
        const list = ref([]);

        watch(
            () => props.list,
            (newValue) => {
                list.value = newValue;
            }
        );

        onUpdated(() => {
            new Swiper(".swiper", {
                slidesPerView: props.slidesPerView,
                spaceBetween: props.spaceBetween,
                observeParents: true,
                observer: true,
            });
        });

        return { list };
    },
};
</script>

<style scoped lang='scss'>
.playList-swiper {
    .swiper-container {
        padding-right: 24px;
        .swiper-wrapper {
            .swiper-slide {
                overflow: hidden;
                position: relative;
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                img {
                    width: 103px;
                    height: 103px;
                    border-radius: 10px;
                }
                .img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 103px;
                    border-style: solid;
                    border-color: rgba(0, 0, 0, 0.3);
                    border-width: 28px 6px;
                    border-radius: 10px;
                    .span1 {
                        position: absolute;
                        top: -1px;
                        left: -1px;
                        width: 8px;
                        height: 8px;
                        border: 1px solid #fff;
                        border-bottom-color: transparent;
                        border-right-color: transparent;
                    }
                    .span2 {
                        position: absolute;
                        top: -1px;
                        right: -1px;
                        width: 8px;
                        height: 8px;
                        border: 1px solid #fff;
                        border-bottom-color: transparent;
                        border-left-color: transparent;
                    }
                    .span3 {
                        position: absolute;
                        bottom: -1px;
                        left: -1px;
                        width: 8px;
                        height: 8px;
                        border: 1px solid #fff;
                        border-top-color: transparent;
                        border-right-color: transparent;
                    }
                    .span4 {
                        position: absolute;
                        bottom: -1px;
                        right: -1px;
                        width: 8px;
                        height: 8px;
                        border: 1px solid #fff;
                        border-top-color: transparent;
                        border-left-color: transparent;
                    }
                }
                .name {
                    @include ellipsis2();
                }
            }
        }
    }
}
</style>
