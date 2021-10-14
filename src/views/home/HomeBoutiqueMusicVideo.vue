<!-- 首页-精选音乐视频 -->
<template>
    <div class="homeBoutiqueMusicVideo home-card">
        <TitleBar :titleBarName="titleBarName" rightText="换一批" />
        <div class="list home-card-swiper">
            <div class="swiper-container boutique-music-video-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                    >
                        <lazy-component>
                            <img
                                v-lazy="item.resource.mlogExtVO.song.coverUrl"
                                v-if="item.resource.mlogExtVO.song"
                            />
                            <span class="name">{{
                                item.resource.mlogBaseData.text
                            }}</span>
                            <PlayCount
                                :playCount="item.resource.mlogExtVO.playCount"
                                :point="0"
                            />
                        </lazy-component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, watch, toRefs, onUpdated } from "vue";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "HomeBoutiqueMusicVideo",
    components: { PlayCount, TitleBar },
    props: ["data"],
    setup(props) {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        watch(
            () => props.data,
            (newValue) => {
                state.titleBarName = newValue.uiElement.subTitle.title;
                state.list = newValue.extInfo;
            }
        );

        onUpdated(() => {
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
.homeBoutiqueMusicVideo {
    .list {
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
}
</style>
