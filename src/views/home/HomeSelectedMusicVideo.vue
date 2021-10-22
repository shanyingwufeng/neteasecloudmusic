<!-- 首页-精选音乐视频 -->
<template>
    <div class="homeSelectedMusicVideo home-card">
        <TitleBar>
            <template v-slot:left>精选音乐视频</template>
            <template v-slot:right>
                <span class="iconfont icon-shuaxin"></span>
                <span class="text refresh">换一批</span>
            </template>
        </TitleBar>
        <PlayListSwiper>
            <swiper-slide v-for="(item, id) in list" :key="id">
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
            </swiper-slide>
            <!-- <div class="swiper-slide" v-for="(item, id) in list" :key="id">
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
            </div> -->
        </PlayListSwiper>
    </div>
</template>

<script>
import { reactive, watch, toRefs } from "vue";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
    name: "HomeSelectedMusicVideo",
    components: { PlayCount, TitleBar, PlayListSwiper, SwiperSlide },
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

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.homeSelectedMusicVideo {
    .titleBar {
        .right {
            .icon-shuaxin {
                margin-right: 2px;
                font-size: 10px;
            }
        }
    }
}
</style>
