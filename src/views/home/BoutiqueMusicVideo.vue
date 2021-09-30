<!-- 首页-精选音乐视频 -->
<template>
    <div class="boutique-music-video home-card">
        <TitleBar :titleBarName="titleBarName" rightText="换一批" />
        <div class="list home-card-swiper">
            <div class="swiper-container boutique-music-video-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                    >
                        <!-- <img v-lazy="item.resource.mlogBaseData.coverUrl" /> -->
                        <img v-lazy="item.resource.mlogExtVO.song.coverUrl" />
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
                        width: 100%;
                        // height: 120px;
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
}
</style>