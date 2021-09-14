<!-- 轮播内容 -->
<template>
    <div class="playList-swiper home-playList-Swiper">
        <div class="swiper-container swiper">
            <div class="swiper-wrapper">
                <router-link
                    class="swiper-slide"
                    v-for="(item, id) in list"
                    :key="id"
                    :to="{
                        path: '/listview',
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
import { ref, onUpdated } from "vue";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";

export default {
    name: "PlayListSwiper",
    components: { PlayCount },
    props: ["list", "point"],
    setup(props) {
        const list = ref([]);

        onUpdated(() => {
            list.value = props.list;
            new Swiper(".swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
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
                    width: 100%;
                    margin-bottom: 4px;
                    border-radius: 10px;
                }
                .name {
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>
