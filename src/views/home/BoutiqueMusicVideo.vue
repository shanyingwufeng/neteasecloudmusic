<!-- 首页-精选音乐视频 -->
<template>
    <div class="boutique-music-video home-playList">
        <TitleBar :titleBarName="titleBarName" rightText="换一批" />
        <div class="list home-playList-Swiper">
            <div class="swiper-container boutique-music-video-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                    >
                        <img v-lazy="item.resource.mlogBaseData.coverUrl" />
                        <span class="name">{{
                            item.resource.mlogBaseData.text
                        }}</span>
                        <PlayCount
                            :playCount="item.resource.mlogExtVO.playCount"
                            :point="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onUpdated, toRefs } from "vue";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "BoutiqueMusicVideo",
    components: {
        PlayCount,
        TitleBar,
    },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        onUpdated(() => {
            state.titleBarName = props.data.uiElement.subTitle.title;
            state.list = props.data.extInfo;
            new Swiper(".boutique-music-video-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.boutique-music-video {
    .list {
        .swiper-container {
            padding-right: 24px;
            .swiper-wrapper {
                .swiper-slide {
                    position: relative;
                    display: flex;
                    border-radius: 10px;
                    flex-direction: column;
                    img {
                        width: 104px;
                        height: 104px;
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
}
</style>