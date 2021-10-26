<!-- 首页-精品歌单 -->
<template>
    <div class="homeBoutiquePlaylist home-card">
        <TitleBar>
            <template v-slot:left>精品歌单</template>
            <template v-slot:right>
                <span class="text">更多</span>
                <van-icon name="arrow" />
            </template>
        </TitleBar>
        <PlayListSwiper>
            <swiper-slide v-for="(item, id) in list" :key="id">
                <router-link
                    :to="{ path: '/playlist', query: { id: item.id } }"
                >
                    <lazy-component>
                        <img v-lazy="item.coverImgUrl" />
                        <span class="name">{{ item.name }}</span>
                        <PlayCount :playCount="item.playCount" :point="1" />
                    </lazy-component>
                </router-link>
            </swiper-slide>
        </PlayListSwiper>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { getHighQualityPlayList } from "@/api/playlist/index.js";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";
import PlayListSwiper from "@/components/PlayListSwiper.vue";
import { SwiperSlide } from "swiper/vue";

export default {
    name: "HomeBoutiquePlaylist",
    components: { PlayCount, TitleBar, PlayListSwiper, SwiperSlide },
    setup() {
        const state = reactive({
            list: [],
        });

        onMounted(() => {
            getHighQualityPlayList().then((res) => {
                state.list = res.data.playlists;
            });
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
</style>
