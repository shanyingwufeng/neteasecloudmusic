<!-- 首页-精品歌单 -->
<template>
    <div class="boutique-playList home-playList">
        <TitleBar titleBarName="精品歌单" />
        <div class="list home-playList-Swiper">
            <div class="swiper-container boutique-playList-swiper">
                <div class="swiper-wrapper">
                    <router-link
                        class="swiper-slide"
                        v-for="(item, id) in list"
                        :key="id"
                        :to="{ path: '/listview', query: { id: item.id } }"
                    >
                        <img v-lazy="item.coverImgUrl" />
                        <span class="name">{{ item.name }}</span>
                        <PlayCount :playCount="item.playCount" :point="1" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUpdated } from "vue";
import { getHighQualityPlayList } from "@/api/home/index.js";
import { Swiper } from "swiper";
import PlayCount from "@/components/PlayCount.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
    name: "BoutiquePlayList",
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
.boutique-playList {
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
}
</style>
