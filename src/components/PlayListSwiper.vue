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
                    <img v-lazy="item.uiElement.image.imageUrl" />
                    <span class="name">{{
                        item.uiElement.mainTitle.title
                    }}</span>
                    <PlayCount
                        :playCount="item.resources[0].resourceExtInfo.playCount"
                        :point="point"
                    />
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
                position: relative;
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                img {
                    width: 103px;
                    height: 103px;
                    margin-bottom: 4px;
                    border-radius: 10px;
                }
                .name {
                    @include ellipsis2();
                }
            }
        }
    }
}
</style>
