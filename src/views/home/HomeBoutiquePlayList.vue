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
        <div class="list home-card-swiper">
            <div class="swiper-container boutique-playList-swiper">
                <div class="swiper-wrapper">
                    <router-link
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                        :to="{ path: '/playlist', query: { id: item.id } }"
                    >
                        <lazy-component>
                            <img v-lazy="item.coverImgUrl" />
                            <span class="name">{{ item.name }}</span>
                            <PlayCount :playCount="item.playCount" :point="1" />
                        </lazy-component>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUpdated } from "vue";
import { getHighQualityPlayList } from "@/api/playlist/index.js";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "HomeBoutiquePlaylist",
    components: { PlayCount, TitleBar },
    setup() {
        const state = reactive({
            titleBarName: "",
            list: [],
        });

        onMounted(() => {
            getHighQualityPlayList().then((res) => {
                state.list = res.data.playlists;
            });
        });

        onUpdated(() => {
            new Swiper(".boutique-playList-swiper", {
                slidesPerView: 3,
                spaceBetween: 14,
            });
        });

        return { ...toRefs(state) };
    },
};
</script>

<style scoped lang='scss'>
.homeBoutiquePlaylist {
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
